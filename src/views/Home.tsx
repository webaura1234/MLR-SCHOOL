'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Star,
  BookOpen,
  Microscope,
  GraduationCap,
  Images,
  Building2,
} from 'lucide-react';
import './Home.css';
import './Gallery.css';
import { JourneySection } from '../components/JourneySection';
import { OurCampusesSection } from '../components/OurCampusesSection';
import FacilityLightbox from '@/components/FacilityLightbox';
import DynamicCalendar from '../components/DynamicCalendar';
import { formatGalleryCategory } from '@/lib/galleryCategories';
import { HOME_HERO_ID, scrollToHomeHero } from '@/lib/goToHomeHero';
import { DEFAULT_BLUR } from '@/lib/blurPlaceholder';

import HeroCarousel, { type HeroSlide } from '@/components/HeroCarousel';
import heroDesktop from '../../public/malla-reddy-hero.jpg';
import heroMobile from '../../public/malla-reddy-hero-mobile.jpg';
import heroAdmissions from '../../public/images/hero-admissions-2026-27.png';
import heroAdmissionsMobile from '../../public/images/hero-admissions-2026-27-mobile.jpg';
import safetyCampus from '../../public/images/safety/campus-safety.png';
import safetyHealth from '../../public/images/safety/health-safety.png';
import safetyHygiene from '../../public/images/safety/safety-hygiene.png';
import safetyCctv from '../../public/images/safety/cctv.png';
import safetyPest from '../../public/images/safety/pest-control.png';

// Framer Motion v12+ deprecates motion(); prefer motion.create()
const MotionLink = motion.create(Link);

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'campus',
    desktop: heroDesktop,
    mobile: heroMobile,
    alt: 'Malla Reddy School Medchal — Malla Reddy Schools CBSE campus in Hyderabad',
    overlayOpacity: 0.15,
    variant: 'photo',
  },
  {
    id: 'admissions-2026',
    desktop: heroAdmissions,
    mobile: heroAdmissionsMobile,
    alt: 'Malla Reddy School — 40+ years of legacy. Admissions open for 2026-27',
    overlayOpacity: 0,
    variant: 'banner',
  },
];

interface Program {
  title: string;
  desc: string;
  image: any;
  icon: string;
}

/** Homepage facilities section: show at most this many photos */
const FACILITY_HOME_LIMIT = 9;

/** Mosaic tile sizes for the facilities grid */
function facilitiesMosaicClass(index: number): string {
  if (index % 7 === 0) return 'facilities-card facilities-card--wide';
  if (index % 5 === 0) return 'facilities-card facilities-card--tall';
  return 'facilities-card facilities-card--base';
}

export type HomeProps = {
  galleryPreview: { src: string; title: string; blurDataURL?: string }[];
  galleryMore: { src: string; title: string; cat: string; blurDataURL?: string }[];
  programs: Program[];
  facilityImages: { src: string; blurDataURL?: string }[];
  calendarEvents: { id: string; title: string; date: string; category: "Exam" | "Holiday" | "Event" | "Activity" | "Exams" | "Holidays" | "Events" | "Activities"; description: string }[];
};

