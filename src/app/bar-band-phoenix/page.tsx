import type { Metadata } from 'next';
import { EventBookingPage } from '../components/EventBookingPage';

export const metadata: Metadata = {
  title: 'Phoenix Bar Band for Live Music Venues',
  description: 'Book Rock Steady, a female-fronted Phoenix classic rock cover band for bars, restaurants, patios, and live music rooms.',
  alternates: { canonical: '/bar-band-phoenix' },
};

export default function BarBandPage() {
  return <EventBookingPage content={{
    audience: 'bar venue', eyebrow: 'For bars, restaurants & patios',
    headline: 'Phoenix bar music that keeps the room with you.',
    intro: 'Rock Steady brings familiar classic rock, throwback sing-alongs, and dance-floor favorites to Valley rooms that want a dependable, crowd-first live band.',
    image: '/images/show-05.jpg', imageAlt: 'Rock Steady playing for a packed Phoenix bar crowd',
    benefits: [
      { title: 'Recognizable from song one', description: 'A broad set of hooks and choruses your regulars already know.' },
      { title: 'Flexible live sets', description: 'Set length and pacing can be shaped around the room and schedule.' },
      { title: 'Production ready', description: 'Professional PA is available, or we can coordinate with house sound.' },
    ],
    details: ['Bars and restaurants', 'Patios and outdoor stages', 'Up to three live sets', 'House sound or band-provided PA', 'Promo photos and venue one-sheet', 'Phoenix and communities across the Valley'],
  }} />;
}
