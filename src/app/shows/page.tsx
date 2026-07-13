import Link from 'next/link';
import { ShrinkingHeader } from '../components/ShrinkingHeader';
import { UpcomingShows } from '../components/UpcomingShows';
import { absoluteUrl, createPageMetadata, siteConfig } from '../seo';
import { showCoords, showEndISO, showStartISO, upcomingShows } from '../shows';

export const metadata = createPageMetadata({ title: 'Upcoming Shows', description: 'See upcoming Rock Steady live shows across Phoenix and the Valley.', path: '/shows', image: '/images/show-09.jpg', imageAlt: 'Rock Steady performing live on a Phoenix stage' });

const upcoming = upcomingShows();
const eventGraph = {
  '@context': 'https://schema.org',
  '@graph': upcoming.map((show) => {
    const url = show.url ? new URL(show.url, siteConfig.url).toString() : absoluteUrl('/shows');
    const coords = showCoords(show);
    const eventId = `${show.date}-${show.venue.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
    return {
      '@type': 'MusicEvent',
      '@id': `${absoluteUrl('/shows')}#${eventId}`,
      name: `${siteConfig.name} at ${show.venue}`,
      description: `Rock Steady live at ${show.venue}${show.city ? ` in ${show.city}, Arizona` : ''}, with classic rock, throwback sing-alongs, and dance-floor favorites.`,
      image: [absoluteUrl('/images/show-04.jpg'), absoluteUrl('/images/show-09.jpg'), absoluteUrl('/images/show-10.jpg')],
      startDate: showStartISO(show),
      ...(showEndISO(show) && { endDate: showEndISO(show) }),
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      url,
      location: {
        '@type': 'Place',
        name: show.venue,
        address: { '@type': 'PostalAddress', ...(show.city && { addressLocality: show.city }), addressRegion: 'AZ', addressCountry: 'US' },
        ...(coords && { geo: { '@type': 'GeoCoordinates', latitude: coords.lat, longitude: coords.lng } }),
      },
      performer: { '@type': 'MusicGroup', '@id': `${siteConfig.url}/#band`, name: siteConfig.name },
      organizer: { '@type': 'Organization', name: show.venue, ...(show.url && { url }) },
    };
  }),
};

export default function ShowsPage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventGraph).replace(/</g, '\\u003c') }} /><ShrinkingHeader /><main className="min-h-screen bg-[#050505] px-4 pb-20 pt-36 text-white sm:px-6 lg:px-8"><section className="mx-auto max-w-7xl">
    <p className="text-sm font-black uppercase text-[#37d67a]">Around town</p><h1 className="mt-3 max-w-4xl text-5xl font-black leading-tight sm:text-6xl">Phoenix live music built for rooms that like it loud.</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">Find the next Rock Steady show, then bring somebody who knows every word.</p>
    <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"><div className="border border-white/12 bg-white/[0.045] p-6">{upcoming.length ? <UpcomingShows shows={upcoming} /> : <p className="text-xl font-black">More public dates coming soon.</p>}</div><div className="border border-white/12 bg-[#101010] p-6"><p className="text-sm font-black uppercase text-(--rock-steady-yellow)">Across the Valley</p><div className="mt-5 flex flex-wrap gap-2">{siteConfig.areaServed.map(city => <span key={city} className="rounded-full border border-white/14 bg-black/35 px-4 py-2 text-sm font-bold text-white/86">{city}</span>)}</div></div></div>
    <div className="mt-10 text-center"><Link href="/book" className="inline-flex rounded-full bg-(--rock-steady-red) px-7 py-3 text-sm font-black uppercase hover:bg-(--rock-steady-yellow) hover:text-black">Bring Rock Steady to your event</Link></div>
  </section></main></>;
}
