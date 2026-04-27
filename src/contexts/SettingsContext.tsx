import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Settings {
  theme: 'light' | 'dark' | 'system';
  emailAlerts: boolean;
  weeklyDigest: boolean;
  publicProfile: boolean;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
  theme: 'system',
  emailAlerts: true,
  weeklyDigest: false,
  publicProfile: true,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

function isBrowser() {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function parseStoredSettings(saved: string | null): Settings | null {
  if (!saved) {
    return null;
  }

  try {
    const parsed = JSON.parse(saved) as Partial<Settings>;
    return {
      theme: parsed.theme === 'light' || parsed.theme === 'dark' || parsed.theme === 'system'
        ? parsed.theme
        : defaultSettings.theme,
      emailAlerts: typeof parsed.emailAlerts === 'boolean' ? parsed.emailAlerts : defaultSettings.emailAlerts,
      weeklyDigest: typeof parsed.weeklyDigest === 'boolean' ? parsed.weeklyDigest : defaultSettings.weeklyDigest,
      publicProfile: typeof parsed.publicProfile === 'boolean' ? parsed.publicProfile : defaultSettings.publicProfile,
    };
  } catch {
    return null;
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    if (!isBrowser()) {
      return defaultSettings;
    }

    return parseStoredSettings(localStorage.getItem('app-settings')) ?? defaultSettings;
  });

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    try {
      localStorage.setItem('app-settings', JSON.stringify(settings));
    } catch (error) {
      console.warn('Unable to persist AuraCV settings', error);
    }

    // Apply Theme
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (settings.theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(settings.theme);
    }
  }, [settings]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
