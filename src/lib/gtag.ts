/** Shared gtag.js bootstrap — used by GA4 and Google Ads (single dataLayer). */

export const GTAG_SCRIPT_ID = 'gtag-js';
export const GTAG_INIT_SCRIPT_ID = 'gtag-init';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function gtag(...args: unknown[]): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtagCommand(...command: unknown[]) {
      window.dataLayer?.push(command);
    };
  }
  window.gtag(...args);
}

export function buildGtagInitScript(gaId?: string, adsId?: string): string {
  const configs: string[] = [];
  if (gaId) configs.push(`gtag('config', '${gaId}');`);
  if (adsId) configs.push(`gtag('config', '${adsId}');`);

  return `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = window.gtag || gtag;
    gtag('js', new Date());
    ${configs.join('\n    ')}
  `.trim();
}

export function getGtagLoaderId(gaId?: string, adsId?: string): string | null {
  return adsId || gaId || null;
}
