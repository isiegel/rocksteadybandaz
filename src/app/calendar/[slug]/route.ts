import {
  calendarEventDescription,
  calendarEventLocation,
  calendarEventTitle,
  calendarTimes,
  showSlug,
} from '../../calendar-links';
import { absoluteUrl, siteConfig } from '../../seo';
import { showCoords, shows, type Show } from '../../shows';

// RFC 5545: escape backslash, semicolon, comma, and newlines in text values.
function escapeICSText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

// RFC 5545: content lines longer than 75 octets must be folded with CRLF + space.
function foldICSLine(line: string): string {
  const chunks: string[] = [];
  let rest = line;
  while (rest.length > 74) {
    chunks.push(rest.slice(0, 74));
    rest = ' ' + rest.slice(74);
  }
  chunks.push(rest);
  return chunks.join('\r\n');
}

function buildShowICS(show: Show): string {
  const times = calendarTimes(show);
  const coords = showCoords(show);
  const eventUrl = show.url
    ? new URL(show.url, siteConfig.url).toString()
    : absoluteUrl('/#shows');

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Rock Steady//rocksteadybandaz.com//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${showSlug(show)}@rocksteadybandaz.com`,
    `DTSTAMP:${times.allDay ? `${times.start}T000000Z` : times.start}`,
    times.allDay ? `DTSTART;VALUE=DATE:${times.start}` : `DTSTART:${times.start}`,
    times.allDay ? `DTEND;VALUE=DATE:${times.end}` : `DTEND:${times.end}`,
    `SUMMARY:${escapeICSText(calendarEventTitle(show))}`,
    `DESCRIPTION:${escapeICSText(calendarEventDescription(show))}`,
    `LOCATION:${escapeICSText(calendarEventLocation(show))}`,
    `URL:${eventUrl}`,
    ...(coords ? [`GEO:${coords.lat};${coords.lng}`] : []),
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return lines.map(foldICSLine).join('\r\n') + '\r\n';
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const cleanSlug = decodeURIComponent(slug).replace(/\.ics$/, '');
  const show = shows.find((s) => showSlug(s) === cleanSlug);

  if (!show) {
    return new Response('Show not found', { status: 404 });
  }

  return new Response(buildShowICS(show), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="rock-steady-${cleanSlug}.ics"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
