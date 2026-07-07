'use client';

import { track } from '@vercel/analytics';
import { useEffect } from 'react';

// Fires a single "Press Kit Download" event (with the file name as the asset
// property) for every click on an <a download> link — the press-kit PDFs,
// logos, song list, and press photos — via one delegated listener, so server
// components stay server components. Calendar .ics links have no `download`
// attribute and are intentionally not counted.
export function DownloadTracking() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest('a[download]');
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const asset = anchor.pathname.split('/').pop() || anchor.pathname;
      track('Press Kit Download', { asset });
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
