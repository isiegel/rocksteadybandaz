import Image from 'next/image';
import Link from 'next/link';
import { connection } from 'next/server';
import {
  absoluteBookingAssets,
  bookingAvailabilityCopy,
  bookingAvailabilityLabel,
  bookingServiceName,
  bookingYear,
  checkAvailabilityLabel,
} from './booking';
import { FacebookReelEmbed } from './components/FacebookReelEmbed';
import { TrackedLink } from './components/TrackedLink';
import { UpcomingShows } from './components/UpcomingShows';
import { rockslide } from './fonts';
import { absoluteUrl, siteConfig } from './seo';
import { upcomingShows } from './shows';

const bandRef = { '@type': 'MusicGroup', '@id': `${siteConfig.url}/#band`, name: siteConfig.name };
const areaServed = siteConfig.areaServed.map((name) => ({ '@type': 'City', name: `${name}, Arizona` }));

const structuredData = {
  '@context': 'https://schema.org',
  ...bandRef,
  alternateName: siteConfig.alternateNames,
  url: siteConfig.url,
  email: siteConfig.email,
  logo: absoluteUrl(siteConfig.logoPath),
  image: [absoluteUrl(siteConfig.heroImagePath), absoluteUrl('/images/show-04.jpg')],
  description: siteConfig.description,
  slogan: "It's a rock party.",
  genre: ['Classic rock', 'Cover band', 'Dance rock'],
  sameAs: [siteConfig.facebookUrl, siteConfig.instagramUrl],
  areaServed,
};

const websiteData = {
  '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${siteConfig.url}/#website`,
  url: siteConfig.url, name: siteConfig.name, description: siteConfig.description, publisher: bandRef,
};

const bookingData = {
  '@context': 'https://schema.org', '@type': 'Service', '@id': `${siteConfig.url}/#booking-service`,
  name: bookingServiceName, description: bookingAvailabilityCopy, provider: bandRef, areaServed,
  url: absoluteUrl('/book'),
  subjectOf: absoluteBookingAssets.map((asset) => ({ '@type': 'DigitalDocument', name: asset.title, url: asset.url, description: asset.description })),
};

const destinations = [
  { href: '/shows', eyebrow: 'Live dates', title: 'Find the next show', copy: 'Upcoming public dates across Phoenix and the Valley.', color: 'text-[#37d67a]' },
  { href: '/music', eyebrow: 'The set', title: 'Hear what we play', copy: 'Live video, set highlights, and the downloadable song list.', color: 'text-(--rock-steady-yellow)' },
  { href: '/band', eyebrow: 'Meet Rock Steady', title: 'Know the band', copy: 'Four different personalities behind one unforgettable night out.', color: 'text-(--rock-steady-red)' },
  { href: '/photos', eyebrow: 'From the stage', title: 'See the live show', copy: 'Photos from Valley stages, patios, bars, and events.', color: 'text-[#37d67a]' },
];

