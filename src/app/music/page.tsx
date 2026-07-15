import { SampleSongListCard } from '../components/SampleSongListCard';
import { VideoEmbed } from '../components/VideoEmbed';
import { absoluteUrl, createPageMetadata, siteConfig } from '../seo';

const songs = [["I Love Rock 'n' Roll",'Joan Jett'],['Straight On','Heart'],['Sharp Dressed Man','ZZ Top'],['Highway to Hell','AC/DC'],['Sweet Emotion','Aerosmith'],['You Wreck Me','Tom Petty'],['We Got the Beat',"The Go-Go's"],['Brass in Pocket','The Pretenders'],['Surrender','Cheap Trick'],['Seven Nation Army','The White Stripes']];
export const metadata = createPageMetadata({ title: 'Music & Live Video', description: 'Watch Rock Steady live and explore a sample of the Phoenix cover band’s crowd-first classic rock set.', path: '/music', image: '/images/show-04.jpg', imageAlt: 'Rock Steady performing live in Phoenix' });

const videoStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  '@id': `${absoluteUrl('/music')}#performance-video`,
  name: siteConfig.video.title,
  description: siteConfig.video.description,
  thumbnailUrl: [`https://i.ytimg.com/vi/${siteConfig.video.youtubeId}/hqdefault.jpg`, `https://i.ytimg.com/vi/${siteConfig.video.youtubeId}/maxresdefault.jpg`],
  embedUrl: `https://www.youtube-nocookie.com/embed/${siteConfig.video.youtubeId}`,
  contentUrl: `https://youtu.be/${siteConfig.video.youtubeId}`,
  uploadDate: siteConfig.video.uploadDate,
  publisher: { '@type': 'MusicGroup', '@id': `${siteConfig.url}/#band`, name: siteConfig.name },
};

export default function MusicPage() { return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData).replace(/</g, '\\u003c') }} /><main className="min-h-screen bg-[#050505] pb-20 pt-36 text-white"><section className="px-4 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"><div><p className="text-sm font-black uppercase text-(--rock-steady-red)">Music &amp; video</p><h1 className="mt-3 text-5xl font-black leading-tight sm:text-6xl">Songs people actually sing.</h1><p className="mt-5 text-lg leading-8 text-white/72">Classic rock, throwback favorites, dance-floor staples, and closing-time choruses - played like a real band in a real room.</p></div><div className="overflow-hidden border border-white/12 bg-black"><VideoEmbed videoId={siteConfig.video.youtubeId} title="Rock Steady live performance video" /></div></div></section>
  <section className="mt-20 bg-[#101010] px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.7fr]"><div><h2 className="text-4xl font-black">A few from the set</h2><ul className="mt-6 grid gap-2 sm:grid-cols-2">{songs.map(([song,artist]) => <li key={song} className="border border-white/12 bg-black/32 px-4 py-3"><span className="font-black">{song}</span> <span className="text-sm font-bold text-white/55">{artist}</span></li>)}</ul></div><SampleSongListCard imagePath={siteConfig.sampleSongListPath} previewImagePath={siteConfig.sampleSongListPreviewPath} /></div></section></main></>; }