const Home = ({ galleryPreview, galleryMore, programs, facilityImages, calendarEvents }: HomeProps) => {
  const [facilityViewerOpen, setFacilityViewerOpen] = useState(false);
  const [facilityViewerIndex, setFacilityViewerIndex] = useState(0);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  useEffect(() => {
    if (window.location.hash !== `#${HOME_HERO_ID}`) return;
    requestAnimationFrame(() => scrollToHomeHero('smooth'));
  }, []);


  return (
    <div className="home" style={{ color: '#1a1a1a' }}>
      <section id={HOME_HERO_ID} className="hero-modern">
        <HeroCarousel slides={HERO_SLIDES} autoPlayMs={6000}>
          {(activeIndex) =>
            activeIndex === 0 ? (
              <motion.div
                key="hero-seo"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="container hero-content-container hero-seo-copy"
              >
                <h1 className="hero-seo-title">Malla Reddy School, Medchal</h1>
                <p className="hero-seo-tagline">
                  Malla Reddy Schools — a leading CBSE school in Medchal, Hyderabad with STEAM learning,
                  modern labs, and holistic education from pre-primary to middle school.
                </p>
              </motion.div>
            ) : null
          }
        </HeroCarousel>
      </section>
      {/* Journey */}
      <JourneySection />

      {/* Our Campuses */}
      <OurCampusesSection />

      {/* 3. Programs Offered */}
      <section
        className="section programs-section text-center"
        style={{ backgroundColor: 'var(--page-bg)', padding: '6rem 0' }}
      >
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title text-center"
            style={{ marginBottom: '4rem', fontSize: '2.5rem', color: '#333' }}
          >
            Programs Offered
          </motion.h2>
          <motion.div className="facilities-grid mobile-flex-grid">
            {programs.map((prog, idx) => {
              const IconComp =
                prog.icon === 'Star'
                  ? Star
                  : prog.icon === 'BookOpen'
                    ? BookOpen
                    : prog.icon === 'Microscope'
                      ? Microscope
                      : prog.icon === 'GraduationCap'
                        ? GraduationCap
                        : Star;

              return (
                <motion.div
                  key={idx}
                  className="blob-card"
                  style={{
                    background: '#ffffff',
                    borderColor: '#e2e8f0',
                    boxShadow: '8px 8px 0 #94a3b8',
                    padding: '0',
                    overflow: 'hidden',
                  }}
                >
                  <div className="blob-image-wrapper" style={{ position: 'relative', width: '100%', height: '200px' }}>
                    <Image
                      src={prog.image}
                      alt={prog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      placeholder="blur"
                      style={{ objectFit: 'cover' }}
                    />
                    <div
                      className="blob-card-icon-overlay"
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'white',
                        width: '50px',
                        height: '50px',
                        borderRadius: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                      }}
                    >
                      {React.createElement(IconComp, { size: 24, style: { color: 'var(--primary)' } })}
                    </div>
                  </div>
                  <div style={{ padding: '2rem' }}>
                    <h3 className="blob-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                      {prog.title}
                    </h3>
                    <p className="blob-desc" style={{ color: '#666', lineHeight: '1.6' }}>
                      {prog.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 4. Why Choose Malla Reddy School? */}
      <div className="trust-strip-wrapper">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="trust-strip"
        >
          <motion.h2
            initial={{ y: 18, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="trust-strip-heading trust-strip-heading--inside"
          >
            Why Choose <span>Malla Reddy School?</span>
          </motion.h2>
          <div className="trust-strip-grid">
            {[
              { img: safetyCampus, label: "Campus Safety" },
              { img: safetyHealth, label: "Health and Safety Policy" },
              { img: safetyHygiene, label: "Safety and Hygiene" },
              { img: safetyCctv, label: "CCTV" },
              { img: safetyPest, label: "Pest Control" }
            ].map((item, idx) => (
              <div key={idx} className="trust-item">
                <div className="trust-icon-img" style={{ position: 'relative', width: '64px', height: '64px', marginBottom: '1rem' }}>
                  <Image
                    src={item.img}
                    alt={item.label}
                    fill
                    sizes="64px"
                    placeholder="blur"
                    style={{ objectFit: 'contain', mixBlendMode: 'multiply' }}
                  />
                </div>
                <span className="trust-label" style={{ fontSize: '0.7rem', maxWidth: '100px' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 5. Our Facilities */}
      {/* Facilities Section — only show when loaded and has content */}
      {facilityImages.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section facilities-section facilities-showcase"
        >
          <div className="container facilities-showcase-inner">
            <motion.div
              className="facilities-showcase-head"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55 }}
            >
              <span className="facilities-showcase-badge">
                <Building2 size={16} aria-hidden />
                Campus & facilities
              </span>
              <h2 className="facilities-showcase-title">World-Class Facilities</h2>
              <p className="facilities-showcase-lead">
                Explore classrooms, grounds, and learning spaces — tap any photo for a full-screen view.
              </p>
              <span className="facilities-showcase-count">
                {facilityImages.length > FACILITY_HOME_LIMIT
                  ? `${FACILITY_HOME_LIMIT} of ${facilityImages.length} photos`
                  : `${facilityImages.length} photos`}
              </span>
            </motion.div>

            <motion.div
              className="facilities-mosaic"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px', amount: 0.08 }}
              variants={staggerContainer}
            >
              {facilityImages.slice(0, FACILITY_HOME_LIMIT).map((img, i) => (
                <motion.button
                  key={`${img.src}-${i}`}
                  type="button"
                  variants={fadeUpVariant}
                  className={facilitiesMosaicClass(i)}
                  aria-label={`Open facility photo ${i + 1} large`}
                  onClick={() => {
                    setFacilityViewerIndex(i);
                    setFacilityViewerOpen(true);
                  }}
                >
                  <span className="facilities-card-media">
                    {(img.src.startsWith('http') || img.src.startsWith('/')) && (
                      <Image
                        src={img.src}
                        alt={`Campus facility photo ${i + 1}`}
                        fill
                        className="facilities-card-img"
                        sizes="(max-width: 560px) 50vw, (max-width: 900px) 33vw, (max-width: 1400px) 28vw, 360px"
                        loading={i < 4 ? 'eager' : 'lazy'}
                        placeholder="blur"
                        blurDataURL={img.blurDataURL ?? DEFAULT_BLUR}
                      />
                    )}
                  </span>
                  <span className="facilities-card-frame" aria-hidden />
                  <span className="facilities-card-shade" aria-hidden />
                </motion.button>
              ))}
            </motion.div>
          </div>

          <FacilityLightbox
            key={facilityViewerOpen ? `facility-lb-${facilityViewerIndex}` : 'facility-lb-closed'}
            isOpen={facilityViewerOpen}
            onClose={() => setFacilityViewerOpen(false)}
            images={facilityImages.slice(0, FACILITY_HOME_LIMIT)}
            title="Campus facilities"
            initialIndex={facilityViewerIndex}
          />
        </motion.section>
      )}

      {/* 6. Moments from Malla Reddy School */}
      <section className="section home-gallery-section">
        <div className="container home-gallery-header-wrap">
          <motion.div
            className="home-gallery-header"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55 }}
          >
            <span className="home-gallery-badge">
              <Images size={18} aria-hidden />
              Gallery
            </span>
            <h2 className="home-gallery-title">Moments from Malla Reddy School</h2>
            <p className="home-gallery-lead">
              Same layout as our photo gallery — tap below to see the full collection.
            </p>
          </motion.div>
        </div>

        {/* 3-card preview — matches /gallery */}
        <div className="gallery-preview-outer">
          <div className="gallery-preview-stage">
            <div className="gallery-preview">
              {galleryPreview.map((photo, idx) => (
                <MotionLink
                  key={`${photo.src}-${idx}`}
                  href="/gallery"
                  className={`gallery-preview-card gallery-preview-card--${idx}`}
                  aria-label={`Open gallery: ${photo.title}`}
                  transition={{ type: 'spring', stiffness: 380, damping: 28, delay: idx * 0.08 }}
                  whileHover={
                    idx === 1
                      ? { y: -10, scale: 1.02, zIndex: 5 }
                      : { y: -6, scale: 1.03, zIndex: 4 }
                  }
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="gallery-preview-shine" aria-hidden />
                  <span className="gallery-preview-frame" style={{ position: 'relative' }}>
                    {photo.src && (photo.src.startsWith('http') || photo.src.startsWith('/')) && (
                      <Image
                        src={photo.src}
                        alt={photo.title}
                        fill
                        className="gallery-preview-img"
                        sizes={
                          idx === 1
                            ? '(max-width: 639px) 96vw, (max-width: 768px) 92vw, (max-width: 1400px) 32vw, 34vw'
                            : '(max-width: 639px) 46vw, (max-width: 768px) 92vw, (max-width: 1400px) 32vw, 34vw'
                        }
                        priority={idx === 1}
                        placeholder="blur"
                        blurDataURL={photo.blurDataURL ?? DEFAULT_BLUR}
                      />
                    )}
                    <span className="gallery-preview-caption">{photo.title}</span>
                  </span>
                </MotionLink>
              ))}
            </div>
          </div>
        </div>

        {/* Second row — compact tiles like the main gallery grid */}
        <div className="gallery-bento-shell home-gallery-more-shell">
          <div className="home-gallery-more-grid">
            {galleryMore.map((photo, idx) => {
              const categoryLabel = formatGalleryCategory(photo.cat);
              return (
              <Link
                key={`${photo.src}-${idx}`}
                href="/gallery"
                className="gallery-tile gallery-tile--sm home-gallery-tile-link"
              >
                <span className="gallery-tile-glow" aria-hidden />
                <span className="gallery-tile-media" style={{ position: 'absolute', inset: 0 }}>
                  {photo.src && (photo.src.startsWith('http') || photo.src.startsWith('/')) && (
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      className="gallery-tile-img"
                      sizes="(max-width: 640px) 50vw, 22vw"
                      placeholder="blur"
                      blurDataURL={photo.blurDataURL ?? DEFAULT_BLUR}
                    />
                  )}
                </span>
                <span className="gallery-tile-bottom">
                  <span className="gallery-tile-title">{photo.title}</span>
                  {categoryLabel ? (
                    <span className="gallery-tile-cat">{categoryLabel}</span>
                  ) : null}
                </span>
              </Link>
            );
            })}
          </div>
        </div>

        <div className="container home-gallery-cta-wrap">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.45 }}
          >
            <Link href="/gallery" className="btn-primary squishy-btn home-gallery-cta">
              View full gallery
              <ArrowRight size={18} className="inline-icon" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="calendar-section section">
        <div className="container">
      <DynamicCalendar events={calendarEvents} />
        </div>
      </section>

    </div>
  );
};

export default Home;
