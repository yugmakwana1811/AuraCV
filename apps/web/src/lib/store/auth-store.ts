'use client';

import { create } from 'zustand';

interface AuthUser {
  id: string;
  email: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  setSession: (token: string, user: AuthUser) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setSession: (token, user) => {
    localStorage.setItem('auracv_token', token);
    localStorage.setItem('auracv_user', JSON.stringify(user));
    set({ token, user });
  },
  clearSession: () => {
    localStorage.removeItem('auracv_token');
    localStorage.removeItem('auracv_user');
    set({ token: null, user: null });
  },
}));

export function hydrateAuthStore() {
  const token = localStorage.getItem('auracv_token');
  const user = localStorage.getItem('auracv_user');
  if (!token || !user) {
    return;
  }
  try {
    const parsed = JSON.parse(user) as AuthUser;
    useAuthStore.setState({ token, user: parsed });
  } catch {
    localStorage.removeItem('auracv_token');
    localStorage.removeItem('auracv_user');
  }
}
