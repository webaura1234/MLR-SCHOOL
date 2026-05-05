'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Globe, Share2, Info, MessageCircle } from 'lucide-react';
import './Footer.css';
import { useSiteInfo } from '@/lib/useSiteInfo';
import { CARD_BLUR } from '@/lib/blurPlaceholder';

const Footer = () => {
  const { siteInfo } = useSiteInfo();
  return (
    <footer className="footer">
      <div className="footer-background-text" aria-hidden="true">
        MALLA REDDY
      </div>

      <div className="container">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <Link href="/" className="footer-logo" aria-label="Malla Reddy School home">
              <span className="footer-logo-mark">
                <Image
                  src="/logo.svg"
                  alt=""
                  width={60}
                  height={60}
                  className="logo-img"
                  placeholder="blur"
                  blurDataURL={CARD_BLUR}
                  style={{ width: '100%', height: '100%' }}
                />
              </span>
              <span className="footer-logo-text">
                <span className="footer-logo-title">Malla Reddy School</span>
                <span className="footer-logo-tag">Excellence in education</span>
              </span>
            </Link>
            <p className="footer-desc">
              Dedicated to providing excellence in education and shaping the leaders of tomorrow.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Contact Us</h4>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin size={20} strokeWidth={2} aria-hidden />
                <span>{siteInfo.locationLine}</span>
              </div>
              <div className="contact-item">
                <Phone size={20} strokeWidth={2} aria-hidden />
                <a href={`tel:${siteInfo.phoneTel}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {siteInfo.phoneDisplay}
                </a>
              </div>
              <div className="contact-item">
                <Mail size={20} strokeWidth={2} aria-hidden />
                <a href={`mailto:${siteInfo.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {siteInfo.email}
                </a>
              </div>
              <div className="contact-item">
                <MessageCircle size={20} strokeWidth={2} aria-hidden />
                <a
                  href={`https://wa.me/${siteInfo.whatsappNumber}?text=${encodeURIComponent(
                    'Hi, I would like to know about admissions at Malla Reddy School.'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  WhatsApp: {siteInfo.whatsappDisplay}
                </a>
              </div>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Academics</h4>
            <ul className="footer-links">
              <li>
                <Link href="/curriculum">Curriculum</Link>
              </li>
              <li>
                <Link href="/labs">Laboratories</Link>
              </li>
              <li>
                <Link href="/utility">Disclosure</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link href="/about">About School</Link>
              </li>
              <li>
                <Link href="/achievers">Achievers Wall</Link>
              </li>
              <li>
                <Link href="/blog">School News</Link>
              </li>
              <li>
                <Link href="/gallery">Gallery</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
              <li>
                <Link href="/co-curricular">Co-Curricular</Link>
              </li>
              <li>
                <Link href="/admission">Admission</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <p className="copyright-text">&copy; {new Date().getFullYear()} Malla Reddy School. All rights reserved.</p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Website">
                <Globe size={16} strokeWidth={2} />
              </a>
              <a href="#" className="social-link" aria-label="Social">
                <Share2 size={16} strokeWidth={2} />
              </a>
              <a href="#" className="social-link" aria-label="About">
                <Info size={16} strokeWidth={2} />
              </a>
            </div>
          </div>
          <div className="footer-credit">
            <span className="footer-credit-label">Designed and developed by</span>
            <a
              href="https://piidigitech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-credit-link"
              aria-label="Pii Digital Technologies — opens in a new tab"
            >
              <Image
                src="/images/pii-digital-logo.png"
                alt="Pii Digital Technologies"
                width={220}
                height={72}
                className="footer-credit-logo"
                style={{ width: "auto", height: "auto" }}
                sizes="(max-width: 480px) 180px, 220px"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
