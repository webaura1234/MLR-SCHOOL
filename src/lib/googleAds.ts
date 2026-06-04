import { gtag } from '@/lib/gtag';

/** Google Ads account ID (e.g. AW-18209094786) */
export const GOOGLE_ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() ?? '';

export type GoogleAdsConversionEvent =
  | 'admission_submit'
  | 'phone_click'
  | 'whatsapp_click';

type ConversionParams = Record<string, string | number | boolean | undefined>;

const CONVERSION_LABELS: Record<GoogleAdsConversionEvent, string | undefined> = {
  admission_submit: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_ADMISSION?.trim(),
  phone_click: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_PHONE?.trim(),
  whatsapp_click: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_WHATSAPP?.trim(),
};

function buildSendTo(label: string | undefined): string | undefined {
  if (!GOOGLE_ADS_ID || !label) return undefined;
  if (label.includes('/')) return label;
  return `${GOOGLE_ADS_ID}/${label}`;
}

/**
 * Fire a Google Ads conversion. Requires conversion labels from Google Ads → Goals → Conversions.
 * Also emits a named gtag event for Tag Assistant / debugging when labels are not set yet.
 */
export function trackGoogleAdsConversion(
  event: GoogleAdsConversionEvent,
  params?: ConversionParams,
): void {
  if (typeof window === 'undefined' || !GOOGLE_ADS_ID) return;

  const sendTo = buildSendTo(CONVERSION_LABELS[event]);

  if (sendTo) {
    gtag('event', 'conversion', {
      send_to: sendTo,
      ...params,
    });
  }

  gtag('event', event, {
    event_category: 'lead_generation',
    ...params,
  });
}

/** Admission enquiry form submitted successfully */
export function trackAdmissionSubmit(source = 'website'): void {
  trackGoogleAdsConversion('admission_submit', { event_label: source });
}

/** User tapped a phone / tel: link */
export function trackPhoneClick(source = 'website'): void {
  trackGoogleAdsConversion('phone_click', { event_label: source });
}

/** User tapped a WhatsApp link */
export function trackWhatsAppClick(source = 'website'): void {
  trackGoogleAdsConversion('whatsapp_click', { event_label: source });
}
