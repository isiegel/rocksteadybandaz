import type { MetadataRoute } from 'next';
import { absoluteUrl, siteConfig } from './seo';

const imageUrls = (paths: string[]) => paths.map(absoluteUrl);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl('/'),
      changeFrequency: 'weekly',
      priority: 1,
      images: imageUrls([siteConfig.logoPath, siteConfig.heroImagePath]),
    },
    {
      url: absoluteUrl('/shows'),
      changeFrequency: 'weekly',
      priority: 0.9,
      images: imageUrls(['/images/show-09.jpg', '/images/show-10.jpg']),
    },
    {
      url: absoluteUrl('/music'),
      changeFrequency: 'monthly',
      priority: 0.9,
      images: imageUrls(['/images/show-04.jpg', siteConfig.sampleSongListPreviewPath]),
      videos: [{
        title: siteConfig.video.title,
        description: siteConfig.video.description,
        thumbnail_loc: `https://i.ytimg.com/vi/${siteConfig.video.youtubeId}/hqdefault.jpg`,
        content_loc: `https://youtu.be/${siteConfig.video.youtubeId}`,
        player_loc: `https://www.youtube-nocookie.com/embed/${siteConfig.video.youtubeId}`,
        publication_date: siteConfig.video.uploadDate,
      }],
    },
    {
      url: absoluteUrl('/band'),
      changeFrequency: 'monthly',
      priority: 0.8,
      images: imageUrls(['/images/band/maija.jpg', '/images/band/mike.jpg', '/images/band/gene.jpg', '/images/band/ira.jpg']),
    },
    {
      url: absoluteUrl('/photos'),
      changeFrequency: 'monthly',
      priority: 0.8,
      images: imageUrls(['/images/show-04.jpg', '/images/show-09.jpg', '/images/show-10.jpg', '/images/show-11.jpg']),
    },
    {
      url: absoluteUrl('/press'),
      changeFrequency: 'monthly',
      priority: 0.7,
      images: imageUrls([siteConfig.horizontalLogoPreviewPath, '/images/show-08.jpg']),
    },
    {
      url: absoluteUrl('/book'),
      changeFrequency: 'monthly',
      priority: 0.9,
      images: imageUrls([siteConfig.heroImagePath, siteConfig.horizontalLogoPath]),
    },
    ...[
      ['/bar-band-phoenix', '/images/show-05.jpg'],
      ['/private-party-band-phoenix', '/images/show-04.jpg'],
      ['/corporate-event-band-phoenix', '/images/show-09.jpg'],
    ].map(([path, image]) => ({
      url: absoluteUrl(path),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      images: imageUrls([image]),
    })),
  ];
}
