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
import { MilestonesOfExcellence } from '../components/MilestonesOfExcellence';
import FacilityLightbox from '@/components/FacilityLightbox';
import DynamicCalendar from '../components/DynamicCalendar';
import {
  fetchGalleryItemsFromPublishedSheet,
  normalizeGalleryImageUrl,
} from '@/lib/galleryFromPublishedSheet';
import { PROGRAM_SECTION_IMAGES } from '@/lib/programSectionImages';
import { fetchDataFromSheet } from '@/lib/sheets';

// REPLACE THIS WITH YOUR REAL SHEET ID
const GOOGLE_SHEET_ID = "1yq3iz43AgYISZKXJEE6P6aMmYme84eo8SXPmsgCt4Bs";
const GIDS = {
  GALLERY: '438455533',
  PROGRAMS: '185361245', 
  FACILITIES: '1248382523' 
};

// Use the same "Published to web" CSV pattern as Achievements (only gid differs)
const FACILITIES_SHEET_URL = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTbL71Gd0aoSu7IjhZAmInxnV1VUvEmTHb6rM7IINr-n2dibyvMqx3CZ4zXjHceVaAHi7v2XRC5HRmE/pub?gid=1248382523&single=true&output=csv&t=${Date.now()}`;

/** Homepage hero — provided by user */
const HERO_IMAGE = '/malla-reddy-hero.jpg';
const HERO_IMAGE_MOBILE = '/malla-reddy-hero-mobile.png';



// Framer Motion v12+ deprecates motion(); prefer motion.create()
const MotionLink = motion.create(Link);



interface Program {
  title: string;
  desc: string;
  image: string;
  icon: string;
}

interface Facility {
  images: string[];
}

type RawGalleryItem = Record<string, unknown>;

function asString(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value == null) return '';
  return String(value);
}

/** Homepage facilities section: show at most this many photos */
const FACILITY_HOME_LIMIT = 9;

/** Mosaic tile sizes for the facilities grid */
function facilitiesMosaicClass(index: number): string {
  if (index % 7 === 0) return 'facilities-card facilities-card--wide';
  if (index % 5 === 0) return 'facilities-card facilities-card--tall';
  return 'facilities-card facilities-card--base';
}

const DEFAULT_PROGRAMS: Program[] = [
  {
    title: 'Pre-Primary',
    desc: 'Play-based learning that builds strong early foundations in language, numbers, and social skills.',
    image: PROGRAM_SECTION_IMAGES.prePrimary,
    icon: 'Star',
  },
  {
    title: 'Primary',
    desc: 'Core academics with activities that develop curiosity, confidence, and communication skills.',
    image: PROGRAM_SECTION_IMAGES.primary,
    icon: 'BookOpen',
  },
  {
    title: 'Middle (up to 8th class)',
    desc: 'Concept-driven learning with labs and projects to prepare students for higher classes.',
    image: PROGRAM_SECTION_IMAGES.middle,
    icon: 'Microscope',
  },
];

const Home = () => {
  const [galleryPreview, setGalleryPreview] = useState<{src: string, title: string}[]>([]);
  const [galleryMore, setGalleryMore] = useState<{src: string, title: string, cat: string}[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [facilityImages, setFacilityImages] = useState<string[]>([]);
  const [isFacilitiesLoading, setIsFacilitiesLoading] = useState(true);
  const [facilityViewerOpen, setFacilityViewerOpen] = useState(false);
  const [facilityViewerIndex, setFacilityViewerIndex] = useState(0);

  useEffect(() => {
    async function loadContent() {
      // Gallery via Apps Script
      try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbxzGg_9G09RThkXBTfxYnfdP25qbKjX07MAeN-9ABYwglidLfK6RvTizNWbiTuEzgk/exec?type=gallery");
        const galleryJson: unknown = await response.json();
        const galleryData: RawGalleryItem[] = Array.isArray(galleryJson)
          ? (galleryJson as RawGalleryItem[])
          : [];
        
        let validGallery = galleryData
          .filter((item) => {
            const src = item.coverimage ?? item.coverImage ?? item.src;
            const srcStr = asString(src);
            return srcStr.length > 10;
          })
          .map((item) => {
            const rawSrc = asString(item.coverimage ?? item.coverImage ?? item.src);
            const imgs = rawSrc.split(/[,|]/).map((s: string) => s.trim()).filter(Boolean);
            return {
              src: normalizeGalleryImageUrl(imgs[0] || ''),
              title: asString(item.title ?? item.Title) || 'School Moment',
              category: asString(item.category ?? item.Category) || 'General',
            };
          })
          .filter(
            (item: { src: string }) =>
              item.src && (item.src.startsWith('http') || item.src.startsWith('/')),
          );

        if (validGallery.length === 0) {
          try {
            const fromSheet = await fetchGalleryItemsFromPublishedSheet();
            validGallery = fromSheet.map((g) => ({
              src: g.src,
              title: g.title,
              category: g.category,
            }));
          } catch {
            /* Sheet unavailable — leave homepage gallery empty */
          }
        }

        if (validGallery.length > 0) {
          setGalleryPreview(validGallery.slice(0, 3));
          if (validGallery.length > 3) {
            setGalleryMore(
              validGallery.slice(3, 7).map((item) => ({
                src: item.src,
                title: item.title,
                cat: item.category,
              })),
            );
          }
        }
      } catch (err) {
        console.error("Gallery fetch error:", err);
        try {
          const fromSheet = await fetchGalleryItemsFromPublishedSheet();
          if (fromSheet.length > 0) {
            setGalleryPreview(fromSheet.slice(0, 3).map((g) => ({ src: g.src, title: g.title })));
            if (fromSheet.length > 3) {
              setGalleryMore(
                fromSheet.slice(3, 7).map((g) => ({
                  src: g.src,
                  title: g.title,
                  cat: g.category,
                })),
              );
            }
          }
        } catch {
          /* ignore */
        }
      }
      // Programs
      const programsData = await fetchDataFromSheet<Program>(GOOGLE_SHEET_ID, GIDS.PROGRAMS, (cols) => ({
        title: cols[0]?.trim(),
        desc: cols[1]?.trim(),
        image: cols[2]?.trim(),
        icon: cols[3]?.trim() || 'Star'
      }));
      const validPrograms = programsData.filter(p => p.title && p.image && (p.image.startsWith('http') || p.image.startsWith('/')));
      const existingTitles = new Set(validPrograms.map(p => p.title.trim().toLowerCase()));
      const mergedPrograms = [
        ...DEFAULT_PROGRAMS.filter(p => !existingTitles.has(p.title.trim().toLowerCase())),
        ...validPrograms,
      ];
      if (mergedPrograms.length > 0) setPrograms(mergedPrograms);

      // Facilities
      setIsFacilitiesLoading(true);
      try {
        const facilitiesData = await fetchDataFromSheet<Facility>(
          FACILITIES_SHEET_URL,
          '0',
          (cols) => {
            // Robust: facilities sheet columns may vary; extract URLs from any cell.
            const images = cols
              .flatMap((cell) => (cell ? cell.split(/[,|]/) : []))
              .map((s) => s.trim())
              .filter((s) => s.startsWith('http') || s.startsWith('/'))
              .filter(Boolean);

            return { images };
          }
        );

        if (facilitiesData && facilitiesData.length > 0) {
          const validFacilities = facilitiesData.filter((f) => f.images?.length > 0);
          const allImages = Array.from(new Set(validFacilities.flatMap((f) => f.images)));
          setFacilityImages(allImages);
        }
      } catch (err) {
        console.error("Facilities fetch error:", err);
      } finally {
        setIsFacilitiesLoading(false);
      }
    }
    loadContent();
  }, []);

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


  return (
    <div className="home" style={{ color: '#1a1a1a' }}>
      <section className="hero-modern">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          className="hero-slide active"
          style={{ zIndex: 1 }}
        >
          <Image
            src={HERO_IMAGE}
            alt="Happy students walking towards the welcoming entrance of Malla Reddy School"
            className="hero-slide-img desktop-only"
            fill
            priority
            loading="eager"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
          <Image
            src={HERO_IMAGE_MOBILE}
            alt="Happy students walking towards the welcoming entrance of Malla Reddy School"
            className="hero-slide-img mobile-only"
            fill
            priority
            loading="eager"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </motion.div>
        <div
          className="hero-overlay"
          style={{
            background: 'rgba(0,0,0,0.15)',
          }}
        />



        <div className="container hero-content-container">
          {/* Hero content removed as per request */}
        </div>
      </section>
      {/* Journey */}
      <JourneySection />

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
                    <Image src={prog.image} fill style={{ objectFit: 'cover' }} alt={prog.title} />
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

      {/* 4. Why Choose Malla Reddy? */}
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
            Why Choose <span>Malla Reddy?</span>
          </motion.h2>
          <div className="trust-strip-grid">
            {[
              { img: "/images/safety/campus-safety.png", label: "Campus Safety" },
              { img: "/images/safety/health-safety.png", label: "Health and Safety Policy" },
              { img: "/images/safety/safety-hygiene.png", label: "Safety and Hygiene" },
              { img: "/images/safety/cctv.png", label: "CCTV" },
              { img: "/images/safety/pest-control.png", label: "Pest Control" }
            ].map((item, idx) => (
              <div key={idx} className="trust-item">
                <div className="trust-icon-img" style={{ position: 'relative', width: '64px', height: '64px', marginBottom: '1rem' }}>
                  <Image
                    src={item.img}
                    alt={item.label}
                    fill
                    sizes="64px"
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
      {!isFacilitiesLoading && facilityImages.length > 0 && (
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
              {facilityImages.slice(0, FACILITY_HOME_LIMIT).map((src, i) => (
                <motion.button
                  key={`${src}-${i}`}
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
                    {(src.startsWith('http') || src.startsWith('/')) && (
                      <Image
                        src={src}
                        alt={`Campus facility photo ${i + 1}`}
                        fill
                        className="facilities-card-img"
                        sizes="(max-width: 560px) 50vw, (max-width: 900px) 33vw, (max-width: 1400px) 28vw, 360px"
                        loading={i < 4 ? 'eager' : 'lazy'}
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
                  <span className="gallery-preview-frame">
                    {photo.src && (photo.src.startsWith('http') || photo.src.startsWith('/')) && (
                      <Image
                        src={photo.src}
                        alt=""
                        fill
                        className="gallery-preview-img"
                        sizes={
                          idx === 1
                            ? '(max-width: 639px) 96vw, (max-width: 768px) 92vw, (max-width: 1400px) 32vw, 34vw'
                            : '(max-width: 639px) 46vw, (max-width: 768px) 92vw, (max-width: 1400px) 32vw, 34vw'
                        }
                        priority={idx === 1}
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
            {galleryMore.map((photo, idx) => (
              <Link
                key={`${photo.src}-${idx}`}
                href="/gallery"
                className="gallery-tile gallery-tile--sm home-gallery-tile-link"
              >
                <span className="gallery-tile-glow" aria-hidden />
                <span className="gallery-tile-media">
                  {photo.src && (photo.src.startsWith('http') || photo.src.startsWith('/')) && (
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      className="gallery-tile-img"
                      sizes="(max-width: 640px) 50vw, 22vw"
                    />
                  )}
                </span>
                <span className="gallery-tile-bottom">
                  <span className="gallery-tile-title">{photo.title}</span>
                  <span className="gallery-tile-cat">{photo.cat}</span>
                </span>
              </Link>
            ))}
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
          <DynamicCalendar />
        </div>
      </section>

      {/* Milestones of Excellence (moved to bottom as requested) */}
      <MilestonesOfExcellence />

    </div>
  );
};

export default Home;
