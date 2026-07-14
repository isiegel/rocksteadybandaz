import Image from 'next/image';
import { ShrinkingHeader } from '../components/ShrinkingHeader';
import { createPageMetadata } from '../seo';

const photos = ['04','10','05','09','03','11','01','02','06','08'].map((number, index) => ({ src: `/images/show-${number}.jpg`, alt: `Rock Steady performing live in Phoenix - photo ${index + 1}`, feature: index === 0 || index === 3 }));
export const metadata = createPageMetadata({ title: 'Live Photos', description: 'Photos of Rock Steady performing live at Phoenix-area venues and events.', path: '/photos', image: '/images/show-04.jpg', imageAlt: 'Rock Steady performing live under colorful stage lights' });

export default function PhotosPage() { return <><ShrinkingHeader /><main className="min-h-screen bg-[#050505] px-4 pb-20 pt-36 text-white sm:px-6 lg:px-8"><section className="mx-auto max-w-7xl"><p className="text-sm font-black uppercase text-(--rock-steady-red)">Live photos</p><h1 className="mt-3 text-5xl font-black sm:text-6xl">Straight from the stage.</h1><div className="mt-12 grid auto-rows-[18rem] gap-4 md:grid-cols-3">{photos.map(photo => <div key={photo.src} className={`relative overflow-hidden border border-white/10 bg-[#181818] ${photo.feature ? 'md:col-span-2' : ''}`}><Image src={photo.src} alt={photo.alt} fill sizes={photo.feature ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'} className="object-cover transition duration-500 hover:scale-[1.03]" /></div>)}</div></section></main></>; }
