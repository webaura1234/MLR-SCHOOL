'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import './AdmissionsPopup.css';

type AdmissionsPopupProps = {
  enabled?: boolean;
  intervalMs?: number;
};

export default function AdmissionsPopup({ enabled = true, intervalMs = 30_000 }: AdmissionsPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    studentName: '',
    className: '',
    parentName: '',
    phone: '',
    message: ''
  });

  const reduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  }, []);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const submitted = localStorage.getItem('hasSubmittedAdmissionsEnquiry') === 'true';
      setHasSubmitted(submitted);
    }
  }, []);

  useEffect(() => {
    if (!mounted || !enabled || hasSubmitted) return;

    const openIfClosed = () => setIsOpen((prev) => (prev ? prev : true));

    // First popup after 30 seconds, then repeat every 30 seconds.
    const timeoutId = window.setTimeout(openIfClosed, intervalMs);
    const intervalId = window.setInterval(openIfClosed, intervalMs);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [enabled, intervalMs, mounted, hasSubmitted]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/admission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          name: formData.studentName,
        }),
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Submission failed');
      }

      setStatus('success');
      if (typeof window !== 'undefined') {
        localStorage.setItem('hasSubmittedAdmissionsEnquiry', 'true');
        setHasSubmitted(true);
      }
      setFormData({
        studentName: '',
        className: '',
        parentName: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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
            <h3 className="admissions-pop-title">Admissions Open 2026-27</h3>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '1.5rem 0' }}
              >
                <CheckCircle2 size={48} color="#0DB6B5" style={{ margin: '0 auto 1rem' }} />
                <h4 style={{ fontWeight: 900, color: '#0A2463', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Enquiry Sent!</h4>
                <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Thank you for your interest. Our admissions team will contact you shortly.
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="admissions-pop-primary-btn"
                  style={{ width: '100%', minHeight: '44px' }}
                >
                  Close
                </button>
              </motion.div>
            ) : (
              <form className="admissions-pop-form" onSubmit={handleSubmit}>
                <div className="admissions-pop-form-group">
                  <label>Student Name</label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    placeholder="Full name of the student"
                    required
                  />
                </div>

                <div className="admissions-pop-form-group">
                  <label>Class Applying For</label>
                  <select
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Class</option>
                    <option value="Pre-Primary">Pre-Primary (Nursery/PP1/PP2)</option>
                    <option value="Primary">Primary (Grade I - V)</option>
                    <option value="Middle">Middle (Grade VI - VIII)</option>
                  </select>
                </div>

                <div className="admissions-pop-form-group">
                  <label>Parent Name</label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    placeholder="Parent / Guardian name"
                    required
                  />
                </div>

                <div className="admissions-pop-form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    required
                  />
                </div>

                <div className="admissions-pop-form-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Any specific questions?"
                  ></textarea>
                </div>

                {status === 'error' && (
                  <div className="admissions-pop-error">
                    <AlertCircle size={14} /> Failed to send enquiry. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="admissions-pop-submit-btn"
                >
                  {isSubmitting ? (
                    <>Processing... <Loader2 size={16} className="animate-spin" /></>
                  ) : (
                    <>Register Enquiry <Send size={16} /></>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return typeof document !== 'undefined' ? createPortal(overlay, document.body) : overlay;
}

