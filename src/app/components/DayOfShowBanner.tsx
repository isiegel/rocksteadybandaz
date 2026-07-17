'use client';

import {
  type AnimationEvent,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import { formatShowTime, type Show } from '../shows';

const DISMISSED_DATE_STORAGE_KEY = 'rock-steady-day-of-show-dismissed-date';
const DISMISSED_DATE_CHANGE_EVENT = 'rock-steady-day-of-show-dismissed';
const BUSINESS_ROUTE_PREFIXES = [
  '/book',
  '/press',
  '/bar-band-phoenix',
  '/corporate-event-band-phoenix',
  '/private-party-band-phoenix',
];

function getPhoenixToday(): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Phoenix',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, part.value]),
  );

  return `${values.year}-${values.month}-${values.day}`;
}

function getServerTodaySnapshot(): string | null {
  return null;
}

function subscribeToPhoenixDateChange(callback: () => void): () => void {
  const interval = window.setInterval(callback, 60_000);

  return () => window.clearInterval(interval);
}

function getDismissedDate(): string | null {
  return window.localStorage.getItem(DISMISSED_DATE_STORAGE_KEY);
}

function subscribeToDismissedDateChange(callback: () => void): () => void {
  window.addEventListener('storage', callback);
  window.addEventListener(DISMISSED_DATE_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(DISMISSED_DATE_CHANGE_EVENT, callback);
  };
}

function isBusinessRoute(pathname: string): boolean {
  return BUSINESS_ROUTE_PREFIXES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function formatShowMeta(show: Show): string {
  return [
    show.city ? `${show.city}, AZ` : null,
    formatShowTime(show),
    show.note,
  ]
    .filter(Boolean)
    .join(' · ');
}

export function DayOfShowBanner({ shows }: { shows: Show[] }) {
  const pathname = usePathname();
  const today = useSyncExternalStore(
    subscribeToPhoenixDateChange,
    getPhoenixToday,
    getServerTodaySnapshot,
  );
  const dismissedDate = useSyncExternalStore(
    subscribeToDismissedDateChange,
    getDismissedDate,
    getServerTodaySnapshot,
  );
  const [isClosing, setIsClosing] = useState(false);

  const todaysShows = useMemo(
    () => (today ? shows.filter((show) => show.date === today) : []),
    [shows, today],
  );

  if (
    !today ||
    isBusinessRoute(pathname) ||
    dismissedDate === today ||
    todaysShows.length === 0
  ) {
    return null;
  }

  const currentDate = today;
  const show = todaysShows[0];
  const meta = formatShowMeta(show);
  const detailsHref = show.toastDetailsUrl ?? '/shows';
  const isExternalDetailsLink = Boolean(show.toastDetailsUrl);

  function handleDismiss() {
    if (!isClosing) setIsClosing(true);
  }

  function handleAnimationEnd(event: AnimationEvent<HTMLElement>) {
    if (isClosing && event.currentTarget === event.target) {
      window.localStorage.setItem(DISMISSED_DATE_STORAGE_KEY, currentDate);
      window.dispatchEvent(new Event(DISMISSED_DATE_CHANGE_EVENT));
      setIsClosing(false);
    }
  }

  // The page is rendered inside the route-reveal template, whose transform
  // creates a containing block for fixed descendants. Portal the toast to the
  // body so `position: fixed` remains relative to the viewport.
  return createPortal(
    <aside
      role="status"
      aria-live="polite"
      onAnimationEnd={handleAnimationEnd}
      className={`fixed inset-x-3 bottom-3 z-60 mx-auto max-w-5xl border border-(--rock-steady-yellow)/35 bg-[#080808]/95 p-3 text-white shadow-[0_8px_28px_rgba(0,0,0,0.5)] backdrop-blur-md sm:bottom-5 sm:p-4 ${
        isClosing
          ? 'animate-toast-fade-out pointer-events-none'
          : 'animate-toast-fade-in'
      }`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase text-(--rock-steady-yellow)">
            Today&apos;s show
          </p>
          <p className="mt-1 text-base font-black leading-6 text-white sm:text-lg">
            Rock Steady at {show.venue}
          </p>
          {meta ? (
            <p className="mt-0.5 text-sm font-bold leading-5 text-white/70">
              {meta}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={detailsHref}
            target={isExternalDetailsLink ? '_blank' : undefined}
            rel={isExternalDetailsLink ? 'noreferrer' : undefined}
            className="inline-flex h-10 items-center justify-center rounded-full bg-(--rock-steady-yellow) px-4 text-xs font-black uppercase text-[#111] transition hover:bg-(--rock-steady-red) hover:text-white focus:outline-hidden focus:ring-2 focus:ring-(--rock-steady-yellow)"
          >
            Details
          </a>
          <button
            type="button"
            aria-label="Dismiss today's show notice"
            onClick={handleDismiss}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white transition hover:border-(--rock-steady-red) hover:bg-(--rock-steady-red) focus:outline-hidden focus:ring-2 focus:ring-(--rock-steady-yellow)"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="h-5 w-5"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      </div>
    </aside>,
    document.body,
  );
}
