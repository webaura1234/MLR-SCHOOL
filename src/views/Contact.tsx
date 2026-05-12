'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import './Home.css';
import { useSiteInfo } from '@/lib/useSiteInfo';

const Contact = () => {
  const { siteInfo } = useSiteInfo();
  return (
    <div className="contact-page">
      <section className="page-header" style={{ background: 'var(--page-bg)', padding: '1.5rem 0 0.5rem', textAlign: 'center' }}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hero-brand-name"
            style={{ color: 'var(--foreground)', fontSize: '4rem' }}
          >
            Contact <span className="text-primary">Us</span>
          </motion.h1>
          <p className="hero-brand-tagline" style={{ color: 'var(--muted-foreground)', margin: '0.5rem auto 0' }}>
            We&apos;re here to answer any questions you may have.
          </p>
        </div>
      </section>

      <section className="contact-details-section section" style={{ paddingTop: '1.5rem' }}>
        <div className="container">
          <div className="contact-grid contact-page-grid">
            <div className="contact-info-panel">
              <h2 className="section-title-spark" style={{ marginBottom: '1rem' }}>Reach Out</h2>
              <div className="contact-cards mobile-flex-grid" style={{ gap: '2rem' }}>
                {[
                  { icon: <Phone />, title: 'Call Us', detail: siteInfo.phoneDisplay, color: 'var(--c-mint)' },
                  { icon: <Mail />, title: 'Email Us', detail: siteInfo.email, color: 'var(--c-citrus)' },
                  { icon: <Phone />, title: 'WhatsApp', detail: siteInfo.whatsappDisplay, color: 'var(--c-lavender)' },
                  { icon: <MapPin />, title: 'Campus Address', detail: siteInfo.addressLine, color: 'var(--c-sky)' },
                  { icon: <Clock />, title: 'Office Hours', detail: 'Mon - Sat: 8:00 AM - 4:00 PM', color: 'var(--c-mint)' },
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="blob-card"
                    style={{ background: item.color, padding: '1.5rem', borderRadius: '25px', display: 'flex', alignItems: 'center', gap: '1.5rem' }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="blob-card-icon" style={{ marginBottom: 0 }}>{item.icon}</div>
                    <div>
                      <h4 style={{ fontWeight: 800 }}>{item.title}</h4>
                      <p>{item.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="contact-form-panel">
              <h2 className="section-title-spark" style={{ marginBottom: '1rem' }}>Inquiry Form</h2>
              <form action="https://formspree.io/f/your-id" method="POST" style={{ 
                background: 'white', padding: '2.5rem', borderRadius: '40px', 
                border: '4px solid #000', boxShadow: '15px 15px 0 #000',
                display: 'flex', flexDirection: 'column', gap: '1.5rem'
              }}>
                <input type="text" name="name" placeholder="Your Name" required style={{ padding: '1rem', borderRadius: '15px', border: '3px solid #000' }} />
                <input type="email" name="email" placeholder="Email Address" required style={{ padding: '1rem', borderRadius: '15px', border: '3px solid #000' }} />
                <input type="tel" name="phone" placeholder="Phone Number" required style={{ padding: '1rem', borderRadius: '15px', border: '3px solid #000' }} />
                <textarea name="message" placeholder="How can we help?" rows={5} style={{ padding: '1rem', borderRadius: '15px', border: '3px solid #000' }}></textarea>
                <button type="submit" className="btn-primary squishy-btn">Submit Inquiry</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Embed */}
      <section className="map-section section" style={{ paddingBottom: 0 }}>
        <div className="container-full">
          {siteInfo.mapEmbedUrl ? (
            <iframe
              src={siteInfo.mapEmbedUrl}
              width="100%"
              height="500"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              title="Google Maps"
            ></iframe>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default Contact;