export default async function Home() {
  await connection();
  const upcoming = upcomingShows();

  return <>
    {[structuredData, websiteData, bookingData].map((data, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />)}

    <main id="top" className="overflow-hidden bg-[#050505] text-white">
      <section className="relative min-h-[88vh] px-4 pb-16 pt-32 sm:px-6 md:pt-40 lg:px-8">
        <Image src="/images/show-07.jpg" alt="Rock Steady performing live on a Phoenix stage" fill loading="eager" fetchPriority="high" sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-black/58" /><div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#050505] to-transparent" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl"><p className="mb-4 inline-flex rounded-full border border-(--rock-steady-yellow)/40 bg-black/45 px-4 py-2 text-xs font-black uppercase text-(--rock-steady-yellow)">{bookingAvailabilityLabel}</p><h1 className="max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl">Phoenix classic rock built for big nights.</h1><p className="mt-5 max-w-2xl text-lg font-bold leading-8 text-white/88 sm:text-xl">Rock Steady is a female-fronted Phoenix cover band with big vocals, driving guitars, and the songs people shout back from the first round to last call. Now booking {bookingYear} dates across the Valley.</p><div className="mt-8 flex flex-wrap gap-3"><TrackedLink href="/book" eventName="Booking CTA Click" eventProperties={{ placement: 'homepage hero', destination: 'booking page' }} className="rounded-full bg-(--rock-steady-red) px-6 py-3 text-sm font-black uppercase shadow-[0_10px_30px_color-mix(in_srgb,var(--rock-steady-red)_34%,transparent)] transition hover:bg-(--rock-steady-yellow) hover:text-black">{checkAvailabilityLabel}</TrackedLink><Link href="/music" className="rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-black uppercase backdrop-blur transition hover:border-[#37d67a] hover:bg-[#37d67a] hover:text-[#06140b]">Watch the band</Link></div></div>
          <div className="grid max-w-xl grid-cols-2 gap-3 text-sm font-black uppercase sm:grid-cols-4 lg:max-w-md">{['Bars','Patios','Parties','Events'].map(label => <div key={label} className="border border-white/14 bg-black/42 px-4 py-4 text-center backdrop-blur">{label}</div>)}</div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]"><div><p className="text-sm font-black uppercase text-[#37d67a]">Next up</p><h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">Catch Rock Steady around the Valley.</h2><p className="mt-5 text-lg leading-8 text-white/72">Public shows, familiar rooms, and a set made for singing along.</p><Link href="/shows" className="mt-7 inline-flex rounded-full border border-(--rock-steady-yellow) px-5 py-3 text-sm font-black uppercase text-(--rock-steady-yellow) hover:bg-(--rock-steady-yellow) hover:text-black">View all shows</Link></div><div className="border border-white/12 bg-white/[0.045] p-6">{upcoming.length ? <UpcomingShows shows={upcoming.slice(0, 3)} /> : <p className="text-xl font-black">More public dates coming soon.</p>}</div></div></section>

      <section className="bg-[#101010] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div className="mx-auto w-full max-w-[22rem] overflow-hidden border border-white/12 bg-black shadow-[0_24px_70px_rgba(0,0,0,0.38)] lg:mx-0"><FacebookReelEmbed reelUrl="https://www.facebook.com/reel/773938001675087" title="Rock Steady live at The Dubliner Irish Pub" /></div>
          <div><p className="text-sm font-black uppercase text-[#37d67a]">Quick crowd check</p><h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">A fast look at a real night out.</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">Rock Steady live at The Dubliner Irish Pub: a familiar song, a full room, and the kind of energy we bring to Valley stages.</p><div className="mt-7 flex flex-wrap gap-3"><a href="https://www.facebook.com/reel/773938001675087" target="_blank" rel="noreferrer" className="inline-flex rounded-full border border-[#1877f2]/60 bg-[#1877f2]/15 px-5 py-3 text-sm font-black uppercase transition hover:bg-[#1877f2]">Open reel on Facebook</a><Link href="/music" className="inline-flex rounded-full border border-white/20 px-5 py-3 text-sm font-black uppercase hover:border-(--rock-steady-yellow) hover:text-(--rock-steady-yellow)">Explore the music</Link></div></div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><p className="text-sm font-black uppercase text-(--rock-steady-yellow)">Explore Rock Steady</p><h2 className="mt-3 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">Everything has a place now.</h2><div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{destinations.map(item => <Link key={item.href} href={item.href} className="group border border-white/12 bg-[#101010] p-6 transition hover:-translate-y-1 hover:border-(--rock-steady-red)"><p className={`text-xs font-black uppercase tracking-[0.15em] ${item.color}`}>{item.eyebrow}</p><h3 className="mt-3 text-2xl font-black">{item.title}</h3><p className="mt-3 leading-7 text-white/65">{item.copy}</p><span className="mt-6 inline-block text-sm font-black uppercase text-white transition group-hover:text-(--rock-steady-yellow)">Explore →</span></Link>)}</div></div></section>

      <section className="bg-(--rock-steady-red) px-4 py-16 text-center sm:px-6 lg:px-8"><h2 className={`${rockslide.className} text-5xl leading-none text-white sm:text-6xl`}>Bring the rock party.</h2><p className="mx-auto mt-4 max-w-2xl text-lg font-bold text-white/88">Send the date, location, schedule, and room details. We will confirm fit and next steps.</p><TrackedLink href="/book" eventName="Booking CTA Click" eventProperties={{ placement: 'homepage bottom', destination: 'booking page' }} className="mt-7 inline-flex rounded-full bg-(--rock-steady-yellow) px-7 py-3 text-sm font-black uppercase text-black transition hover:bg-white">Check availability</TrackedLink></section>
    </main>
  </>;
}
