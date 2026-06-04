import Script from 'next/script';
import {
  GTAG_INIT_SCRIPT_ID,
  GTAG_SCRIPT_ID,
  buildGtagInitScript,
  getGtagLoaderId,
} from '@/lib/gtag';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim();

/**
 * Loads gtag.js once for GA4 + Google Ads (Next.js dedupes by script id).
 * Mount only once in root layout.
 */
export default function GoogleTagLoader() {
  const loaderId = getGtagLoaderId(GA_MEASUREMENT_ID, GOOGLE_ADS_ID);

  if (!loaderId) {
    return null;
  }

  return (
    <>
      <Script
        id={GTAG_SCRIPT_ID}
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${loaderId}`}
      />
      <Script
        id={GTAG_INIT_SCRIPT_ID}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: buildGtagInitScript(GA_MEASUREMENT_ID, GOOGLE_ADS_ID),
        }}
      />
    </>
  );
}
