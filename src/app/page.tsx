import Image from 'next/image';
import {
  absoluteBookingAssets,
  bookingAssets,
  bookingAvailabilityCopy,
  bookingAvailabilityLabel,
  bookingEmailHref,
  bookingServiceName,
  bookingYear,
  checkAvailabilityLabel,
} from './booking';
import { BackToTop } from './components/BackToTop';
import { DayOfShowBanner } from './components/DayOfShowBanner';
import { SampleSongListCard } from './components/SampleSongListCard';
import { ShrinkingHeader } from './components/ShrinkingHeader';
import { UpcomingShows } from './components/UpcomingShows';
import { VideoEmbed } from './components/VideoEmbed';
import { absoluteUrl, siteConfig } from './seo';
import {
  dayOfShowBannerShows,
  showCoords,
  showEndISO,
  showStartISO,
  upcomingShows,
  type Show,
} from './shows';
import { soundGear } from './sound-gear';

const upcoming = upcomingShows();
const dayOfShowBannerShowList = dayOfShowBannerShows();
const youtubeVideoId = siteConfig.video.youtubeId;
const youtubeWatchUrl = `https://youtu.be/${youtubeVideoId}`;

const gallery = [
  {
    src: '/images/show-04.jpg',
    alt: 'Rock Steady vocalist singing under colorful stage lights',
    feature: true,
  },
  {
    src: '/images/show-10.jpg',
    alt: 'Black and white photo of Rock Steady playing live',
  },
  {
    src: '/images/show-05.jpg',
    alt: 'Rock Steady vocalist reaching out to a packed crowd at Kimmyz',
  },
  {
    src: '/images/show-09.jpg',
    alt: 'Rock Steady full band with bright club lights',
    feature: true,
  },
  {
    src: '/images/show-03.jpg',
    alt: 'Wide black and white photo of Rock Steady onstage',
  },
  {
    src: '/images/show-11.jpg',
    alt: 'Rock Steady performing on the stage at an Irish pub under blue lights',
  },
];

const setStyles = [
  'Classic rock that starts conversations',
  'Your favorite sing-alongs from the ’70s to today',
  'Dance-floor bar favorites',
  'Guitar hooks, big choruses, no dead air',
];

const setlistSample = [
  { song: "I Love Rock 'n' Roll", artist: 'Joan Jett' },
  { song: 'Straight On', artist: 'Heart' },
  { song: 'Sharp Dressed Man', artist: 'ZZ Top' },
  { song: 'Highway to Hell', artist: 'AC/DC' },
  { song: 'Sweet Emotion', artist: 'Aerosmith' },
  { song: 'Gimme Shelter', artist: 'The Rolling Stones' },
  { song: 'You Wreck Me', artist: 'Tom Petty' },
  { song: 'We Got the Beat', artist: "The Go-Go's" },
  { song: 'Brass in Pocket', artist: 'The Pretenders' },
  { song: 'Surrender', artist: 'Cheap Trick' },
  { song: 'Superstition', artist: 'Stevie Wonder' },
  { song: 'Come Together', artist: 'The Beatles' },
  { song: "Summer of '69", artist: 'Bryan Adams' },
  { song: 'Are You Gonna Be My Girl', artist: 'Jet' },
  { song: 'Seven Nation Army', artist: 'The White Stripes' },
];

const pressBio =
  "Rock Steady is a female-fronted Phoenix cover band built for packed, loud, crowd-first nights. The set spans classic rock, '80s and '90s sing-alongs, and dance-floor staples — Joan Jett, Heart, Tom Petty, ZZ Top, AC/DC and more — played with vocals up front and guitar hooks that cut through. Available for bars, private events, patios, and charity nights across the Phoenix area.";

const pressFacts = [
  { label: 'Based in', value: 'Phoenix, AZ' },
  { label: 'Style', value: "Classic rock · '70s/'80s/'90s · dance covers" },
  { label: 'Format', value: 'Female-fronted full band' },
  { label: 'Sets', value: 'Flexible — up to three sets' },
];

const pressPhotos = [
  { src: '/images/show-08.jpg', label: 'Live photo 1' },
  { src: '/images/show-10.jpg', label: 'Live photo 2' },
  { src: '/images/show-04.jpg', label: 'Live photo 3' },
];

