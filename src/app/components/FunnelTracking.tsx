'use client';

import { track } from '@vercel/analytics';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function FunnelTracking() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/book') track('Booking Page View');
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a');
      if (!(anchor instanceof HTMLAnchorElement)) return;

      if (anchor.href.startsWith('mailto:')) {
        track('Booking Email Click', { path: window.location.pathname });
      }
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
