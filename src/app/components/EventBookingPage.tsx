import Image from 'next/image';
import { bookingEmailHref, bookingYear } from '../booking';
import { rockslide } from '../fonts';
import { TrackedLink } from './TrackedLink';

export type EventBookingPageContent = {
  audience: string;
  eyebrow: string;
  headline: string;
  intro: string;
  image: string;
  imageAlt: string;
  benefits: { title: string; description: string }[];
  details: string[];
};

export function EventBookingPage({ content }: { content: EventBookingPageContent }) {
  return (
    <>
      <main id="top" className="min-h-screen bg-[#050505] pt-28 text-white">
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase text-(--rock-steady-yellow)">
                {content.eyebrow}
              </p>
              <h1 className="mt-4 text-5xl font-black leading-none text-white sm:text-6xl">
                {content.headline}
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-bold leading-8 text-white/74">
                {content.intro}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <TrackedLink
                  href="/book#booking"
                  eventName="Booking CTA Click"
                  eventProperties={{ placement: content.audience, destination: 'form' }}
                  className="rounded-full bg-(--rock-steady-red) px-6 py-3 text-sm font-black uppercase text-white transition hover:bg-(--rock-steady-yellow) hover:text-[#111] focus:outline-hidden focus:ring-2 focus:ring-(--rock-steady-yellow)"
                >
                  Check {bookingYear} availability
                </TrackedLink>
                <a
                  href={bookingEmailHref}
                  className="rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-black uppercase text-white transition hover:border-(--rock-steady-yellow) hover:text-(--rock-steady-yellow) focus:outline-hidden focus:ring-2 focus:ring-(--rock-steady-yellow)"
                >
                  Email the band
                </a>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden border border-white/12 shadow-[0_24px_70px_rgba(0,0,0,0.4)]">
              <Image src={content.image} alt={content.imageAlt} fill priority sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" />
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#101010] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-black uppercase text-[#37d67a]">Why Rock Steady</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
              A real band, a familiar set, and a straightforward booking process.
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {content.benefits.map((benefit) => (
                <div key={benefit.title} className="border border-white/12 bg-black/32 p-6">
                  <div className="mb-5 h-2 w-16 bg-(--rock-steady-red)" />
                  <h3 className="text-xl font-black">{benefit.title}</h3>
                  <p className="mt-3 leading-7 text-white/68">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-black uppercase text-(--rock-steady-red)">A good fit</p>
              <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
                Built around the room.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {content.details.map((detail) => (
                <div key={detail} className="border border-white/12 bg-white/[0.045] px-5 py-5 text-sm font-black uppercase leading-6 text-white/88">
                  {detail}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-(--rock-steady-red) px-4 py-16 text-center sm:px-6 lg:px-8">
          <p className={`${rockslide.className} text-5xl leading-none text-white sm:text-6xl`}>
            Bring the rock party.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-bold text-white/88">
            Send the date, location, schedule, and event details. We will confirm fit and next steps.
          </p>
          <TrackedLink
            href="/book#booking"
            eventName="Booking CTA Click"
            eventProperties={{ placement: `${content.audience} bottom`, destination: 'form' }}
            className="mt-7 inline-flex rounded-full bg-(--rock-steady-yellow) px-7 py-3 text-sm font-black uppercase text-[#111] transition hover:bg-white focus:outline-hidden focus:ring-2 focus:ring-white"
          >
            Start a booking inquiry
          </TrackedLink>
        </section>
      </main>
    </>
  );
}
