import Image from 'next/image';
import { ShrinkingHeader } from './components/ShrinkingHeader';
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
} from './components/SocialIcons';
import { absoluteUrl, siteConfig } from './seo';
import {
  formatShowDate,
  formatShowTime,
  showEndISO,
  showStartISO,
  upcomingShows,
} from './shows';

const upcoming = upcomingShows();

const gallery = [
  {
    src: '/images/show-04.jpg',
    alt: 'Rock Steady vocalist singing under colorful stage lights',
    feature: true,
  },
  {
    src: '/images/show-05.jpg',
    alt: 'Rock Steady performing at Kimmyz with the crowd close to the stage',
  },
  {
    src: '/images/show-10.jpg',
    alt: 'Black and white photo of Rock Steady playing live',
  },
  {
    src: '/images/show-07.jpg',
    alt: 'Rock Steady singer and guitarist playing on the Silver Bullet Stage',
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
  '80s and 90s sing-alongs',
  'Dance-floor bar favorites',
  'Guitar hooks, big choruses, no dead air',
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

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
      <ShrinkingHeader />
      <main id="top" className="overflow-hidden bg-[#050505] text-white">
        <section className="relative min-h-[88vh] px-4 pb-16 pt-56 sm:px-6 md:pt-72 lg:px-8">
          <Image
            src="/images/show-07.jpg"
            alt="Rock Steady performing live on a Phoenix Valley stage"
            fill
            priority
            loading="eager"
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/58" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#050505] to-transparent" />

          <div className="relative mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-4 inline-flex rounded-full border border-[#ffcf33]/40 bg-black/45 px-4 py-2 text-xs font-black uppercase text-[#ffcf33] shadow-[0_0_22px_rgba(255,207,51,0.18)]">
                Phoenix Valley cover band
              </p>
              <h1 className="text-5xl font-black leading-none text-white sm:text-6xl md:text-7xl">
                Rock Steady
              </h1>
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
                  href="#photos"
                  className="rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-black uppercase text-white backdrop-blur transition hover:border-[#37d67a] hover:bg-[#37d67a] hover:text-[#06140b] focus:outline-none focus:ring-2 focus:ring-[#ffcf33]"
                >
                  See the photos
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
              <div className="border border-white/12 bg-white/[0.045] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.24)]">
                <p className="text-sm font-black uppercase text-[#ffcf33]">
                  Upcoming public dates
                </p>

                {upcoming.length > 0 ? (
                  <ul className="mt-4 divide-y divide-white/10">
                    {upcoming.map((show) => (
                      <li
                        key={`${show.date}-${show.venue}`}
                        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3 first:pt-0 last:pb-0"
                      >
                        <div>
                          <p className="text-lg font-black text-white">
                            {show.venue}
                          </p>
                          {show.city || show.note ? (
                            <p className="text-sm font-bold text-white/64">
                              {show.city ? `${show.city}, AZ` : ''}
                              {show.city && show.note ? ' · ' : ''}
                              {show.note ?? ''}
                            </p>
                          ) : null}
                        </div>
                        <div className="text-right">
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

              <div className="border border-white/12 bg-[#101010] p-6">
                <p className="text-sm font-black uppercase text-[#ff2b1f]">
                  Phoenix Valley range
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
                Rock Steady is a Phoenix Valley cover band with a bar-stage
                heartbeat: vocals up front, guitar hooks that cut through, and a
                rhythm section that keeps the night moving. The point is simple:
                make the room feel like it joined the band for a few hours.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  'High-energy sets',
                  'Crowd-first songs',
                  'Real band energy',
                ].map((item) => (
                  <div
                    key={item}
                    className="border border-white/12 bg-white/[0.045] px-4 py-5 text-sm font-black uppercase text-white"
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
                  A few nights from the stage.
                </h2>
              </div>
              <p className="max-w-md text-base leading-7 text-white/68">
                These shots can be swapped anytime, but they already have the
                right feel: close crowd, club lights, and the band in motion.
              </p>
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
              <p className="text-2xl font-black text-white">Message the band</p>
              <p className="mt-3 leading-7 text-white/70">
                Find us on Facebook and Instagram for booking questions, show
                updates, and photo swaps. Prefer email? Reach us at{' '}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-black text-[#ffcf33] underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-[#ffcf33]"
                >
                  {siteConfig.email}
                </a>
                .
              </p>
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
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center">
          <div className="relative h-9 w-44">
            <Image
              src="/images/rock-steady-horizontal.png"
              alt="Rock Steady"
              fill
              sizes="176px"
              className="object-contain object-center"
            />
          </div>

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

          <a
            href={`mailto:${siteConfig.email}`}
            className="text-sm font-bold text-white/70 transition hover:text-[#ffcf33]"
          >
            {siteConfig.email}
          </a>

          <p className="text-sm font-bold text-white/55">
            Rock Steady - Phoenix Valley cover band - It&apos;s a Rock Party!
          </p>
        </div>
      </footer>
    </>
  );
}
