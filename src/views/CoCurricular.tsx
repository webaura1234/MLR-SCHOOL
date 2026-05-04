'use client'; 

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import './CoCurricular.css';

/** Unsplash Source (source.unsplash.com) is discontinued — use images.unsplash.com with stable photo IDs. */
function unsplashPhoto(idWithSuffix: string, width = 1400) {
  return `https://images.unsplash.com/photo-${idWithSuffix}?auto=format&fit=crop&w=${width}&q=82`;
}

type Category = 'All' | 'Arts' | 'Indoor' | 'Outdoor';

interface Activity {
  id: string;
  title: string;
  category: Category;
  description: string;
  image: string;
}

const ACTIVITIES: Activity[] = [
  // Arts — children / classroom / creative (Unsplash; diverse school-age imagery)
  {
    id: 'dance',
    title: 'Dance',
    category: 'Arts',
    description: 'Classical and contemporary dance forms to enhance rhythm, poise, and cultural expression.',
    image: unsplashPhoto('1571019613454-1cb2f99b2d8b'),
  },
  {
    id: 'music',
    title: 'Music',
    category: 'Arts',
    description: 'Vocal and instrumental training, including keyboard and guitar, fostering melodic intelligence.',
    image: unsplashPhoto('1516280440614-37939bbacd81'),
  },
  {
    id: 'art-craft',
    title: 'Art & Craft',
    category: 'Arts',
    description: 'Unleashing creativity through painting, sculpting, and sustainable crafting workshops.',
    image: unsplashPhoto('1596495577886-d920f1fb7238'),
  },
  // Indoor
  {
    id: 'carroms',
    title: 'Carroms',
    category: 'Indoor',
    description: 'Strategic indoor game that blends skill, concentration, and fine motor skills development.',
    image: unsplashPhoto('1516979187457-637abb4f9353'),
  },
  {
    id: 'chess',
    title: 'Chess',
    category: 'Indoor',
    description: 'Grandmaster training sessions to develop logical thinking and strategic foresight.',
    image: unsplashPhoto('1580582932707-520aed937b7b'),
  },
  {
    id: 'table-tennis',
    title: 'Table Tennis',
    category: 'Indoor',
    description: 'Fast-paced action to improve reflexes and hand-eye coordination.',
    image: unsplashPhoto('1558618666-fcd25c85cd64'),
  },
  // Outdoor
  {
    id: 'cricket',
    title: 'Cricket',
    category: 'Outdoor',
    description: 'Professional coaching at our standard cricket nets with regular inter-school matches.',
    image: unsplashPhoto('1517649763962-0c623066013b'),
  },
  {
    id: 'tennis',
    title: 'Tennis',
    category: 'Outdoor',
    description: 'Professional clay and synthetic courts for budding tennis stars.',
    image: unsplashPhoto('1576091160399-112ba8d25d1d'),
  },
  {
    id: 'basketball',
    title: 'Basketball',
    category: 'Outdoor',
    description: 'Enhancing teamwork and agility through high-energy court sessions.',
    image: unsplashPhoto('1461896836934-ffe607ba8211'),
  },
  {
    id: 'athletics',
    title: 'Athletics',
    category: 'Outdoor',
    description: 'Focusing on physical fitness, speed, and endurance through various track and field events.',
    image: unsplashPhoto('1627664819818-e147d6221422'),
  },
  {
    id: 'kabaddi',
    title: 'Kabaddi & Kho-Kho',
    category: 'Outdoor',
    description: 'Promoting traditional Indian sports to build strength and agility.',
    image: unsplashPhoto('1523240795612-9a054b0db644'),
  },
];

const CoCurricular = () => {
  const [activeTab, setActiveTab] = useState<Category>('All');

  return (
    <div className="co-curricular-page">
      {/* Hero Section */}
      <section className="co-curricular-hero">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Holistic <span style={{ color: '#F5A623' }}>Growth</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {`At Malla Reddy School, education goes beyond textbooks. Our rich co-curricular program is designed to discover and nurture every child's unique talent.`}
          </motion.p>

          <div className="section-tabs">
            {(['All', 'Arts', 'Indoor', 'Outdoor'] as Category[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              >
                {tab === 'All' ? 'Everything' : tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="activities-grid-section section">
        <div className="container">
          {/* Main Categories */}
          {(['Arts', 'Indoor', 'Outdoor'] as Category[]).map(cat => (
            (activeTab === 'All' || activeTab === cat) && (
              <div key={cat} id={cat.toLowerCase()} className="category-group" style={{ marginBottom: '6rem' }}>
                <div className="category-header">
                  <h2>{cat} <span style={{ color: '#F5A623' }}>Activities</span></h2>
                  <p>Developing {cat === 'Arts' ? 'creative and expressive' : cat === 'Indoor' ? 'strategic and cognitive' : 'physical and team'} skills.</p>
                </div>
                <motion.div 
                  layout
                  className="activity-grid centered-flex"
                >
                  <AnimatePresence mode="popLayout">
                    {ACTIVITIES.filter(a => a.category === cat).map((activity) => (
                      <motion.div
                        key={activity.id}
                        id={activity.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="activity-card"
                      >
                        <div className="activity-image-wrapper">
                          <Image 
                            src={activity.image} 
                            alt={activity.title}
                            fill
                            className="activity-image"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                          />
                        </div>
                        <div className="activity-content">
                          <span className="activity-badge">{activity.category}</span>
                          <h3>{activity.title}</h3>
                          <p>{activity.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            )
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section" style={{ padding: '6rem 0', background: '#f8fafc', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Want to join a club?</h2>
          <p style={{ color: '#64748b', marginBottom: '2rem' }}>Our clubs are open for enrollment at the beginning of every semester.</p>
          <a href="/contact" className="btn-primary squishy-btn" style={{ padding: '1rem 2.5rem' }}>
            Inquire Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default CoCurricular;
