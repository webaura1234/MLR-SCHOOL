'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';
import ContactFab from '@/components/ContactFab';
import CallFab from '@/components/CallFab';
import AdmissionsPopup from '@/components/AdmissionsPopup';
import { usePathname } from 'next/navigation';

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    const seen = localStorage.getItem('mr-preloader-seen');
    if (seen === 'true') {
      setLoading(false);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('mr-preloader-seen', 'true');
    setLoading(false);
  };

  // We must ensure the first render matches the server exactly to avoid hydration errors
  const showPreloader = !isMounted || loading;
  const isAdmissionPage = pathname === '/admission';

  return (
    <>
      {showPreloader && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
          <AnimatePresence>
            <Preloader onLoadingComplete={handleComplete} />
          </AnimatePresence>
        </div>
      )}

      <div className="app-container">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ContactFab />
        <CallFab />
        <AdmissionsPopup 
          enabled={!showPreloader && !isAdmissionPage} 
          initialDelayMs={5_000} 
          intervalMs={30_000} 
        />
      </div>
    </>
  );
}
