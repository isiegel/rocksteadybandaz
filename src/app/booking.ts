import { absoluteUrl, siteConfig } from './seo';

export const bookingAvailabilityLabel = 'Now booking 2027 dates';

export const bookingAvailabilityCopy =
  'Rock Steady is already booking 2027 venue, patio, private-event, corporate, charity, and neighborhood dates across the Phoenix area.';

export const bookingEmailSubject = '2027 booking inquiry for Rock Steady';

export const bookingEmailBody = [
  'Hi Rock Steady,',
  '',
  'I would like to check availability for a 2027 event.',
  '',
  'Preferred date:',
  'Is the date flexible?',
  'Venue / city:',
  'Event type:',
  'Indoor or outdoor?',
  'Approximate set length:',
  'Expected crowd size:',
  'Load-in / start time:',
  'PA / sound provided or needed?',
  'Contact name and phone:',
  '',
  'Notes:',
].join('\n');

export const bookingEmailHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
  bookingEmailSubject,
)}&body=${encodeURIComponent(bookingEmailBody)}`;

export const bookingAssets = [
  {
    title: 'Venue one-sheet',
    href: '/press-kit/rock-steady-venue-one-sheet.pdf',
    description: 'Bio, set style, promo links, quick facts, and booking contact.',
  },
  {
    title: 'Stage plot',
    href: '/press-kit/rock-steady-stage-plot.pdf',
    description: 'Typical stage layout for room planning and advance coordination.',
  },
  {
    title: 'Input list',
    href: '/press-kit/rock-steady-input-list.pdf',
    description: 'Typical channel list for venues with house production.',
  },
];

export const absoluteBookingAssets = bookingAssets.map((asset) => ({
  ...asset,
  url: absoluteUrl(asset.href),
}));