const valleySpots = [
  'Phoenix',
  'Scottsdale',
  'Tempe',
  'Mesa',
  'Chandler',
  'Gilbert',
  'Glendale',
  'Peoria',
  'Queen Creek',
  'Apache Junction',
  'San Tan Valley',
  'Surprise',
  'Sun City',
  'Ahwatukee',
  'Anthem',
];

const regularVenues = [
  'The Loft Again',
  'The Dubliner Irish Pub',
  'Azool Grill',
  'El Dorado Bar & Grill',
  'Kimmyz On Greenway',
  "Jolie's Place",
  'Tailgaters',
  'Luckys Indoor Outdoor',
  'Caesars Sportsbook DTPHX',
  'Starz',
  "J&T's Copper Penny",
  'Sage & Sand',
  'Anthem Country Club',
  'Encantarra Country Club',
  '4Fridays Music Series',
  'Lucky Strikes',
];

const bandStructuredDataRef = {
  '@type': 'MusicGroup',
  '@id': `${siteConfig.url}/#band`,
  name: siteConfig.name,
};

const eventImages = [
  absoluteUrl(siteConfig.heroImagePath),
  absoluteUrl('/images/show-04.jpg'),
  absoluteUrl('/images/show-10.jpg'),
];

const areaServedStructuredData = siteConfig.areaServed.map((city) => ({
  '@type': 'City',
  name: `${city}, Arizona`,
}));

const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  alternateName: siteConfig.alternateNames,
  description: siteConfig.description,
  inLanguage: 'en-US',
  publisher: bandStructuredDataRef,
};

const bookingServiceStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${siteConfig.url}/#booking-service`,
  name: bookingServiceName,
  description: bookingAvailabilityCopy,
  serviceType: siteConfig.bookingServiceTypes,
  provider: bandStructuredDataRef,
  areaServed: areaServedStructuredData,
  url: absoluteUrl('/book'),
  subjectOf: absoluteBookingAssets.map((asset) => ({
    '@type': 'DigitalDocument',
    name: asset.title,
    url: asset.url,
    description: asset.description,
  })),
};

function showEventUrl(show: Show): string {
  return show.url
    ? new URL(show.url, siteConfig.url).toString()
    : absoluteUrl('/#shows');
}

function showEventDescription(show: Show): string {
  const city = show.city ? `${show.city}-area` : 'Phoenix-area';
  const note = show.note ? ` ${show.note}.` : '';

  return `A live Rock Steady ${city} set with classic rock, '80s and '90s sing-alongs, dance-floor bar favorites, loud guitars, and female-fronted vocals.${note}`;
}

function showStructuredData(show: Show) {
  const eventUrl = showEventUrl(show);
  const endDate = showEndISO(show);
  const coords = showCoords(show);

  return {
    '@type': 'MusicEvent',
    name: `${siteConfig.name} at ${show.venue}`,
    description: showEventDescription(show),
    image: eventImages,
    startDate: showStartISO(show),
    ...(endDate && { endDate }),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    url: eventUrl,
    location: {
      '@type': 'Place',
      name: show.venue,
      address: {
        '@type': 'PostalAddress',
        ...(show.city && { addressLocality: show.city }),
        addressRegion: 'AZ',
        addressCountry: 'US',
      },
      ...(coords && {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: coords.lat,
          longitude: coords.lng,
        },
      }),
    },
    offers: {
      '@type': 'Offer',
      url: eventUrl,
      price: 0,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    organizer: {
      '@type': 'Organization',
      name: show.venue,
      ...(show.url && { url: eventUrl }),
    },
    performer: bandStructuredDataRef,
  };
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'MusicGroup',
  '@id': `${siteConfig.url}/#band`,
  name: siteConfig.name,
  alternateName: siteConfig.alternateNames,
  url: siteConfig.url,
  email: siteConfig.email,
  logo: absoluteUrl(siteConfig.logoPath),
  image: [
    absoluteUrl(siteConfig.heroImagePath),
    absoluteUrl('/images/show-04.jpg'),
    absoluteUrl('/images/show-10.jpg'),
  ],
  description: siteConfig.description,
  slogan: "It's a rock party.",
  genre: ['Classic rock', 'Cover band', 'Dance rock', '80s music', '90s music'],
  knowsAbout: siteConfig.searchTopics,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${siteConfig.url}/#webpage`,
    url: siteConfig.url,
    name: siteConfig.title,
  },
  sameAs: [siteConfig.facebookUrl, siteConfig.instagramUrl],
  foundingLocation: {
    '@type': 'Place',
    name: 'Phoenix, Arizona',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Phoenix',
    addressRegion: 'AZ',
    addressCountry: 'US',
  },
  areaServed: areaServedStructuredData,
  keywords: siteConfig.keywords.join(', '),
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'booking',
    email: siteConfig.email,
    url: absoluteUrl('/book'),
    areaServed: 'US-AZ',
  },
  makesOffer: {
    '@type': 'Offer',
    name: bookingAvailabilityLabel,
    description: bookingAvailabilityCopy,
    url: absoluteUrl('/book'),
    availability: 'https://schema.org/InStock',
    itemOffered: {
      '@type': 'Service',
      '@id': `${siteConfig.url}/#booking-service`,
      name: bookingServiceName,
    },
  },
  ...(upcoming.length > 0 && {
    event: upcoming.map(showStructuredData),
  }),
};

