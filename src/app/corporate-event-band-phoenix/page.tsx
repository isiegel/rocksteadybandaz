import type { Metadata } from 'next';
import { EventBookingPage } from '../components/EventBookingPage';

export const metadata: Metadata = {
  title: 'Phoenix Corporate Event Band',
  description: 'Book Rock Steady for Phoenix corporate events, company parties, fundraisers, and community nights with professional live sound and familiar rock favorites.',
  alternates: { canonical: '/corporate-event-band-phoenix' },
};

export default function CorporateEventBandPage() {
  return <EventBookingPage content={{
    audience: 'corporate event', eyebrow: 'For company and community events',
    headline: 'Live music that feels polished without feeling corporate.',
    intro: 'Rock Steady gives company parties, charity nights, and community events a recognizable, high-energy soundtrack backed by clear production planning.',
    image: '/images/show-09.jpg', imageAlt: 'Rock Steady full band performing on a Phoenix stage',
    benefits: [
      { title: 'Broad audience appeal', description: 'Familiar rock and sing-alongs that work across a mixed guest list.' },
      { title: 'Advance-ready', description: 'Stage plot, input list, timing, and production details are available up front.' },
      { title: 'Flexible production', description: 'We can bring PA for many rooms or coordinate with your production team.' },
    ],
    details: ['Company parties', 'Charity and fundraiser nights', 'Community events', 'Flexible performance schedules', 'Stage plot and input list', 'Coordination with event production'],
  }} />;
}
