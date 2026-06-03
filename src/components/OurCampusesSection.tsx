'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { OUR_CAMPUSES, CAMPUS_IMAGE_FALLBACK, type Campus } from '@/lib/campuses';
import { DEFAULT_BLUR } from '@/lib/blurPlaceholder';
import './OurCampusesSection.css';

const AUTO_MS = 3000;

type VisibleCampus = Campus & { key: string };

function CampusCardImage({ campus }: { campus: VisibleCampus }) {
  const [src, setSrc] = useState(campus.image);

  return (
    <Image
      src={src}
      alt={campus.name}
      fill
      className="campus-card-image"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 720px"
      placeholder="blur"
      blurDataURL={DEFAULT_BLUR}
      onError={() => {
        if (src !== CAMPUS_IMAGE_FALLBACK) setSrc(CAMPUS_IMAGE_FALLBACK);
      }}
    />
  );
}

export function OurCampusesSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [visibleCount, setVisibleCount] = useState(2);
  const [hydrated, setHydrated] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = OUR_CAMPUSES.length;

  const updateVisibleCount = useCallback(() => {
    setVisibleCount(window.innerWidth < 640 ? 1 : 2);
  }, []);

  useEffect(() => {
    setHydrated(true);
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, [updateVisibleCount]);

  const goNext = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(goNext, AUTO_MS);
  }, [goNext]);

  useEffect(() => {
    if (!hydrated) return;
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hydrated, resetTimer]);

  const visible: VisibleCampus[] = useMemo(() => {
    return Array.from({ length: visibleCount }, (_, offset) => {
      const campus = OUR_CAMPUSES[(index + offset) % total];
      return {
        ...campus,
        key: `${index}-${offset}-${campus.name}`,
      };
    });
  }, [index, visibleCount, total]);

  const handlePrev = () => {
    goPrev();
    resetTimer();
  };

  const handleNext = () => {
    goNext();
    resetTimer();
  };

  const slideX = direction > 0 ? 24 : -24;

  return (
    <section className="our-campuses-section" aria-labelledby="our-campuses-title">
      <div className="our-campuses-glow" aria-hidden />

      <div className="our-campuses-inner">
        <header className="our-campuses-header">
          <motion.h2
            id="our-campuses-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="our-campuses-title"
          >
            Our Campuses
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="our-campuses-desc"
          >
            Extending the Malla Reddy legacy across Hyderabad, providing world-class education in your
            neighborhood through our prestigious campuses.
          </motion.p>
        </header>

        <div className="our-campuses-carousel">
          <button
            type="button"
            className="our-campuses-nav our-campuses-nav--prev"
            aria-label="Previous campus"
            onClick={handlePrev}
          >
            <ChevronLeft size={20} aria-hidden />
          </button>

          <button
            type="button"
            className="our-campuses-nav our-campuses-nav--next"
            aria-label="Next campus"
            onClick={handleNext}
          >
            <ChevronRight size={20} aria-hidden />
          </button>

          <div className="our-campuses-viewport">
            <div className="our-campuses-track">
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.map((campus) => (
                  <motion.article
                    key={campus.key}
                    layout
                    initial={{ opacity: 0, x: slideX }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -slideX }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className={`campus-card${visibleCount === 1 ? ' campus-card--solo' : ''}`}
                  >
                    <div className="campus-card-image-wrap">
                      <CampusCardImage campus={campus} />
                    </div>
                    <div className="campus-card-shade" aria-hidden />
                    <div className="campus-card-shine" aria-hidden />
                    <div className="campus-card-caption">
                      <h3
                        className={`campus-card-name${campus.board?.trim() ? ' campus-card-name--spaced' : ''}`}
                      >
                        {campus.name}
                      </h3>
                      {campus.board?.trim() ? (
                        <p className="campus-card-board">{campus.board}</p>
                      ) : null}
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
