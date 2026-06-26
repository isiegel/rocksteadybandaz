import Image from 'next/image';
import { BackToTop } from './components/BackToTop';
import { BookingForm } from './components/BookingForm';
import { ShrinkingHeader } from './components/ShrinkingHeader';
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
} from './components/SocialIcons';
import { VideoEmbed } from './components/VideoEmbed';
import { rockslide } from './fonts';
import { absoluteUrl, siteConfig } from './seo';
import {
  formatShowDate,
  formatShowTime,
  showEndISO,
  showStartISO,
  upcomingShows,
} from './shows';

const upcoming = upcomingShows();
const youtubeVideoId = 'TiDSYeBD4pw';
const youtubeWatchUrl = `https://youtu.be/${youtubeVideoId}`;
const bookingEmailSubject = 'Booking inquiry for Rock Steady';
const bookingEmailBody = [
  'Hi Rock Steady,',
  '',
  'I would like to check availability for an event.',
  '',
  'Date:',
  'Venue / city:',
  'Event type:',
  'Approximate set length:',
  'Expected crowd size:',
  'Contact name and phone:',
  '',
  'Notes:',
].join('\n');
const bookingEmailHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
  bookingEmailSubject,
)}&body=${encodeURIComponent(bookingEmailBody)}`;

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
];

const setStyles = [
  'Classic rock that starts conversations',
  '70s, 80s and 90s sing-alongs',
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

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'MusicGroup',
  '@id': `${siteConfig.url}/#band`,
  name: siteConfig.name,
  alternateName: 'Rock Steady Band AZ',
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
  areaServed: siteConfig.areaServed.map((city) => ({
    '@type': 'City',
    name: `${city}, Arizona`,
  })),
  keywords: siteConfig.keywords.join(', '),
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'booking',
    email: siteConfig.email,
    url: siteConfig.facebookUrl,
    areaServed: 'US-AZ',
  },
  ...(upcoming.length > 0 && {
    event: upcoming.map((show) => ({
      '@type': 'MusicEvent',
      name: `${siteConfig.name} at ${show.venue}`,
      startDate: showStartISO(show),
      ...(showEndISO(show) && { endDate: showEndISO(show) }),
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      ...(show.url && { url: show.url }),
      location: {
        '@type': 'Place',
        name: show.venue,
        address: {
          '@type': 'PostalAddress',
          ...(show.city && { addressLocality: show.city }),
          addressRegion: 'AZ',
          addressCountry: 'US',
        },
      },
      performer: {
        '@type': 'MusicGroup',
        '@id': `${siteConfig.url}/#band`,
        name: siteConfig.name,
      },
    })),
  }),
};

// ISO 8601 upload date of the YouTube performance video (e.g. "2024-06-15").
// Google requires `uploadDate` for VideoObject rich results — fill this in with
// the video's real publish date to make the embed eligible. Left blank, the
// VideoObject is still valid and helps the video get discovered.
const videoUploadDate = '2025-10-25';

