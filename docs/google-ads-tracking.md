# Google Ads conversion tracking (Performance Max)

## Folder structure

```
School/
├── .env.local                          # Your IDs (not committed)
├── .env.example
├── docs/google-ads-tracking.md
└── src/
    ├── app/layout.tsx                  # Mounts GoogleTagLoader once
    ├── lib/
    │   ├── gtag.ts                     # Shared gtag / dataLayer
    │   └── googleAds.ts                # Conversion helpers
    └── components/
        ├── GoogleTagLoader.tsx         # gtag.js (GA4 + Ads, single load)
        ├── GoogleAds.tsx               # Re-export of GoogleTagLoader
        ├── GoogleAnalytics.tsx         # Re-export (backward compatible)
        ├── AdmissionsPopup.tsx         # admission_submit
        ├── CallFab.tsx                 # phone_click
        ├── ContactFab.tsx              # whatsapp_click
        ├── Navbar.tsx                  # phone_click
        └── Footer.tsx                  # phone_click, whatsapp_click
```

## Environment variables

Add to `.env.local` (and your hosting provider, e.g. Vercel):

```env
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-18209094786

# Optional GA4 (same gtag.js instance)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Conversion labels from Google Ads → Goals → Conversions → Tag setup
# Format: AW-18209094786/XXXXXXXXXX (copy full send_to value)
NEXT_PUBLIC_GOOGLE_ADS_LABEL_ADMISSION=AW-18209094786/REPLACE_WITH_ADMISSION_LABEL
NEXT_PUBLIC_GOOGLE_ADS_LABEL_PHONE=AW-18209094786/REPLACE_WITH_PHONE_LABEL
NEXT_PUBLIC_GOOGLE_ADS_LABEL_WHATSAPP=AW-18209094786/REPLACE_WITH_WHATSAPP_LABEL
```

Until labels are set, named events (`admission_submit`, `phone_click`, `whatsapp_click`) still fire for debugging in Tag Assistant.

## Deployment

1. Set all `NEXT_PUBLIC_*` variables in Vercel → Project → Settings → Environment Variables.
2. Redeploy production (env vars are baked in at build time for client code).
3. In Google Ads, confirm conversion actions are **Website** type and status is **Recording**.

## Tracked events

| User action | Function | `event_label` source |
|-------------|----------|----------------------|
| Admission form success (popup) | `trackAdmissionSubmit` | `admissions_popup` |
| Admission form success (page) | `trackAdmissionSubmit` | `admission_page` |
| Phone link click | `trackPhoneClick` | `navbar`, `footer`, `call_fab`, `admission_page` |
| WhatsApp link click | `trackWhatsAppClick` | `contact_fab`, `footer` |

## Testing (Google Tag Assistant)

1. Install [Tag Assistant](https://tagassistant.google.com/) (Chrome extension).
2. Run the site locally with `.env.local` configured.
3. Connect Tag Assistant → open `http://127.0.0.1:3000`.
4. Verify **AW-18209094786** appears under Google Ads tag.
5. Submit the admission form → check for `conversion` with your admission label (or `admission_submit` event).
6. Click **Call Us** / WhatsApp FAB → check `phone_click` / `whatsapp_click` (and conversion if labels set).

## Usage in new components

```typescript
import { trackPhoneClick, trackWhatsAppClick, trackAdmissionSubmit } from '@/lib/googleAds';

<a href="tel:+91..." onClick={() => trackPhoneClick('my_component')}>Call</a>
```
