import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The requested Rock Steady page could not be found.',
  alternates: { canonical: null },
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>

      <main className="flex min-h-[75vh] items-center bg-[#050505] px-4 pb-20 pt-36 text-white sm:px-6 lg:px-8">
        <section className="mx-auto w-full max-w-4xl text-center">
          <p className="text-sm font-black uppercase text-(--rock-steady-red)">
            404 - Wrong stage
          </p>
          <h1 className="mt-4 text-5xl font-black leading-tight sm:text-6xl">
            This page left the setlist.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/70">
            The link may be outdated, but the band is still playing.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="rounded-full bg-(--rock-steady-red) px-6 py-3 text-sm font-black uppercase transition hover:bg-(--rock-steady-yellow) hover:text-black">
              Back home
            </Link>
            <Link href="/shows" className="rounded-full border border-white/20 px-6 py-3 text-sm font-black uppercase transition hover:border-(--rock-steady-yellow) hover:text-(--rock-steady-yellow)">
              See upcoming shows
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
