'use client';

import { useEffect, useState } from 'react';
import type { SiteInfo } from '@/lib/siteInfo';
import { DEFAULT_SITE_INFO, fetchSiteInfo } from '@/lib/siteInfo';

export function useSiteInfo() {
  const [siteInfo, setSiteInfo] = useState<SiteInfo>(DEFAULT_SITE_INFO);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const info = await fetchSiteInfo();
        if (!cancelled) setSiteInfo(info);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { siteInfo, isLoading };
}

