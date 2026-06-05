'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { SVGProps } from 'react';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import './Footer.css';
import { useSiteInfo } from '@/lib/useSiteInfo';
import { CARD_BLUR } from '@/lib/blurPlaceholder';
import { HOME_HERO_PATH, handleHomeHeroClick } from '@/lib/goToHomeHero';

const InstagramIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const YouTubeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M21.58 7.19a2.54 2.54 0 0 0-1.79-1.8C18.21 5 12 5 12 5s-6.21 0-7.79.42a2.54 2.54 0 0 0-1.79 1.8A26.36 26.36 0 0 0 2 12a26.36 26.36 0 0 0 .42 4.81 2.54 2.54 0 0 0 1.79 1.8C5.79 19 12 19 12 19s6.21 0 7.79-.42a2.54 2.54 0 0 0 1.79-1.8A26.36 26.36 0 0 0 22 12a26.36 26.36 0 0 0-.42-4.81ZM10 15V9l5.2 3L10 15Z" />
  </svg>
);

const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M14.5 8.4V6.7c0-.8.5-1 1.1-1H17V3h-2.2C12.3 3 11 4.5 11 6.5v1.9H9v2.8h2V21h3.2v-9.8h2.3l.4-2.8h-2.4Z" />
  </svg>
);

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/mallareddyschool_medchal/',
    icon: <InstagramIcon width={20} height={20} aria-hidden />,
  },
  {
    label: 'X',
    href: 'https://x.com/malla_reddy_scl',
    icon: <span className="social-x-icon" aria-hidden>X</span>,
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@MALLAREDDYSCHOOLS',
    icon: <YouTubeIcon width={21} height={21} />,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61589149336453',
    icon: <FacebookIcon width={20} height={20} />,
  },
];

const Footer = () => {
  const { siteInfo } = useSiteInfo();
  const pathname = usePathname();
  return (
    <footer className="footer">
      <div className="footer-background-text" aria-hidden="true">
        MALLA REDDY
      </div>

      <div className="container">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <Link
              href={HOME_HERO_PATH}
              className="footer-logo"
              aria-label="Malla Reddy School home"
              onClick={(event) => handleHomeHeroClick(pathname, event)}
            >
              <span className="footer-logo-mark">
                <Image
                  src="/logo.png"
                  alt="Malla Reddy School logo"
                  width={170}
                  height={80}
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
            <div className="footer-social" aria-label="Malla Reddy School social media links">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label={`${social.label} - opens in a new tab`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
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
                <Link href="/admission">Admissions 2026-27</Link>
              </li>
              <li>
                <Link href="/curriculum">CBSE Curriculum</Link>
              </li>
              <li>
                <Link href="/iit-foundation">IIT Foundation</Link>
              </li>
              <li>
                <Link href="/labs">Laboratories</Link>
              </li>
              <li>
                <Link href="/co-curricular">Co-Curricular</Link>
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
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/testimonials">Parent Testimonials</Link>
              </li>
              <li>
                <Link href="/competitions">Olympiads &amp; Competitions</Link>
              </li>
              <li>
                <Link href="/gallery">Gallery</Link>
              </li>
              <li>
                <Link href="/achievers">Achievers Wall</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <p className="copyright-text">&copy; {new Date().getFullYear()} Malla Reddy School. All rights reserved.</p>
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
