export type Show = {
  /** ISO date, e.g. '2026-08-28', or with a time '2026-08-28T20:00'. */
  date: string;
  venue: string;
  /** City only, e.g. 'Scottsdale' — Arizona is assumed. */
  city: string;
  /** Optional display time, e.g. '8:00 PM'. */
  time?: string;
  /** Optional ticket or event link. */
  url?: string;
  /** Optional short note, e.g. '21+' or 'Private event'. */
  note?: string;
};

// Add upcoming shows here. Past dates drop off automatically on each deploy.
// Example:
//   { date: '2026-08-28', venue: 'Kimmyz on Greenway', city: 'Glendale', time: '8:00 PM' },
export const shows: Show[] = [];

// End-of-day for date-only entries so a show stays listed through its whole
// day; exact time when an entry includes one. Parsed as local (Arizona) time.
function showEndsAt(date: string): number {
  const [day, clock] = date.split('T');
  const [year, month, dayOfMonth] = day.split('-').map(Number);
  if (clock) {
    const [hours, minutes] = clock.split(':').map(Number);
    return new Date(year, month - 1, dayOfMonth, hours, minutes).getTime();
  }
  return new Date(year, month - 1, dayOfMonth, 23, 59, 59, 999).getTime();
}

export function upcomingShows(nowMs: number = Date.now()): Show[] {
  return shows
    .filter((show) => showEndsAt(show.date) >= nowMs)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function formatShowDate(date: string): string {
  const [year, month, dayOfMonth] = date.split('T')[0].split('-').map(Number);
  return new Date(year, month - 1, dayOfMonth).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}