// VideoObject keeps the live performance discoverable now that it loads behind a
// click-to-play facade (the iframe is no longer in the initial HTML for crawlers).
const videoStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  '@id': `${siteConfig.url}/#performance-video`,
  name: siteConfig.video.title,
  description: siteConfig.video.description,
  thumbnailUrl: [
    `https://i.ytimg.com/vi/${youtubeVideoId}/hqdefault.jpg`,
    `https://i.ytimg.com/vi/${youtubeVideoId}/maxresdefault.jpg`,
  ],
  embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeVideoId}`,
  contentUrl: youtubeWatchUrl,
  uploadDate: siteConfig.video.uploadDate,
  publisher: bandStructuredDataRef,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData).replace(
            /</g,
            '\\u003c',
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(bookingServiceStructuredData).replace(
            /</g,
            '\\u003c',
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoStructuredData).replace(/</g, '\\u003c'),
        }}
      />
      <ShrinkingHeader />
      <main id="top" className="overflow-hidden bg-[#050505] text-white">
        <section className="relative min-h-[88vh] px-4 pb-16 pt-32 sm:px-6 md:pt-40 lg:px-8">
          <Image
            src="/images/show-07.jpg"
            alt="Rock Steady performing live on a Phoenix stage"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/58" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#050505] to-transparent" />

          <div className="relative mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-4 inline-flex rounded-full border border-[#ffcf33]/40 bg-black/45 px-4 py-2 text-xs font-black uppercase text-[#ffcf33] shadow-[0_0_22px_rgba(255,207,51,0.18)]">
                {bookingAvailabilityLabel}
              </p>
              {/* The visible wordmark now lives in the header; this keeps a
                  single descriptive h1 on the page for SEO and screen readers. */}
              <h1 className="sr-only">
                Rock Steady — Phoenix classic rock cover band for bars, parties,
                and events
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-bold leading-8 text-white/88 sm:text-xl">
                Rock Steady is a female-fronted Phoenix cover band with loud
                guitars, big vocals, and the songs people shout back from the
                first round to last call. We are already booking {bookingYear}{' '}
                dates for bars, patios, private events, corporate nights,
                charity nights, and neighborhood events across the Valley.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/book"
                  className="rounded-full bg-(--rock-steady-red) px-6 py-3 text-sm font-black uppercase text-white shadow-[0_10px_30px_color-mix(in_srgb,var(--rock-steady-red)_34%,transparent)] transition hover:bg-[#ffcf33] hover:text-[#111] focus:outline-hidden focus:ring-2 focus:ring-[#ffcf33]"
                >
                  {checkAvailabilityLabel}
                </a>
                <a
                  href="#video"
                  className="rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-black uppercase text-white backdrop-blur transition hover:border-[#37d67a] hover:bg-[#37d67a] hover:text-[#06140b] focus:outline-hidden focus:ring-2 focus:ring-[#ffcf33]"
                >
                  Watch the band
                </a>
              </div>
            </div>

            <div className="grid max-w-xl grid-cols-2 gap-3 text-sm font-black uppercase text-white sm:grid-cols-4 lg:max-w-md">
              {['Bars', 'Patios', 'Parties', 'Events'].map((label) => (
                <div
                  key={label}
                  className="border border-white/14 bg-black/42 px-4 py-4 text-center shadow-[0_12px_30px_rgba(0,0,0,0.25)] backdrop-blur"
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="shows" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="text-sm font-black uppercase text-[#37d67a]">
                Around town
              </p>
              <h2 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">
                Phoenix live music built for Valley rooms that like it loud.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/72">
                Rock Steady plays the Phoenix area with a set that keeps people
                close to the stage: familiar hooks, danceable tempos, and enough
                grit to still feel like a band in a room.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="border border-white/12 bg-white/4.5 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.24)]">
                <p className="text-sm font-black uppercase text-[#ffcf33]">
                  Upcoming public dates
                </p>

                {upcoming.length > 0 ? (
                  <UpcomingShows shows={upcoming} />
                ) : (
                  <>
                    <h3 className="mt-2 text-2xl font-black text-white">
                      More show announcements coming soon
                    </h3>
                    <p className="mt-3 leading-7 text-white/70">
                      Have a room, patio, neighborhood event, or private party
                      that needs a cover band with some bite? Send the{' '}
                      {bookingYear} date, location, and room details and we will
                      talk next steps.
                    </p>
                  </>
                )}
              </div>

              <div className="border border-white/12 bg-white/[0.045] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.2)]">
                <p className="text-sm font-black uppercase text-[#ffcf33]">
                  Regular stops include
                </p>
                <p className="mt-2 text-sm font-bold leading-6 text-white/68">
                  Valley rooms that bring Rock Steady back for loud, familiar,
                  crowd-first nights.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {regularVenues.map((venue) => (
                    <span
                      key={venue}
                      className="rounded-full border border-[#ffcf33]/22 bg-black/32 px-3 py-2 text-xs font-black uppercase text-white/88"
                    >
                      {venue}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border border-white/12 bg-[#101010] p-6">
                <p className="text-sm font-black uppercase text-(--rock-steady-red)">
                  Phoenix range
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {valleySpots.map((spot) => (
                    <span
                      key={spot}
                      className="rounded-full border border-white/14 bg-black/35 px-4 py-2 text-sm font-bold text-white/86"
                    >
                      {spot}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="video" className="bg-[#070707] px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase text-(--rock-steady-red)">
                Live video
              </p>
              <h2 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">
                See the room before you book it.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/72">
                Watch Rock Steady in motion: big choruses, loud guitars, and a
                set built to keep a local crowd close to the stage.
              </p>
              <a
                href={youtubeWatchUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex rounded-full border border-[#ffcf33]/45 bg-black/35 px-5 py-3 text-sm font-black uppercase text-[#ffcf33] transition hover:border-[#ffcf33] hover:bg-[#ffcf33] hover:text-[#111] focus:outline-hidden focus:ring-2 focus:ring-[#ffcf33]"
              >
                Open on YouTube
              </a>
            </div>

            <div className="overflow-hidden border border-white/12 bg-black shadow-[0_24px_70px_rgba(0,0,0,0.38)]">
              <VideoEmbed
                videoId={youtubeVideoId}
                title="Rock Steady live performance video"
              />
            </div>
          </div>
        </section>

        <section id="music" className="bg-[#101010] px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase text-[#ffcf33]">
                The set
              </p>
              <h2 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">
                Songs people actually sing.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/72">
                The set leans into the songs that work in a packed local room:
                classic rock, throwback favorites, dance-floor staples, and
                closing-time choruses&mdash;all performed with faithful
                arrangements that capture the sound and energy of the original
                recordings.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {setStyles.map((style) => (
                <div
                  key={style}
                  className="border border-white/12 bg-black/32 p-6 shadow-[0_16px_38px_rgba(0,0,0,0.2)]"
                >
                  <div className="mb-5 h-2 w-16 bg-(--rock-steady-red)" />
                  <p className="text-xl font-black leading-7 text-white">
                    {style}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-start">
              <div>
                <p className="text-sm font-black uppercase text-[#ffcf33]">
                  A few from the set
                </p>
                <p className="mt-2 max-w-3xl text-sm font-bold leading-6 text-white/68">
                  A sample of what the night sounds like &mdash; the full set
                  runs deeper and bends to the room.
                </p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {setlistSample.map(({ song, artist }) => (
                    <li
                      key={`${song}-${artist}`}
                      className="flex items-baseline gap-2 border border-white/12 bg-black/32 px-4 py-3"
                    >
                      <span className="text-base font-black leading-6 text-white">
                        {song}
                      </span>
                      <span className="text-sm font-bold text-white/60">
                        {artist}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <SampleSongListCard
                imagePath={siteConfig.sampleSongListPath}
                previewImagePath={siteConfig.sampleSongListPreviewPath}
              />
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <div className="relative aspect-[4/3] overflow-hidden border border-white/12 shadow-[0_24px_70px_rgba(0,0,0,0.36)]">
              <Image
                src="/images/show-10.jpg"
                alt="Rock Steady full band performing in black and white"
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-sm font-black uppercase text-[#37d67a]">
                About the band
              </p>
              <h2 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">
                Local, loose, and ready to turn the room up.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/72">
                Rock Steady delivers high-energy performances with faithful
                arrangements that sound instantly familiar and keep audiences
                singing along.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  'High-energy sets',
                  'Crowd-first songs',
                  'Real band energy',
                ].map((item) => (
                  <div
                    key={item}
                    className="border border-white/12 bg-white/[0.045] px-4 py-5 text-center text-sm font-black uppercase text-white"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="sound" className="bg-[#0b0b0b] px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase text-[#37d67a]">
                Our sound
              </p>
              <h2 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">
                Pro sound, dialed in for the room.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/72">
                We bring our own professional PA and run it right &mdash; full,
                clear, and loud without turning to mud. We play on some of the
                best gear in the business so the vocals cut, the kick hits, and
                every seat in the room hears the party.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {soundGear.map((gear) => (
                <a
                  key={gear.name}
                  href={gear.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${gear.name} — ${gear.role}`}
                  className="group flex flex-col items-center justify-center gap-5 border border-white/12 bg-black/30 p-8 text-center shadow-[0_16px_38px_rgba(0,0,0,0.2)] transition hover:border-[#ffcf33] focus:outline-hidden focus:ring-2 focus:ring-[#ffcf33]"
                >
                  <div className="flex h-14 items-center justify-center">
                    <Image
                      src={gear.src}
                      alt={gear.name}
                      width={gear.width}
                      height={gear.height}
                      unoptimized
                      className="h-9 w-auto opacity-85 transition group-hover:opacity-100"
                    />
                  </div>
                  <p className="text-sm font-black uppercase tracking-wide text-white/64">
                    {gear.role}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section
          id="photos"
          className="bg-[#070707] px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-black uppercase text-(--rock-steady-red)">
                  Photos
                </p>
                <h2 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">
                  Straight from the stage.
                </h2>
              </div>
            </div>

            <div className="mt-10 grid auto-rows-[15rem] gap-4 md:grid-cols-3 md:auto-rows-[18rem]">
              {gallery.map((photo) => (
                <div
                  key={photo.src}
                  className={`relative overflow-hidden border border-white/10 bg-[#181818] ${
                    photo.feature ? 'md:col-span-2' : ''
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={
                      photo.feature
                        ? '(min-width: 768px) 66vw, 100vw'
                        : '(min-width: 768px) 33vw, 100vw'
                    }
                    className="object-cover transition duration-500 hover:scale-[1.03]"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="press" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase text-[#37d67a]">
                For venues
              </p>
              <h2 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">
                Press kit &amp; booking assets.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/72">
                Everything you need to promote the night in one place &mdash;
                grab the logo, pull a few photos, copy the bio, and reach us
                direct.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="flex flex-col border border-white/12 bg-[#101010] p-6">
                <p className="text-sm font-black uppercase text-[#ffcf33]">
                  Logo
                </p>
                <div className="relative mt-4 h-24 w-full bg-black/30">
                  <Image
                    src={siteConfig.horizontalLogoPreviewPath}
                    alt="Rock Steady logo"
                    fill
                    sizes="(min-width: 1024px) 24vw, 100vw"
                    className="object-contain p-3"
                  />
                </div>
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  <a
                    href={siteConfig.horizontalLogoPath}
                    download
                    className="border border-white/15 bg-black/30 px-4 py-2 text-xs font-black uppercase text-white/88 transition hover:border-[#ffcf33] hover:text-[#ffcf33]"
                  >
                    Horizontal PNG
                  </a>
                  <a
                    href={siteConfig.logoPath}
                    download
                    className="border border-white/15 bg-black/30 px-4 py-2 text-xs font-black uppercase text-white/88 transition hover:border-[#ffcf33] hover:text-[#ffcf33]"
                  >
                    Stacked PNG
                  </a>
                </div>
              </div>

              <div className="flex flex-col border border-white/12 bg-[#101010] p-6">
                <p className="text-sm font-black uppercase text-[#ffcf33]">
                  Press photos
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {pressPhotos.map((photo) => (
                    <a
                      key={photo.src}
                      href={photo.src}
                      download
                      aria-label={`Download ${photo.label}`}
                      className="relative block aspect-square overflow-hidden border border-white/12 transition hover:border-[#ffcf33]"
                    >
                      <Image
                        src={photo.src}
                        alt={photo.label}
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                    </a>
                  ))}
                </div>
                <p className="mt-auto pt-5 text-xs font-bold leading-5 text-white/55">
                  Click any photo to download. Credit &ldquo;Rock Steady&rdquo;
                  when you post.
                </p>
              </div>

              <SampleSongListCard
                imagePath={siteConfig.sampleSongListPath}
                previewImagePath={siteConfig.sampleSongListPreviewPath}
                variant="pressKit"
              />

              <div className="flex flex-col border border-white/12 bg-[#101010] p-6">
                <p className="text-sm font-black uppercase text-[#ffcf33]">
                  Venue docs
                </p>
                <div className="mt-4 grid gap-2">
                  {bookingAssets.map((asset) => (
                    <a
                      key={asset.href}
                      href={asset.href}
                      download
                      className="border border-white/15 bg-black/30 px-4 py-3 text-sm font-black uppercase text-white/88 transition hover:border-[#ffcf33] hover:text-[#ffcf33]"
                    >
                      {asset.title} PDF
                    </a>
                  ))}
                </div>
                <p className="mt-auto pt-5 text-xs font-bold leading-5 text-white/55">
                  One-sheet, stage plot, and input list for {bookingYear} venue
                  advance.
                </p>
              </div>

              <div className="flex flex-col border border-white/12 bg-[#101010] p-6">
                <p className="text-sm font-black uppercase text-[#ffcf33]">
                  Contact
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-4 block text-lg font-black text-white transition hover:text-[#ffcf33]"
                >
                  {siteConfig.email}
                </a>
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  <a
                    href={siteConfig.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-white/15 bg-black/30 px-4 py-2 text-xs font-black uppercase text-white/88 transition hover:border-[#ffcf33] hover:text-[#ffcf33]"
                  >
                    Facebook
                  </a>
                  <a
                    href={siteConfig.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-white/15 bg-black/30 px-4 py-2 text-xs font-black uppercase text-white/88 transition hover:border-[#ffcf33] hover:text-[#ffcf33]"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
              <div className="border border-white/12 bg-white/[0.045] p-6">
                <p className="text-sm font-black uppercase text-[#ffcf33]">
                  Short bio
                </p>
                <p className="mt-3 leading-7 text-white/78">{pressBio}</p>
              </div>
              <div className="border border-white/12 bg-[#101010] p-6">
                <p className="text-sm font-black uppercase text-[#ffcf33]">
                  Quick facts
                </p>
                <dl className="mt-4 space-y-3">
                  {pressFacts.map((fact) => (
                    <div key={fact.label}>
                      <dt className="text-xs font-black uppercase text-white/45">
                        {fact.label}
                      </dt>
                      <dd className="text-sm font-bold text-white/85">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <p className="mt-4 text-sm font-bold text-white/60">
              Need room-specific production details beyond the downloadable
              stage plot and input list?{' '}
              <a
                href={bookingEmailHref}
                className="text-[#ffcf33] underline-offset-4 hover:underline"
              >
                Email us
              </a>{' '}
              and we&apos;ll send specifics.
            </p>
          </div>
        </section>
      </main>

      <DayOfShowBanner shows={dayOfShowBannerShowList} />
      <BackToTop />
    </>
  );
}
