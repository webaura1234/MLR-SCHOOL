'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Film, ArrowLeft, Sparkles } from 'lucide-react';

export default function MediaGalleryPage() {
  return (
    <div 
      className="media-gallery-page" 
      style={{ 
        minHeight: '80vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        background: 'var(--page-bg)',
        color: 'var(--foreground)'
      }}
    >
      <div 
        className="container" 
        style={{ 
          maxWidth: '560px', 
          textAlign: 'center' 
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '90px',
            height: '90px',
            borderRadius: '30px',
            background: 'var(--c-citrus, #fff9e6)',
            border: '4px solid #000',
            boxShadow: '8px 8px 0px #000',
            marginBottom: '2rem',
            color: 'var(--primary)'
          }}
        >
          <Film size={40} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{
            fontSize: 'clamp(2rem, 6vw, 3rem)',
            fontWeight: 900,
            marginBottom: '1rem',
            lineHeight: 1.15
          }}
        >
          Media <span className="text-primary">Gallery</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '99px',
            background: 'rgba(166, 124, 26, 0.1)',
            color: 'var(--accent)',
            fontSize: '0.8rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '1.5rem',
            border: '1px solid rgba(166, 124, 26, 0.2)'
          }}
        >
          <Sparkles size={14} /> Coming Soon
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            color: 'var(--muted-foreground)',
            fontSize: '1.05rem',
            lineHeight: 1.6,
            marginBottom: '2.5rem'
          }}
        >
          We are currently preparing an exciting collection of school videos, events highlights, newsletters, and publications. Stay tuned to explore our digital moments!
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link 
            href="/" 
            className="btn-primary squishy-btn"
            style={{ 
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontWeight: 700
            }}
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
