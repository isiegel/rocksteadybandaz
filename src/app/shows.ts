export type Show = {
  /** Show date, 'YYYY-MM-DD' in Arizona local time. */
  date: string;
  venue: string;
  /** City only, e.g. 'Glendale' — Arizona is assumed. Optional. */
  city?: string;
  /** Start time, 24-hour 'HH:mm' Arizona local, e.g. '20:00'. */
  start?: string;
  /** End time, 24-hour 'HH:mm' Arizona local. */
  end?: string;
  /** Optional ticket or event link. */
  url?: string;
  /** Optional short note, e.g. '21+' or 'Private event'. */
  note?: string;
};

// Add upcoming shows here. Past dates drop off automatically on each deploy.
export const shows: Show[] = [
  { date: '2026-06-27', venue: 'The Dubliner Irish Pub', city: 'Phoenix', start: '20:00', end: '24:00' },
  { date: '2026-07-17', venue: 'The Loft Again', city: 'Phoenix', start: '20:00', end: '24:00' },
  { date: '2026-07-24', venue: 'Azool Grill', city: 'Phoenix', start: '20:00', end: '23:00' },
  { date: '2026-07-25', venue: 'El Dorado Bar & Grill', city: 'Scottsdale', start: '20:00', end: '24:00' },
  { date: '2026-08-07', venue: 'The Dubliner Irish Pub', city: 'Phoenix', start: '20:00', end: '24:00' },
  { date: '2026-08-21', venue: 'The Loft Again', city: 'Phoenix', start: '20:00', end: '24:00' },
  { date: '2026-09-05', venue: 'Azool Grill', city: 'Phoenix', start: '20:00', end: '23:00' },
  { date: '2026-09-11', venue: 'The Loft Again', city: 'Phoenix', start: '20:00', end: '24:00' },
  { date: '2026-09-25', venue: 'Kimmyz On Greenway Rock & Roll Bar & Grill', city: 'Glendale', start: '20:00', end: '24:00' },
  { date: '2026-10-09', venue: 'The Loft Again', city: 'Phoenix', start: '20:00', end: '24:00' },
  { date: '2026-10-16', venue: '4Fridays Music Series', city: 'Glendale', start: '18:00', end: '20:00' },
  { date: '2026-10-31', venue: 'Azool Grill', city: 'Phoenix', start: '20:00', end: '23:00' },
  { date: '2026-11-06', venue: 'American Legion Post 35 - Mathew B Juan', city: 'Chandler', start: '19:00', end: '22:00' },
  { date: '2026-11-20', venue: 'The Loft Again', city: 'Phoenix', start: '20:00', end: '24:00' },
  { date: '2026-12-04', venue: 'The Gym Grill and Bar', city: 'San Tan Valley', start: '20:00', end: '24:00' },
  { date: '2026-12-11', venue: 'The Loft Again', city: 'Phoenix', start: '20:00', end: '24:00' },
];

// Arizona does not observe daylight saving, so the offset is always -07:00.
const AZ_OFFSET = '-07:00';

function todayInPhoenix(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/Phoenix' });
}

export function upcomingShows(today: string = todayInPhoenix()): Show[] {
  return shows
    .filter((show) => show.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function formatShowDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function to12Hour(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  // Times can run past midnight (e.g. '24:00' = 12 AM, '28:00' = 4 AM), so
  // wrap into a 0–23 clock before formatting.
  const clockHour = hours % 24;
  const period = clockHour >= 12 ? 'PM' : 'AM';
  const hour = clockHour % 12 || 12;
  return `${hour}:${String(minutes).padStart(2, '0')} ${period}`;
}

export function formatShowTime(show: Show): string | null {
  if (!show.start) return null;
  const start = to12Hour(show.start);
  return show.end ? `${start} – ${to12Hour(show.end)}` : start;
}

// Builds a valid ISO 8601 timestamp from a 'YYYY-MM-DD' date and an 'HH:mm'
// time that may exceed 24:00. Hours ≥ 24 roll the calendar date forward so the
// timestamp stays valid (e.g. an end of '24:00' on the 16th becomes the 17th at
// 00:00) — required for Google to accept the MusicEvent start/end dates.
function toISO(date: string, time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const dayOffset = Math.floor(hours / 24);
  const clockHour = hours % 24;
  const [year, month, day] = date.split('-').map(Number);
  const d = new Date(Date.UTC(year, month - 1, day + dayOffset));
  const isoDate = d.toISOString().slice(0, 10);
  const hh = String(clockHour).padStart(2, '0');
  const mm = String(minutes).padStart(2, '0');
  return `${isoDate}T${hh}:${mm}:00${AZ_OFFSET}`;
}

export function showStartISO(show: Show): string {
  return show.start ? toISO(show.date, show.start) : show.date;
}

export function showEndISO(show: Show): string | null {
  return show.end ? toISO(show.date, show.end) : null;
}
