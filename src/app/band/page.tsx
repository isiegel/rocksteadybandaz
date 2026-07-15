import Image from 'next/image';
import { bandMembers } from '../band-members';
import { createPageMetadata } from '../seo';

export const metadata = createPageMetadata({ title: 'Meet the Band', description: 'Meet the musicians behind Rock Steady, Phoenix’s female-fronted classic rock cover band.', path: '/band', image: '/images/band/maija.jpg', imageAlt: 'Maija, lead singer of Rock Steady' });

export default function BandPage() {
  return <><main className="min-h-screen bg-[#050505] px-4 pb-20 pt-36 text-white sm:px-6 lg:px-8"><section className="mx-auto max-w-7xl">
    <div className="max-w-3xl"><p className="text-sm font-black uppercase text-[#37d67a]">Meet the band</p><h1 className="mt-3 text-5xl font-black leading-tight sm:text-6xl">Four personalities. One loud night out.</h1><p className="mt-5 text-lg leading-8 text-white/72">Different corners of rock, one crowd-first band - faithful arrangements, plenty of personality, and no interest in playing it safe.</p></div>
    <div className="mt-12 grid gap-6 lg:grid-cols-2">{bandMembers.map((member, index) => <article key={member.name} className="group grid overflow-hidden border border-white/12 bg-[#101010] shadow-[0_20px_50px_rgba(0,0,0,0.24)] sm:grid-cols-[minmax(11rem,0.72fr)_1.28fr]">
      <div className="relative min-h-80 overflow-hidden bg-[#171717] sm:min-h-full">{'image' in member ? <Image src={member.image} alt={member.imageAlt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 100vw" className={`object-cover ${member.imagePosition} transition duration-500 group-hover:scale-[1.025]`} /> : <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_30%,rgba(255,39,0,0.22),transparent_52%),linear-gradient(145deg,#1b1b1b,#090909)] p-8 text-center"><span aria-hidden="true" className="text-8xl font-black text-white/8">G</span><span className="mt-4 text-xs font-black uppercase tracking-[0.22em] text-white/48">Photo coming soon</span></div>}</div>
      <div className="p-6 sm:p-7"><p className="text-xs font-black uppercase tracking-[0.18em] text-(--rock-steady-yellow)">{member.role}</p><h2 className="mt-2 text-3xl font-black">{member.name}</h2><div aria-hidden="true" className={`mt-4 h-1.5 w-14 ${index % 2 === 0 ? 'bg-(--rock-steady-red)' : 'bg-[#37d67a]'}`} /><p className="mt-5 leading-7 text-white/72">{member.bio}</p></div>
    </article>)}</div>
  </section></main></>;
}
