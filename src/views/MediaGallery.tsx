'use client';

import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, Newspaper } from 'lucide-react';
import { DEFAULT_BLUR } from '@/lib/blurPlaceholder';
import type { MediaGalleryItem } from '@/lib/mediaGallery';
import './MediaGallery.css';

export type MediaGalleryProps = {
  items: (MediaGalleryItem & { blurDataURL?: string })[];
};

const MediaGallery = ({ items }: MediaGalleryProps) => {
  const [selected, setSelected] = useState<(MediaGalleryItem & { blurDataURL?: string }) | null>(
    null,
  );
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openIndex = selected ? items.findIndex((item) => item.id === selected.id) : -1;

  const goPrev = useCallback(() => {
    if (!selected || openIndex <= 0) return;
    setSelected(items[openIndex - 1]);
  }, [selected, openIndex, items]);

  const goNext = useCallback(() => {
    if (!selected || openIndex < 0 || openIndex >= items.length - 1) return;
    setSelected(items[openIndex + 1]);
  }, [selected, openIndex, items]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [selected, goPrev, goNext]);

  const spring = reduceMotion
    ? { duration: 0.01 }
    : { type: 'spring' as const, stiffness: 380, damping: 28 };

  return (
    <div className="media-gallery-page">
      <section className="media-gallery-hero">
        <div className="container media-gallery-hero-copy">
          <motion.div
            className="media-gallery-hero-inner"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
          >
            <span className="media-gallery-badge">
              <Newspaper size={16} aria-hidden />
              Press &amp; Publications
            </span>
            <h1 className="media-gallery-title">
              Media <span className="text-primary">Gallery</span>
            </h1>
            <p className="media-gallery-lead">
              Newspaper coverage and publications featuring Malla Reddy School. Tap any clipping to
              read it full size.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="media-gallery-section section">
        <div className="container">
          <div className="media-gallery-grid">
            {items.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                className="media-gallery-card"
                aria-label={`Open ${item.publication}: ${item.title}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ ...spring, delay: reduceMotion ? 0 : index * 0.08 }}
                whileHover={reduceMotion ? {} : { y: -6 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelected(item)}
              >
                <span className="media-gallery-card-frame">
                  <Image
                    src={item.src}
                    alt={`${item.publication} — ${item.title}`}
                    fill
                    className="media-gallery-card-img"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL={item.blurDataURL ?? DEFAULT_BLUR}
                  />
                </span>
                <span className="media-gallery-card-body">
                  <span className="media-gallery-card-pub">{item.publication}</span>
                  <span className="media-gallery-card-title">{item.title}</span>
                  <span className="media-gallery-card-date">{item.date}</span>
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {mounted && selected
        ? createPortal(
            <AnimatePresence>
              <motion.div
                className="media-gallery-lightbox"
                role="dialog"
                aria-modal="true"
                aria-label="Newspaper clipping viewer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setSelected(null)}
              >
                <motion.div
                  className="media-gallery-lightbox-inner"
                  initial={{ opacity: 0, scale: 0.94, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 12 }}
                  transition={spring}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    className="media-gallery-lightbox-close"
                    aria-label="Close"
                    onClick={() => setSelected(null)}
                  >
                    <X size={28} strokeWidth={2} />
                  </button>

                  {openIndex > 0 && (
                    <button
                      type="button"
                      className="media-gallery-lightbox-nav media-gallery-lightbox-nav--prev"
                      aria-label="Previous clipping"
                      onClick={(e) => {
                        e.stopPropagation();
                        goPrev();
                      }}
                    >
                      <ChevronLeft size={36} />
                    </button>
                  )}
                  {openIndex >= 0 && openIndex < items.length - 1 && (
                    <button
                      type="button"
                      className="media-gallery-lightbox-nav media-gallery-lightbox-nav--next"
                      aria-label="Next clipping"
                      onClick={(e) => {
                        e.stopPropagation();
                        goNext();
                      }}
                    >
                      <ChevronRight size={36} />
                    </button>
                  )}

                  <div className="media-gallery-lightbox-figure">
                    <Image
                      src={selected.src}
                      alt={`${selected.publication} — ${selected.title}`}
                      fill
                      className="media-gallery-lightbox-img"
                      sizes="min(92vw, 720px)"
                      priority
                      placeholder="blur"
                      blurDataURL={selected.blurDataURL ?? DEFAULT_BLUR}
                    />
                  </div>
                  <div className="media-gallery-lightbox-meta">
                    <p className="media-gallery-lightbox-pub">{selected.publication}</p>
                    <h2>{selected.title}</h2>
                    <p className="media-gallery-lightbox-date">{selected.date}</p>
                    <p className="media-gallery-lightbox-summary">{selected.summary}</p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>,
            document.body,
          )
        : null}
    </div>
  );
};

export default MediaGallery;
