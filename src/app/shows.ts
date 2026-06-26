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
  { date: '2026-10-16', venue: '4Fridays Music Series', city: 'Glendale', start: '18:00', end: '28:00' },
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
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour = hours % 12 || 12;
  return `${hour}:${String(minutes).padStart(2, '0')} ${period}`;
}

export function formatShowTime(show: Show): string | null {
  if (!show.start) return null;
  const start = to12Hour(show.start);
  return show.end ? `${start} – ${to12Hour(show.end)}` : start;
}

export function showStartISO(show: Show): string {
  return show.start ? `${show.date}T${show.start}:00${AZ_OFFSET}` : show.date;
}

export function showEndISO(show: Show): string | null {
  return show.end ? `${show.date}T${show.end}:00${AZ_OFFSET}` : null;
}
