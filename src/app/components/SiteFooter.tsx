import Image from 'next/image';
import { rockslide } from '../fonts';
import { siteConfig } from '../seo';
import { soundGear } from '../sound-gear';
import { FacebookIcon, InstagramIcon, MailIcon } from './SocialIcons';

function RockSteadyFill({ className = '' }: { className?: string }) {
  return (
    <span className={['rock-steady-fill', className].filter(Boolean).join(' ')}>
      {'Rock Steady'}
    </span>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div className="flex flex-col items-center gap-3 md:items-start">
            <RockSteadyFill
              className={`${rockslide.className} text-3xl leading-none`}
            />
            <p className="text-sm font-bold text-white/55">
              <span className="font-black uppercase text-(--rock-steady-yellow)">
                It&apos;s a Rock Party!
              </span>
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 md:items-end">
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm font-bold text-white/70 transition hover:text-(--rock-steady-yellow)"
            >
              {siteConfig.email}
            </a>
            <div className="flex items-center gap-4">
              <a
                href={siteConfig.facebookUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Rock Steady on Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-(--rock-steady-yellow) hover:text-(--rock-steady-yellow) focus:outline-hidden focus:ring-2 focus:ring-(--rock-steady-yellow)"
              >
                <FacebookIcon className="h-5 w-5 fill-current" />
              </a>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Rock Steady on Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-(--rock-steady-yellow) hover:text-(--rock-steady-yellow) focus:outline-hidden focus:ring-2 focus:ring-(--rock-steady-yellow)"
              >
                <InstagramIcon className="h-5 w-5 fill-current" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Email Rock Steady"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-(--rock-steady-yellow) hover:text-(--rock-steady-yellow) focus:outline-hidden focus:ring-2 focus:ring-(--rock-steady-yellow)"
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
            <RockSteadyFill
              className={`${rockslide.className} normal-case tracking-normal inline-block mr-2`}
            />
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
              className="absolute left-0 top-0 block transition hover:opacity-80 focus:outline-hidden focus:ring-2 focus:ring-(--rock-steady-yellow)"
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
              className="absolute right-2 -top-2 block transition hover:opacity-80 focus:outline-hidden focus:ring-2 focus:ring-(--rock-steady-yellow)"
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

        <div className="mt-8 flex flex-col items-center gap-4 border-t border-white/10 pt-6 sm:flex-row sm:justify-center">
          <span className="text-[0.65rem] font-black uppercase tracking-[0.12em] text-white/45">
            Pro sound by
          </span>
          <div className="flex items-center gap-7">
            {soundGear.map((gear) => (
              <a
                key={gear.name}
                href={gear.url}
                target="_blank"
                rel="noreferrer"
                aria-label={gear.name}
                className="block opacity-60 transition hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-(--rock-steady-yellow)"
              >
                <Image
                  src={gear.src}
                  alt={gear.name}
                  width={gear.width}
                  height={gear.height}
                  unoptimized
                  className="h-5 w-auto"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-1 border-t border-white/10 pt-6 text-xs font-bold text-white/45 sm:flex-row sm:justify-between sm:gap-0">
          <p>
            &copy; {new Date().getFullYear()} Rock Steady. All rights reserved.
          </p>
          <p>
            Developed by{' '}
            <a
              href="https://siegelcraft.com"
              target="_blank"
              rel="noreferrer"
              className="text-white/70 transition hover:text-(--rock-steady-yellow) focus:outline-hidden focus:ring-2 focus:ring-(--rock-steady-yellow)"
            >
              Siegelcraft
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
