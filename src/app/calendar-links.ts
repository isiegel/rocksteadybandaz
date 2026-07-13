import { siteConfig } from './seo';
import { showEndISO, showStartISO, type Show } from './shows';

// Fallback duration for shows that list a start time but no end time.
const DEFAULT_DURATION_MS = 3 * 60 * 60 * 1000;

/** URL-safe identifier for a show, e.g. '2026-07-17-the-loft-again'. */
export function showSlug(show: Show): string {
  const venue = show.venue
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${show.date}-${venue}`;
}

/** Path to the downloadable .ics file for a show. */
export function showIcsPath(show: Show): string {
  return `/calendar/${showSlug(show)}.ics`;
}

export function calendarEventTitle(show: Show): string {
  return `${siteConfig.name} at ${show.venue}`;
}

export function calendarEventLocation(show: Show): string {
  return show.city ? `${show.venue}, ${show.city}, AZ` : `${show.venue}, AZ`;
}

export function calendarEventDescription(show: Show): string {
  const note = show.note ? `${show.note}. ` : '';
  return `${note}Live classic rock, sing-alongs, and dance-floor covers with ${siteConfig.name}. Full schedule: ${siteConfig.url}/shows`;
}

export type CalendarTimes =
  | { allDay: true; start: string; end: string }
  | { allDay: false; start: string; end: string };

/** Compact UTC timestamp for calendar formats: 20260718T030000Z. */
function toUtcStamp(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

/**
 * Start/end for calendar links. Timed shows use compact UTC stamps; shows
 * without a start time become an all-day event (compact dates, exclusive end).
 */
export function calendarTimes(show: Show): CalendarTimes {
  if (!show.start) {
    const [year, month, day] = show.date.split('-').map(Number);
    const next = new Date(Date.UTC(year, month - 1, day + 1));
    return {
      allDay: true,
      start: show.date.replace(/-/g, ''),
      end: next.toISOString().slice(0, 10).replace(/-/g, ''),
    };
  }

  const startISO = showStartISO(show);
  const endISO = showEndISO(show);
  const end = endISO
    ? toUtcStamp(endISO)
    : toUtcStamp(new Date(new Date(startISO).getTime() + DEFAULT_DURATION_MS).toISOString());

  return { allDay: false, start: toUtcStamp(startISO), end };
}

export function googleCalendarUrl(show: Show): string {
  const times = calendarTimes(show);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: calendarEventTitle(show),
    dates: `${times.start}/${times.end}`,
    location: calendarEventLocation(show),
    details: calendarEventDescription(show),
  });
  if (!times.allDay) params.set('ctz', 'America/Phoenix');
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
