'use client';

import { usePathname } from 'next/navigation';
import { useSiteInfo } from '@/lib/useSiteInfo';
import './ContactFab.css';

function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden
    >
      <path d="M19.11 17.2c-.28-.14-1.64-.8-1.9-.9-.25-.1-.44-.14-.62.14-.18.28-.72.9-.88 1.08-.16.18-.32.2-.6.06-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.37-1.63-1.53-1.9-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.1-.18.06-.34-.02-.48-.08-.14-.62-1.5-.85-2.06-.22-.53-.44-.46-.62-.47h-.53c-.18 0-.48.06-.73.34-.25.28-.96.94-.96 2.3 0 1.36.99 2.68 1.13 2.86.14.18 1.95 2.98 4.73 4.18.66.28 1.17.45 1.57.58.66.21 1.26.18 1.73.11.53-.08 1.64-.67 1.87-1.31.23-.64.23-1.2.16-1.31-.06-.11-.25-.18-.53-.32z" />
      <path d="M26.72 5.34C24.01 2.63 20.4 1.14 16.57 1.14 8.7 1.14 2.31 7.53 2.31 15.4c0 2.52.66 4.98 1.91 7.16L2 30.86l8.5-2.23a14.19 14.19 0 0 0 6.06 1.37h.01c7.87 0 14.26-6.39 14.26-14.26 0-3.83-1.49-7.44-4.11-10.4zm-10.15 22.3h-.01c-2.14 0-4.24-.58-6.06-1.67l-.43-.25-5.04 1.32 1.35-4.91-.28-.5a12.33 12.33 0 0 1-1.9-6.23c0-6.8 5.54-12.34 12.34-12.34 3.3 0 6.41 1.28 8.75 3.62 2.34 2.34 3.63 5.45 3.63 8.72 0 6.8-5.54 12.34-12.35 12.34z" />
    </svg>
  );
}

export default function ContactFab() {
  const pathname = usePathname();
  const { siteInfo } = useSiteInfo();
  if (pathname === '/contact') return null;
  const prefilledText = encodeURIComponent(
    'Hi, I would like to know about admissions at Malla Reddy School.'
  );

  return (
    <a
      href={`https://wa.me/${siteInfo.whatsappNumber}?text=${prefilledText}`}
      className="contact-fab contact-fab--whatsapp"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      target="_blank"
      rel="noreferrer"
    >
      <WhatsAppIcon size={22} />
    </a>
  );
}
