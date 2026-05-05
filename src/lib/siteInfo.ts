export type SiteInfo = {
  phoneDisplay: string;
  phoneTel: string;
  whatsappDisplay: string;
  whatsappNumber: string; // digits only, country code included
  email: string;
  addressLine: string;
  locationLine: string;
  mapEmbedUrl?: string;
  website?: string;
};

const DEFAULT_SITE_INFO: SiteInfo = {
  phoneDisplay: '+91 92 4758 7086 / +91 92 4758 7087',
  phoneTel: '+919247587086',
  whatsappDisplay: '+91 9247587086',
  whatsappNumber: '919247587086',
  email: 'admissions@mallareddyschool.com',
  addressLine:
    'Sy No.1101/P, Medchal Village, Medchal Mandal, Medchal- Malkajgiri (Dist), Telangana - 501 401.',
  locationLine: 'Medchal, Telangana 501401',
  website: 'www.mallareddyschool.com',
};

function normalizeKey(key: string) {
  return key.trim().toLowerCase().replace(/\s+/g, '_');
}

function stripNonDigits(input: string) {
  return input.replace(/[^\d]/g, '');
}

/**
 * Fetch site contact details from a published Google Sheet CSV.
 *
 * Expected sheet format (header row required):
 * - key,value
 *
 * Example keys:
 * - phoneDisplay
 * - phoneTel
 * - whatsappDisplay
 * - whatsappNumber
 * - email
 * - addressLine
 * - locationLine
 * - mapEmbedUrl
 * - website
 */
export async function fetchSiteInfo(): Promise<SiteInfo> {
  const url = process.env.NEXT_PUBLIC_SITE_INFO_SHEET_URL;
  if (!url) return DEFAULT_SITE_INFO;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return DEFAULT_SITE_INFO;
    const csvText = await res.text();
    const rows = csvText.split('\n').filter((r) => r.trim() !== '');
    const dataRows = rows.slice(1);

    const pairs = dataRows
      .map((row) => {
        const cols: string[] = [];
        let currentColumn = '';
        let insideQuotes = false;

        for (let i = 0; i < row.length; i++) {
          const char = row[i];
          if (char === '"') {
            insideQuotes = !insideQuotes;
          } else if (char === ',' && !insideQuotes) {
            cols.push(currentColumn.trim().replace(/^"(.*)"$/, '$1'));
            currentColumn = '';
          } else {
            currentColumn += char;
          }
        }
        cols.push(currentColumn.trim().replace(/^"(.*)"$/, '$1'));

        const key = cols[0]?.trim();
        const value = cols[1]?.trim();
        if (!key || !value) return null;
        return { key: normalizeKey(key), value };
      })
      .filter(Boolean) as { key: string; value: string }[];

    const map = new Map(pairs.map((p) => [p.key, p.value]));

    const phoneDisplay = map.get('phonedisplay') || map.get('phone_display') || DEFAULT_SITE_INFO.phoneDisplay;
    const phoneTel = map.get('phonetel') || map.get('phone_tel') || DEFAULT_SITE_INFO.phoneTel;
    const whatsappDisplay =
      map.get('whatsappdisplay') || map.get('whatsapp_display') || DEFAULT_SITE_INFO.whatsappDisplay;
    const whatsappNumberRaw =
      map.get('whatsappnumber') || map.get('whatsapp_number') || DEFAULT_SITE_INFO.whatsappNumber;
    const email = map.get('email') || DEFAULT_SITE_INFO.email;
    const addressLine = map.get('addressline') || map.get('address_line') || DEFAULT_SITE_INFO.addressLine;
    const locationLine = map.get('locationline') || map.get('location_line') || DEFAULT_SITE_INFO.locationLine;
    const mapEmbedUrl = map.get('mapembedurl') || map.get('map_embed_url') || DEFAULT_SITE_INFO.mapEmbedUrl;
    const website = map.get('website') || DEFAULT_SITE_INFO.website;

    return {
      phoneDisplay,
      phoneTel,
      whatsappDisplay,
      whatsappNumber: stripNonDigits(whatsappNumberRaw) || DEFAULT_SITE_INFO.whatsappNumber,
      email,
      addressLine,
      locationLine,
      mapEmbedUrl,
      website,
    };
  } catch {
    return DEFAULT_SITE_INFO;
  }
}

export { DEFAULT_SITE_INFO };

