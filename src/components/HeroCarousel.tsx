'use client';

import { useCallback, useEffect, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { HOME_HERO_EVENT } from '@/lib/goToHomeHero';

export type HeroSlide = {
  id: string;
  desktop: StaticImageData | string;
  mobile?: StaticImageData | string;
  alt: string;
  /** Lighter overlay for slides with built-in text/graphics */
  overlayOpacity?: number;
  /** Banner-style slide (contain on narrow screens) */
  variant?: 'photo' | 'banner';
};

type HeroCarouselProps = {
  slides: HeroSlide[];
  autoPlayMs?: number;
  onSlideChange?: (index: number) => void;
  children?: (activeIndex: number) => React.ReactNode;
};

export default function HeroCarousel({
  slides,
  autoPlayMs = 6000,
  onSlideChange,
  children,
}: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (slides.length === 0) return;
      setActiveIndex(((index % slides.length) + slides.length) % slides.length);
    },
    [slides.length],
  );

  useEffect(() => {
    onSlideChange?.(activeIndex);
  }, [activeIndex, onSlideChange]);

  useEffect(() => {
    const resetToFirstSlide = () => goTo(0);
    window.addEventListener(HOME_HERO_EVENT, resetToFirstSlide);
    return () => window.removeEventListener(HOME_HERO_EVENT, resetToFirstSlide);
  }, [goTo]);

  useEffect(() => {
    if (slides.length <= 1 || paused) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, autoPlayMs);

    return () => window.clearInterval(timer);
  }, [slides.length, autoPlayMs, paused]);

  if (slides.length === 0) return null;

  return (
    <>
      {slides.map((slide, index) => {
        const mobileSrc = slide.mobile ?? slide.desktop;
        const isActive = index === activeIndex;
        const overlayOpacity = slide.overlayOpacity ?? 0.15;
        const slideClass = [
          'hero-slide',
          isActive ? 'active' : '',
          slide.variant === 'banner' ? 'hero-slide--banner' : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <div
            key={slide.id}
            className={slideClass}
            style={{ zIndex: isActive ? 1 : 0 }}
            aria-hidden={!isActive}
          >
            <Image
              src={slide.desktop}
              alt={slide.alt}
              className="hero-slide-img desktop-only"
              fill
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              sizes="(min-width: 769px) 100vw, 1px"
              placeholder="blur"
            />
            <Image
              src={mobileSrc}
              alt={slide.alt}
              className="hero-slide-img mobile-only"
              fill
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              sizes="(max-width: 768px) 100vw, 1px"
              placeholder="blur"
            />
            <div
              className="hero-slide-overlay"
              style={{ background: `rgba(0,0,0,${overlayOpacity})` }}
            />
          </div>
        );
      })}

      {children?.(activeIndex)}

      {slides.length > 1 && (
        <div
          className="slider-controls"
          role="tablist"
          aria-label="Hero slideshow"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              className={`slider-dot${index === activeIndex ? ' active' : ''}`}
              aria-label={`Show slide ${index + 1}: ${slide.alt}`}
              aria-selected={index === activeIndex}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      )}
    </>
  );
}
