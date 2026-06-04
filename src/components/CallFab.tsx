'use client';

import { Phone } from 'lucide-react';
import './CallFab.css';
import { useSiteInfo } from '@/lib/useSiteInfo';
import { trackPhoneClick } from '@/lib/googleAds';

export default function CallFab() {
  const { siteInfo } = useSiteInfo();
  return (
    <a
      href={`tel:${siteInfo.phoneTel}`}
      className="call-fab"
      aria-label="Call Malla Reddy School"
      title="Call us"
      onClick={() => trackPhoneClick('call_fab')}
    >
      <Phone size={22} strokeWidth={2} aria-hidden />
      <span className="call-fab-text">Call Us</span>
    </a>
  );
}
