'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, ArrowLeft, Maximize2, Sparkles, ArrowRight } from 'lucide-react';
import FacilityLightbox from '@/components/FacilityLightbox';
import { DEFAULT_BLUR } from '@/lib/blurPlaceholder';
import './Infrastructure.css';

export type InfrastructureProps = {
  facilityImages: { src: string; title?: string; blurDataURL?: string }[];
};

export default function Infrastructure({ facilityImages }: InfrastructureProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <div className="infrastructure-page">
      {/* 1. Hero Header Section */}
      <section className="infrastructure-hero">
        <div className="container infrastructure-hero-inner">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="infrastructure-hero-content"
          >
            <div className="infrastructure-top-bar">
              <Link href="/" className="infrastructure-back-link">
                <ArrowLeft size={16} aria-hidden />
                <span>Back to Home</span>
              </Link>
            </div>

            <span className="infrastructure-badge">
              <Building2 size={16} aria-hidden />
              Campus & Facilities
            </span>

            <h1 className="infrastructure-title">
              Our <span className="text-highlight">Infrastructure</span>
            </h1>

            <p className="infrastructure-lead">
              State-of-the-art classrooms, sports grounds, science and computer labs, STEAM learning spaces,
              and safe campus environments designed to spark curiosity and holistic growth.
            </p>

            <div className="infrastructure-meta">
              <span className="infrastructure-count-pill">
                <Sparkles size={14} aria-hidden />
                {facilityImages.length} Campus Facilities & Photos
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Gallery Grid Section */}
      <section className="infrastructure-gallery-section">
        <div className="container">
          {facilityImages.length === 0 ? (
            <div className="infrastructure-empty">
              <p>No facility photos available at the moment.</p>
            </div>
          ) : (
            <motion.div
              className="infrastructure-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {facilityImages.map((img, i) => (
                <motion.button
                  key={`${img.src}-${i}`}
                  type="button"
                  variants={cardVariants}
                  className="infrastructure-card"
                  aria-label={`Open campus facility photo ${i + 1} full screen`}
                  onClick={() => {
                    setLightboxIndex(i);
                    setLightboxOpen(true);
                  }}
                >
                  <span className="infrastructure-card-media">
                    {(img.src.startsWith('http') || img.src.startsWith('/')) && (
                      <Image
                        src={img.src}
                        alt={img.title || `Malla Reddy School campus facility ${i + 1}`}
                        fill
                        unoptimized
                        className="infrastructure-card-img"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading={i < 6 ? 'eager' : 'lazy'}
                        placeholder="blur"
                        blurDataURL={img.blurDataURL ?? DEFAULT_BLUR}
                      />
                    )}
                  </span>

                  {/* Subtle hover gradient and zoom indicator icon */}
                  <span className="infrastructure-card-overlay">
                    <span className="infrastructure-zoom-btn" aria-hidden>
                      <Maximize2 size={20} />
                    </span>
                  </span>
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* Bottom Call to Action Section */}
          <motion.div
            className="infrastructure-bottom-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="infrastructure-cta-card">
              <h2>Experience Our Campus Firsthand</h2>
              <p>Schedule a guided campus tour or start your child's admission process today.</p>
              <div className="infrastructure-cta-actions">
                <Link href="/admission" className="btn-primary squishy-btn">
                  <span>Admissions Procedure</span>
                  <ArrowRight size={18} aria-hidden />
                </Link>
                <Link href="/contact" className="infrastructure-sec-btn">
                  <span>Schedule Campus Visit</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <FacilityLightbox
        key={lightboxOpen ? `infra-lb-${lightboxIndex}` : 'infra-lb-closed'}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={facilityImages}
        title="Campus Infrastructure & Facilities"
        initialIndex={lightboxIndex}
      />
    </div>
  );
}
