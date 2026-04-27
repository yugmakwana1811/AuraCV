/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, useState } from 'react';
import PrimaryNav from './components/PrimaryNav';
import ErrorBoundary from './components/ErrorBoundary';
import PageLoader from './components/PageLoader';
import { ToastProvider } from './components/ToastProvider';
import { SettingsProvider } from './contexts/SettingsContext';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const UploadModal = lazy(() => import('./components/UploadModal'));

type Page = 'home' | 'auth' | 'dashboard' | 'pricing' | 'profile';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const handleNavigate = (page: string) => setCurrentPage(page as Page);

  return (
    <SettingsProvider>
      <ToastProvider>
        <ErrorBoundary>
          <div className="min-h-screen text-on-surface mesh-gradient font-sans selection:bg-primary/20 selection:text-primary">
            {currentPage !== 'auth' && (
              <PrimaryNav
                currentPage={currentPage}
                setCurrentPage={handleNavigate}
                onOpenUpload={() => setIsUploadModalOpen(true)}
              />
            )}

            <Suspense fallback={<PageLoader />}>
              <div className={currentPage !== 'auth' ? 'pt-20' : ''}>
                {currentPage === 'home' && <LandingPage onNavigate={handleNavigate} />}
                {currentPage === 'auth' && <AuthPage onNavigate={handleNavigate} />}
                {currentPage === 'dashboard' && <Dashboard />}
                {currentPage === 'pricing' && <PricingPage />}
                {currentPage === 'profile' && <ProfilePage />}
              </div>

              <UploadModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
              />
            </Suspense>
          </div>
        </ErrorBoundary>
      </ToastProvider>
    </SettingsProvider>
  );
}
