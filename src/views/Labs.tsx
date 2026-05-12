'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Microscope, Laptop, Calculator, BookOpen, Zap } from 'lucide-react';
import FacilityLightbox from '@/components/FacilityLightbox';
import './Home.css';

const Labs = () => {
  const [selectedLab, setSelectedLab] = React.useState<{ title: string; images: string[] } | null>(null);
  const labs = [
    {
      title: 'Composite Science Lab',
      icon: <Microscope />,
      img: '/images/composite_science_lab.png',
      desc: 'Equipped with the latest apparatus for Physics, Chemistry, and Biology experiments.',
      gallery: [
        '/images/composite_science_lab.png',
      ],
    },
    {
      title: 'Computer Intelligence Lab',
      icon: <Laptop />,
      img: '/images/labs/computer-1.jpg',
      desc: 'High-speed internet and modern systems for coding, AI, and digital literacy.',
      gallery: [
        '/images/labs/computer-1.jpg',
        '/images/labs/computer-2.jpg',
      ],
    },
    {
      title: 'Mathematical Explorer Zone',
      icon: <Calculator />,
      img: '/images/labs/math-1.jpg',
      desc: 'Making abstract concepts concrete through 3D models and interactive tools.',
      gallery: [
        '/images/labs/math-1.jpg',
        '/images/labs/math-2.jpg',
      ],
    },
    {
      title: 'Space Lab & Astronomy',
      icon: <Zap />,
      img: '/images/labs/space-1.jpg',
      desc: 'Embark on an exhilarating journey through the cosmos with our specialized space science simulations and telescopes.',
      gallery: [
        '/images/labs/space-1.jpg',
        '/images/labs/space-2.jpg',
      ],
    },
    {
      title: 'Robotics & Innovation Lab',
      icon: <Zap />,
      img: '/images/labs/robotics-1.jpg',
      desc: 'Where students build and program robots for national level competitions.',
      gallery: [
        '/images/labs/robotics-1.jpg',
        '/images/labs/robotics-2.jpg',
      ],
    },
  ];

  return (
    <div className="labs-page">
      <section className="page-header" style={{ background: 'linear-gradient(to bottom, #f8fafc, #ffffff)', padding: '6rem 0 1rem', textAlign: 'center' }}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-brand-name" 
            style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', color: '#0A2463' }}
          >
            Labs & <span className="text-primary" style={{ color: '#0DB6B5' }}>Facilities</span>
          </motion.h1>
          <p className="hero-brand-tagline" style={{ color: '#64748b', fontSize: '1.25rem', margin: '1rem auto 0' }}>Infrastructure designed to spark curiosity and innovation.</p>
        </div>
      </section>

      <section className="labs-grid-section section">
        <div className="container">
          <div className="creative-grid centered-flex">
            {labs.map((lab, i) => (
              <motion.div 
                key={i} 
                className="blob-card"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedLab({ title: lab.title, images: lab.gallery })}
                whileInView={{ scale: [0.95, 1], rotate: i % 2 === 0 ? -1 : 1 }}
              >
                <div className="blob-card-img" style={{ height: '200px', borderRadius: '20px', overflow: 'hidden', border: '3px solid #000', marginBottom: '1.5rem' }}>
                  <img src={lab.img} alt={lab.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="blob-card-icon" style={{ background: 'var(--c-sky)' }}>{lab.icon}</div>
                <h3 style={{ fontWeight: 800 }}>{lab.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>{lab.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Library Section */}
      <section className="library-section section" style={{ background: 'var(--page-bg)' }}>
        <div className="container">
          <div className="contact-grid contact-grid-labs">
            <div>
              <h2 className="section-title-spark"><BookOpen /> The Digital Library</h2>
              <p style={{ marginTop: '2rem', fontSize: '1.1rem', lineHeight: '1.8' }}>
                With over 10,000 physical books and a vast digital repository, our library 
                is the heart of knowledge on campus. It features quiet study zones and 
                collaborative spaces.
              </p>
            </div>
            <div className="polaroid-card">
              <div className="polaroid-taped"></div>
              <img
                src="/images/labs/library-1.jpg"
                alt="Students reading in a modern school library"
                style={{ width: '100%', borderRadius: '15px' }}
              />
            </div>
          </div>
        </div>
      </section>

      <FacilityLightbox 
        isOpen={!!selectedLab}
        onClose={() => setSelectedLab(null)}
        images={(selectedLab?.images || []).map((src) => ({ src }))}
        title={selectedLab?.title || ''}
      />
    </div>
  );
};

export default Labs;
