import type { Metadata } from 'next';
import Image from 'next/image';
import {
  bookingAssets,
  bookingAvailabilityCopy,
  bookingAvailabilityLabel,
  bookingEmailHref,
} from '../booking';
import { BackToTop } from '../components/BackToTop';
import { BookingForm } from '../components/BookingForm';
import { ShrinkingHeader } from '../components/ShrinkingHeader';
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
} from '../components/SocialIcons';
import { rockslide } from '../fonts';
import { absoluteUrl, siteConfig } from '../seo';

const bookingPageDescription =
  'Now booking 2027 dates: check Rock Steady availability for Phoenix-area bars, patios, private parties, corporate events, charity nights, and neighborhood events.';

export const metadata: Metadata = {
  title: 'Book Rock Steady for 2027',
  description: bookingPageDescription,
  alternates: {
    canonical: '/book',
  },
  openGraph: {
    title: 'Book Rock Steady for 2027',
    description: bookingPageDescription,
    url: '/book',
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: siteConfig.heroImagePath,
        width: 1286,
        height: 965,
        alt: 'Rock Steady Phoenix classic rock cover band performing live',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book Rock Steady for 2027',
    description: bookingPageDescription,
    images: [
      {
        url: absoluteUrl(siteConfig.heroImagePath),
        alt: 'Rock Steady Phoenix classic rock cover band performing live',
      },
    ],
  },
};

const bookingPageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${siteConfig.url}/#booking-service`,
  name: '2027 Phoenix classic rock cover band booking',
  description: bookingAvailabilityCopy,
  serviceType: siteConfig.bookingServiceTypes,
  provider: {
    '@type': 'MusicGroup',
    '@id': `${siteConfig.url}/#band`,
    name: siteConfig.name,
  },
  areaServed: siteConfig.areaServed.map((city) => ({
    '@type': 'City',
    name: `${city}, Arizona`,
  })),
  url: absoluteUrl('/book'),
};

const eventFit = [
  'Bars and restaurants',
  'Patios and outdoor rooms',
  'Private parties',
  'Corporate events',
  'Charity nights',
  'Neighborhood events',
];

export default function BookPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(bookingPageStructuredData).replace(
            /</g,
            '\\u003c',
          ),
        }}
      />
      <ShrinkingHeader />
      <main id="top" className="min-h-screen bg-[#050505] pt-32 text-white">
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="inline-flex rounded-full border border-[#ffcf33]/40 bg-black/45 px-4 py-2 text-xs font-black uppercase text-[#ffcf33] shadow-[0_0_22px_rgba(255,207,51,0.18)]">
                {bookingAvailabilityLabel}
              </p>
              <h1 className="mt-6 text-5xl font-black leading-none text-white sm:text-6xl">
                Book{' '}
                <span className={`${rockslide.className} rock-steady-fill`}>
                  Rock Steady
                </span>{' '}
                for your 2027 venue or event.
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-bold leading-8 text-white/74">
                {bookingAvailabilityCopy} Send the date, room, schedule, sound
                needs, and contact details so we can confirm fit and next steps.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {eventFit.map((item) => (
                  <div
                    key={item}
                    className="border border-white/12 bg-white/[0.045] px-4 py-4 text-sm font-black uppercase text-white/88"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={bookingEmailHref}
                  className="inline-flex items-center gap-2 rounded-full bg-[#37d67a] px-5 py-3 text-sm font-black uppercase text-[#06140b] transition hover:brightness-110 focus:outline-hidden focus:ring-2 focus:ring-[#ffcf33]"
                >
                  <MailIcon className="h-5 w-5 fill-current" />
                  Email instead
                </a>
                <a
                  href={siteConfig.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-black/35 px-5 py-3 text-sm font-black uppercase text-white transition hover:border-[#ffcf33] hover:text-[#ffcf33] focus:outline-hidden focus:ring-2 focus:ring-[#ffcf33]"
                >
                  <FacebookIcon className="h-5 w-5 fill-current" />
                  Facebook
                </a>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-black/35 px-5 py-3 text-sm font-black uppercase text-white transition hover:border-[#ffcf33] hover:text-[#ffcf33] focus:outline-hidden focus:ring-2 focus:ring-[#ffcf33]"
                >
                  <InstagramIcon className="h-5 w-5 fill-current" />
                  Instagram
                </a>
              </div>
            </div>

            <section
              id="booking"
              aria-label="Booking inquiry form"
              className="scroll-mt-28 border border-white/12 bg-[#101010] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.32)]"
            >
              <p className="text-2xl font-black text-white">
                Check 2027 availability
              </p>
              <p className="mt-3 leading-7 text-white/70">
                Tell us about the date, venue or city, event type, set length,
                load-in timing, sound plan, and expected crowd.
              </p>
              <div className="mt-6">
                <BookingForm
                  mailtoHref={bookingEmailHref}
                  cities={[
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
                  ]}
                />
              </div>
            </section>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0b0b0b] px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase text-[#37d67a]">
                Venue advance
              </p>
              <h2 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">
                Press kit and production docs.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/72">
                Download the one-sheet, stage plot, and input list for a quick
                2027 booking review or house-production advance.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {bookingAssets.map((asset) => (
                <a
                  key={asset.href}
                  href={asset.href}
                  download
                  className="group border border-white/12 bg-black/32 p-5 transition hover:border-[#ffcf33] focus:outline-hidden focus:ring-2 focus:ring-[#ffcf33]"
                >
                  <p className="text-sm font-black uppercase text-[#ffcf33]">
                    {asset.title}
                  </p>
                  <p className="mt-3 text-sm font-bold leading-6 text-white/65">
                    {asset.description}
                  </p>
                  <span className="mt-5 inline-flex text-xs font-black uppercase text-white group-hover:text-[#ffcf33]">
                    Download PDF
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase text-(--rock-steady-red)">
                Sound and promo
              </p>
              <h2 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">
                Built for real rooms.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/72">
                Rock Steady brings professional sound for many rooms and can
                coordinate with house production when the venue has its own
                system. The set is built around familiar classic rock, throwback
                sing-alongs, and crowd-first bar favorites.
              </p>
            </div>

            <div className="border border-white/12 bg-[#101010] p-6">
              <div className="relative h-28 bg-black/30">
                <Image
                  src={siteConfig.horizontalLogoPreviewPath}
                  alt="Rock Steady logo"
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-contain p-4"
                />
              </div>
              <a
                href={siteConfig.horizontalLogoPath}
                download
                className="mt-5 inline-flex rounded-full border border-[#ffcf33]/45 bg-black/35 px-5 py-3 text-xs font-black uppercase text-[#ffcf33] transition hover:bg-[#ffcf33] hover:text-[#111] focus:outline-hidden focus:ring-2 focus:ring-[#ffcf33]"
              >
                Download logo PNG
              </a>
            </div>
          </div>
        </section>
      </main>
      <BackToTop />
    </>
  );
}
