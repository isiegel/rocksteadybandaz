import { EventBookingPage } from '../components/EventBookingPage';
import { createPageMetadata } from '../seo';

export const metadata = createPageMetadata({
  title: 'Phoenix Private Party Band',
  description: 'Book Rock Steady for a Phoenix-area birthday, neighborhood party, anniversary, or private event with live classic rock and crowd favorites.',
  path: '/private-party-band-phoenix',
  image: '/images/show-04.jpg',
  imageAlt: 'Rock Steady singer performing live under colorful lights',
});

export default function PrivatePartyBandPage() {
  return <EventBookingPage content={{
    audience: 'private party', eyebrow: 'For private parties',
    headline: 'Turn your party into a live rock night.',
    intro: 'Bring the energy of a Phoenix live music room to your birthday, anniversary, neighborhood event, or private celebration—with a set full of songs people actually sing.',
    image: '/images/show-04.jpg', imageAlt: 'Rock Steady singer performing live under colorful lights',
    benefits: [
      { title: 'A crowd-friendly set', description: 'Classic rock, throwbacks, and danceable favorites across generations.' },
      { title: 'Clear planning', description: 'We coordinate timing, space, power, sound, and load-in before the date.' },
      { title: 'Sound included when needed', description: 'Professional PA is available for many private-event spaces.' },
    ],
    details: ['Birthdays and anniversaries', 'Neighborhood and community events', 'Indoor or outdoor settings', 'Flexible set lengths', 'Professional live sound', 'Phoenix-area travel'],
  }} />;
}
