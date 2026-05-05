"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { DEFAULT_BLUR } from '@/lib/blurPlaceholder';

export type LightboxImage = {
  src: string;
  blurDataURL?: string;
};

interface FacilityLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: LightboxImage[];
  title: string;
  /** Which image to show when the lightbox opens */
  initialIndex?: number;
}

const FacilityLightbox: React.FC<FacilityLightboxProps> = ({
  isOpen,
  onClose,
  images,
  title,
  initialIndex = 0,
}) => {
  const safeInitial = Math.min(Math.max(0, initialIndex), Math.max(0, images.length - 1));
  const [currentIndex, setCurrentIndex] = useState(safeInitial);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen) return null;
  const current = images[currentIndex];
  if (!current?.src) return null;

  const overlay = (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(10, 36, 99, 0.98)',
          backdropFilter: 'blur(18px)',
          padding: 'clamp(1rem, 3vw, 2.5rem)',
        }}
        onClick={onClose}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            zIndex: 100001,
            background: 'transparent',
            border: 'none',
            padding: '0.75rem',
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          <X size={40} />
        </button>

        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '72rem',
            aspectRatio: '16 / 9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: '2.5rem',
              overflow: 'hidden',
              boxShadow: '0 40px 80px rgba(0,0,0,0.35)',
              border: '8px solid rgba(255,255,255,0.10)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.src}
              alt={`${title} view ${currentIndex + 1}`}
              fill
              sizes="min(96vw, 1200px)"
              placeholder="blur"
              blurDataURL={current.blurDataURL ?? DEFAULT_BLUR}
              style={{ objectFit: 'cover' }}
              priority
            />
          </motion.div>

          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous image"
                style={{
                  position: 'absolute',
                  left: '1rem',
                  width: '4rem',
                  height: '4rem',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,0.10)',
                  border: '1px solid rgba(255,255,255,0.20)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={next}
                aria-label="Next image"
                style={{
                  position: 'absolute',
                  right: '1rem',
                  width: '4rem',
                  height: '4rem',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,0.10)',
                  border: '1px solid rgba(255,255,255,0.20)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: '-4rem',
              textAlign: 'center',
              color: '#fff',
            }}
          >
            <h4
              style={{
                fontSize: '1.5rem',
                fontWeight: 900,
                margin: '0 0 0.5rem 0',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
              }}
            >
              {title}
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              {images.map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: '0.375rem',
                    borderRadius: '999px',
                    transition: 'all 0.3s ease',
                    width: i == currentIndex ? '2rem' : '0.5rem',
                    background: i == currentIndex ? '#F5A623' : 'rgba(255,255,255,0.30)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );

  return typeof document !== 'undefined' ? createPortal(overlay, document.body) : overlay;
};

export default FacilityLightbox;
