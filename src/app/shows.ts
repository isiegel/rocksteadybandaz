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
  /** Optional link used only by the day-of-show banner Details button. */
  toastDetailsUrl?: string;
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

export type Coords = { lat: number; lng: number };

// City-center coordinates (decimal degrees) — the accurate fallback used when a
// venue has no precise entry below. Every city that appears in `shows` must be
// listed here so every show resolves to a location for "shows near me".
const CITY_COORDS: Record<string, Coords> = {
  Phoenix: { lat: 33.4484, lng: -112.074 },
  Scottsdale: { lat: 33.4942, lng: -111.9261 },
  Glendale: { lat: 33.5387, lng: -112.186 },
  Chandler: { lat: 33.3062, lng: -111.8413 },
  'San Tan Valley': { lat: 33.1936, lng: -111.5364 },
  Mesa: { lat: 33.4152, lng: -111.8315 },
  Gilbert: { lat: 33.3528, lng: -111.789 },
  Peoria: { lat: 33.5806, lng: -112.2374 },
  'Sun City': { lat: 33.5975, lng: -112.2718 },
  Surprise: { lat: 33.6292, lng: -112.3679 },
};

// Per-venue coordinates (geocoded from each venue's street address). Add new
// venues here so "shows near me" sorts by the real location. Venues not listed
// fall back to CITY_COORDS. To get a venue's lat/lng: open it in Google Maps,
// right-click the pin → the first menu item is the exact "lat, lng".
const VENUE_COORDS: Record<string, Coords> = {
  // 3841 E Thunderbird Rd, Phoenix
  'The Dubliner Irish Pub': { lat: 33.6112, lng: -111.9986 },
  // 15002 N Cave Creek Rd, Phoenix
  'The Loft Again': { lat: 33.6241, lng: -112.0308 },
  // 3134 W Carefree Hwy, Phoenix
  'Azool Grill': { lat: 33.7999, lng: -112.1275 },
  // 8708 E McDowell Rd, Scottsdale
  'El Dorado Bar & Grill': { lat: 33.4663, lng: -111.8959 },
  // 5930 W Greenway Rd, Glendale
  'Kimmyz On Greenway Rock & Roll Bar & Grill': { lat: 33.6266, lng: -112.1862 },
  // 20050 N 67th Ave (Village at Arrowhead), Glendale
  '4Fridays Music Series': { lat: 33.6666, lng: -112.2056 },
  // 2240 W Chandler Blvd, Chandler
  'American Legion Post 35 - Mathew B Juan': { lat: 33.3069, lng: -111.8801 },
  // 2510 E Hunt Hwy, San Tan Valley
  'The Gym Grill and Bar': { lat: 33.1479, lng: -111.5513 },
};

/** Best-known coordinates for a show: precise venue if known, else city center. */
export function showCoords(show: Show): Coords | null {
  return VENUE_COORDS[show.venue] ?? (show.city ? CITY_COORDS[show.city] ?? null : null);
}

const EARTH_RADIUS_MILES = 3958.8;
const toRad = (deg: number) => (deg * Math.PI) / 180;

/** Great-circle distance in miles between two points (haversine). */
export function distanceMiles(a: Coords, b: Coords): number {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return EARTH_RADIUS_MILES * 2 * Math.asin(Math.sqrt(h));
}

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

export function dayOfShowBannerShows(today: string = todayInPhoenix()): Show[] {
  if (process.env.NODE_ENV !== 'development') return shows;

  return [
    ...shows,
    {
      date: today,
      venue: 'The Loft Again',
      city: 'Phoenix',
      start: '20:00',
      end: '24:00',
      toastDetailsUrl: 'https://www.facebook.com/rocksteadybandaz/events',
      note: 'Banner preview',
    },
  ];
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
