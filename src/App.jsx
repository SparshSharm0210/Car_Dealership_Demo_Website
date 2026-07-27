import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { SearchModal } from './components/SearchModal';
import { CompareModal } from './components/CompareModal';
import { QuickViewModal } from './components/QuickViewModal';
import { BookTestDriveModal } from './components/BookTestDriveModal';
import { AnalyticsModal } from './components/AnalyticsModal';

import { Home } from './pages/Home';
import { Inventory } from './pages/Inventory';
import { CarDetail } from './pages/CarDetail';
import { SellCar } from './pages/SellCar';
import { Finance } from './pages/Finance';
import { Contact } from './pages/Contact';

const MainContent = () => {
  const { activeTab, toastMessage, isLoading } = useApp();

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'inventory':
        return <Inventory />;
      case 'car-detail':
        return <CarDetail />;
      case 'sell':
        return <SellCar />;
      case 'finance':
        return <Finance />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-[#07080B] text-slate-100 flex flex-col justify-between selection:bg-yellow-500/30 selection:text-yellow-200">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#0F121C] border border-yellow-500/40 text-yellow-300 px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-xl text-xs font-semibold flex items-center gap-2 animate-fade-in border-l-4 border-l-yellow-400">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <Navbar />
        
        {/* Loading skeleton transition indicator */}
        {isLoading ? (
          <div className="container mx-auto px-6 py-20 text-center space-y-4 animate-pulse">
            <div className="h-12 w-64 bg-white/10 rounded-2xl mx-auto" />
            <div className="h-6 w-96 bg-white/5 rounded-xl mx-auto" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <div className="h-80 bg-white/5 rounded-2xl" />
              <div className="h-80 bg-white/5 rounded-2xl" />
              <div className="h-80 bg-white/5 rounded-2xl" />
            </div>
          </div>
        ) : (
          <main className="transition-all duration-300">
            {renderPage()}
          </main>
        )}
      </div>

      <Footer />
      
      {/* Global Modals & Overlays */}
      <FloatingWhatsApp />
      <SearchModal />
      <CompareModal />
      <QuickViewModal />
      <BookTestDriveModal />
      <AnalyticsModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
