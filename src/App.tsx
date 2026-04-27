/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import PrimaryNav from './components/PrimaryNav';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import PricingPage from './pages/PricingPage';
import ProfilePage from './pages/ProfilePage';
import UploadModal from './components/UploadModal';
import { ToastProvider } from './components/ToastProvider';
import { SettingsProvider } from './contexts/SettingsContext';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <SettingsProvider>
      <ToastProvider>
        <div className="min-h-screen text-on-surface mesh-gradient font-sans selection:bg-primary/20 selection:text-primary">
          {currentPage !== 'auth' && (
            <PrimaryNav 
              currentPage={currentPage} 
              setCurrentPage={setCurrentPage} 
              onOpenUpload={() => setIsUploadModalOpen(true)}
            />
          )}
          
          <div className={currentPage !== 'auth' ? 'pt-20' : ''}>
            {currentPage === 'home' && <LandingPage onNavigate={setCurrentPage} />}
            {currentPage === 'auth' && <AuthPage onNavigate={setCurrentPage} />}
            {currentPage === 'dashboard' && <Dashboard />}
            {currentPage === 'pricing' && <PricingPage />}
            {currentPage === 'profile' && <ProfilePage />}
          </div>

          <UploadModal 
            isOpen={isUploadModalOpen} 
            onClose={() => setIsUploadModalOpen(false)} 
          />
        </div>
      </ToastProvider>
    </SettingsProvider>
  );
}
