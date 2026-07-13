import type { Metadata } from 'next';
import Link from 'next/link';
import { ShrinkingHeader } from '../components/ShrinkingHeader';
import { UpcomingShows } from '../components/UpcomingShows';
import { siteConfig } from '../seo';
import { upcomingShows } from '../shows';

export const metadata: Metadata = { title: 'Upcoming Shows', description: 'See upcoming Rock Steady live shows across Phoenix and the Valley.', alternates: { canonical: '/shows' } };

export default function ShowsPage() {
  const upcoming = upcomingShows();
  return <><ShrinkingHeader /><main className="min-h-screen bg-[#050505] px-4 pb-20 pt-36 text-white sm:px-6 lg:px-8"><section className="mx-auto max-w-7xl">
    <p className="text-sm font-black uppercase text-[#37d67a]">Around town</p><h1 className="mt-3 max-w-4xl text-5xl font-black leading-tight sm:text-6xl">Phoenix live music built for rooms that like it loud.</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">Find the next Rock Steady show, then bring somebody who knows every word.</p>
    <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"><div className="border border-white/12 bg-white/[0.045] p-6">{upcoming.length ? <UpcomingShows shows={upcoming} /> : <p className="text-xl font-black">More public dates coming soon.</p>}</div><div className="border border-white/12 bg-[#101010] p-6"><p className="text-sm font-black uppercase text-(--rock-steady-yellow)">Across the Valley</p><div className="mt-5 flex flex-wrap gap-2">{siteConfig.areaServed.map(city => <span key={city} className="rounded-full border border-white/14 bg-black/35 px-4 py-2 text-sm font-bold text-white/86">{city}</span>)}</div></div></div>
    <div className="mt-10 text-center"><Link href="/book" className="inline-flex rounded-full bg-(--rock-steady-red) px-7 py-3 text-sm font-black uppercase hover:bg-(--rock-steady-yellow) hover:text-black">Bring Rock Steady to your event</Link></div>
  </section></main></>;
}
