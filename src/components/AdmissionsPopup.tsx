'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import './AdmissionsPopup.css';

type AdmissionsPopupProps = {
  enabled?: boolean;
  intervalMs?: number;
};

export default function AdmissionsPopup({ enabled = true, intervalMs = 30_000 }: AdmissionsPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const reduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !enabled) return;

    const openIfClosed = () => setIsOpen((prev) => (prev ? prev : true));

    // First popup after 30 seconds, then repeat every 30 seconds.
    const timeoutId = window.setTimeout(openIfClosed, intervalMs);
    const intervalId = window.setInterval(openIfClosed, intervalMs);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [enabled, intervalMs, mounted]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!mounted) return null;

  const overlay = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="admissions-pop-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Admissions Open"
          initial={reduceMotion ? undefined : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className="admissions-pop-card"
            initial={reduceMotion ? undefined : { opacity: 0, y: 10, scale: 0.98 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="admissions-pop-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="admissions-pop-badge">Admissions</div>
            <h3 className="admissions-pop-title">Admissions Open 2026–2027</h3>
            <p className="admissions-pop-desc">
              Limited seats. Enquire now to schedule a campus visit and complete your admission enquiry.
            </p>

            <div className="admissions-pop-actions">
              <Link href="/admission" className="admissions-pop-primary" onClick={() => setIsOpen(false)}>
                Apply Now
              </Link>
              <button type="button" className="admissions-pop-secondary" onClick={() => setIsOpen(false)}>
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return typeof document !== 'undefined' ? createPortal(overlay, document.body) : overlay;
}