// VideoObject keeps the live performance discoverable now that it loads behind a
// click-to-play facade (the iframe is no longer in the initial HTML for crawlers).
const videoStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: `${siteConfig.name} — Live Performance`,
  description:
    'Rock Steady playing live in Phoenix — classic rock, 80s and 90s favorites, and dance-floor covers from a female-fronted cover band.',
  thumbnailUrl: [
    `https://i.ytimg.com/vi/${youtubeVideoId}/hqdefault.jpg`,
    `https://i.ytimg.com/vi/${youtubeVideoId}/maxresdefault.jpg`,
  ],
  embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeVideoId}`,
  contentUrl: youtubeWatchUrl,
  ...(videoUploadDate ? { uploadDate: videoUploadDate } : {}),
  publisher: {
    '@type': 'MusicGroup',
    '@id': `${siteConfig.url}/#band`,
    name: siteConfig.name,
  },
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
                Phoenix cover band
              </p>
              {/* The visible wordmark now lives in the header; this keeps a
                  single descriptive h1 on the page for SEO and screen readers. */}
              <h1 className="sr-only">Rock Steady — Phoenix cover band</h1>
              <p className="mt-6 max-w-2xl text-lg font-bold leading-8 text-white/88 sm:text-xl">
                Loud guitars, big vocals, and the songs people shout back from
                the first round to last call. It is a local rock party for bars,
                patios, private events, and neighborhood nights across the
                Valley.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#booking"
                  className="rounded-full bg-[#ff2b1f] px-6 py-3 text-sm font-black uppercase text-white shadow-[0_10px_30px_rgba(255,43,31,0.34)] transition hover:bg-[#ffcf33] hover:text-[#111] focus:outline-none focus:ring-2 focus:ring-[#ffcf33]"
                >
                  Book a rock party
                </a>
                <a
                  href="#video"
                  className="rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-black uppercase text-white backdrop-blur transition hover:border-[#37d67a] hover:bg-[#37d67a] hover:text-[#06140b] focus:outline-none focus:ring-2 focus:ring-[#ffcf33]"
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
                Built for Valley rooms that like it loud.
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
                  <ul className="mt-4 divide-y divide-white/10">
                    {upcoming.map((show) => (
                      <li
                        key={`${show.date}-${show.venue}`}
                        className="flex flex-col gap-1.5 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                      >
                        <div>
                          <p className="text-lg font-black leading-tight text-white">
                            {show.venue}
                          </p>
                          {show.city || show.note ? (
                            <p className="mt-0.5 text-sm font-bold text-white/64">
                              {show.city ? `${show.city}, AZ` : ''}
                              {show.city && show.note ? ' · ' : ''}
                              {show.note ?? ''}
                            </p>
                          ) : null}
                        </div>
                        <div className="shrink-0 text-left sm:text-right">
                          <p className="text-sm font-black uppercase text-[#37d67a]">
                            {formatShowDate(show.date)}
                          </p>
                          {formatShowTime(show) ? (
                            <p className="text-sm font-bold text-white/64">
                              {formatShowTime(show)}
                            </p>
                          ) : null}
                          {show.url ? (
                            <a
                              href={show.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm font-black text-[#ffcf33] underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-[#ffcf33]"
                            >
                              Details
                            </a>
                          ) : null}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <>
                    <h3 className="mt-2 text-2xl font-black text-white">
                      More show announcements coming soon
                    </h3>
                    <p className="mt-3 leading-7 text-white/70">
                      Have a room, patio, neighborhood event, or private party
                      that needs a cover band with some bite? Send the date and
                      location and we will talk details.
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
                <p className="text-sm font-black uppercase text-[#ff2b1f]">
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
              <p className="text-sm font-black uppercase text-[#ff2b1f]">
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
                className="mt-7 inline-flex rounded-full border border-[#ffcf33]/45 bg-black/35 px-5 py-3 text-sm font-black uppercase text-[#ffcf33] transition hover:border-[#ffcf33] hover:bg-[#ffcf33] hover:text-[#111] focus:outline-none focus:ring-2 focus:ring-[#ffcf33]"
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
                closing-time choruses.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {setStyles.map((style) => (
                <div
                  key={style}
                  className="border border-white/12 bg-black/32 p-6 shadow-[0_16px_38px_rgba(0,0,0,0.2)]"
                >
                  <div className="mb-5 h-2 w-16 bg-[#ff2b1f]" />
                  <p className="text-xl font-black leading-7 text-white">
                    {style}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <p className="text-sm font-black uppercase text-[#ffcf33]">
                A few from the set
              </p>
              <p className="mt-2 max-w-3xl text-sm font-bold leading-6 text-white/68">
                A sample of what the night sounds like &mdash; the full set runs
                deeper and bends to the room.
              </p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
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
                Rock Steady is a Phoenix cover band with a bar-stage heartbeat:
                vocals up front, guitar hooks that cut through, and a rhythm
                section that keeps the night moving. The point is simple: make
                the room feel like it joined the band for a few hours.
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

        <section
          id="photos"
          className="bg-[#070707] px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-black uppercase text-[#ff2b1f]">
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

        <section id="booking" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 border-y border-white/12 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase text-[#ffcf33]">
                Booking
              </p>
              <h2 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">
                Bring Rock Steady to your place.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/72">
                Bars, neighborhood parties, private events, charity nights, and
                patio hangs all work. Send the date, city, venue, rough set
                length, and the kind of night you want.
              </p>
            </div>

            <div className="border border-white/12 bg-[#101010] p-6">
              <p className="text-2xl font-black text-white">
                Check availability
              </p>
              <p className="mt-3 leading-7 text-white/70">
                Send one quick inquiry with the details venues usually need:
                date, city, event type, set length, crowd size, and the best
                contact.
              </p>
              <div className="mt-6">
                <BookingForm mailtoHref={bookingEmailHref} />
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={siteConfig.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Rock Steady on Facebook"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1877F2] px-5 py-3 text-sm font-black uppercase text-white transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#ffcf33]"
                >
                  <FacebookIcon className="h-5 w-5 fill-current" />
                  Facebook
                </a>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Rock Steady on Instagram"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] px-5 py-3 text-sm font-black uppercase text-white transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#ffcf33]"
                >
                  <InstagramIcon className="h-5 w-5 fill-current" />
                  Instagram
                </a>
                <a
                  href={bookingEmailHref}
                  aria-label="Email Rock Steady"
                  className="inline-flex items-center gap-2 rounded-full bg-[#37d67a] px-5 py-3 text-sm font-black uppercase text-[#06140b] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#ffcf33]"
                >
                  <MailIcon className="h-5 w-5 fill-current" />
                  Email
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="press" className="px-4 pb-20 sm:px-6 lg:px-8">
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

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              <div className="flex flex-col border border-white/12 bg-[#101010] p-6">
                <p className="text-sm font-black uppercase text-[#ffcf33]">
                  Logo
                </p>
                <div className="relative mt-4 h-24 w-full bg-black/30">
                  <Image
                    src={siteConfig.horizontalLogoPath}
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
              Need a stage plot or input list for your room?{' '}
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

      <footer className="border-t border-white/10 bg-black px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div className="flex flex-col items-center gap-3 md:items-start">
              <span
                className={`${rockslide.className} text-3xl leading-none text-[#FD0A04]`}
              >
                Rock Steady
              </span>
              <p className="text-sm font-bold text-white/55">
                Phoenix cover band
                <span className="ml-2 font-black uppercase text-[#ffcf33]">
                  It&apos;s a Rock Party!
                </span>
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 md:items-end">
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm font-bold text-white/70 transition hover:text-[#ffcf33]"
              >
                {siteConfig.email}
              </a>
              <div className="flex items-center gap-4">
                <a
                  href={siteConfig.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Rock Steady on Facebook"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-[#ffcf33] hover:text-[#ffcf33] focus:outline-none focus:ring-2 focus:ring-[#ffcf33]"
                >
                  <FacebookIcon className="h-5 w-5 fill-current" />
                </a>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Rock Steady on Instagram"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-[#ffcf33] hover:text-[#ffcf33] focus:outline-none focus:ring-2 focus:ring-[#ffcf33]"
                >
                  <InstagramIcon className="h-5 w-5 fill-current" />
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  aria-label="Email Rock Steady"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-[#ffcf33] hover:text-[#ffcf33] focus:outline-none focus:ring-2 focus:ring-[#ffcf33]"
                >
                  <MailIcon className="h-5 w-5 fill-current" />
                </a>
              </div>
            </div>
          </div>

          <div
            className="mx-auto mt-8 w-fit py-3 text-center md:mx-0 md:text-left"
            aria-label="Rock Steady uses Gibson guitars and Ludwig drums because they want the best."
          >
            <p className="text-[0.65rem] font-black uppercase leading-tight tracking-[0.12em] text-white">
              <span
                className={`${rockslide.className} normal-case tracking-normal inline-block mr-2 text-white`}
              >
                Rock Steady
              </span>
              uses Gibson guitars
              <br /> and Ludwig drums because
              <br /> they want the best.
            </p>
            <div className="relative mt-2 h-7">
              <a
                href="https://www.gibson.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Gibson guitars"
                className="absolute left-0 top-0 block transition hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#ffcf33]"
              >
                <Image
                  src="/images/gibson-logo.svg"
                  alt="Gibson"
                  width={63}
                  height={40}
                  unoptimized
                  className="h-7 w-auto"
                />
              </a>
              <a
                href="https://www.ludwig-drums.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Ludwig drums"
                className="absolute right-2 -top-2 block transition hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#ffcf33]"
              >
                <Image
                  src="/images/ludwig-logo.svg"
                  alt="Ludwig"
                  width={269}
                  height={87}
                  unoptimized
                  className="h-6 w-16 origin-top-right rotate-[-15deg] object-contain object-right"
                />
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-1 border-t border-white/10 pt-6 text-xs font-bold text-white/45 sm:flex-row sm:justify-between sm:gap-0">
            <p>
              &copy; {new Date().getFullYear()} Rock Steady. All rights
              reserved.
            </p>
            <p>
              Developed by{' '}
              <a
                href="https://siegelcraft.com"
                target="_blank"
                rel="noreferrer"
                className="text-white/70 transition hover:text-[#ffcf33] focus:outline-none focus:ring-2 focus:ring-[#ffcf33]"
              >
                Siegelcraft
              </a>
            </p>
          </div>
        </div>
      </footer>
      <BackToTop />
    </>
  );
}
