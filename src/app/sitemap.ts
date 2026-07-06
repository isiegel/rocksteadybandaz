import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "./seo";

const indexedImages = [
  siteConfig.logoPath,
  siteConfig.heroImagePath,
  "/images/show-04.jpg",
  "/images/show-09.jpg",
  "/images/show-10.jpg",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: indexedImages.map((path) => absoluteUrl(path)),
      videos: [
        {
          title: siteConfig.video.title,
          description: siteConfig.video.description,
          thumbnail_loc: `https://i.ytimg.com/vi/${siteConfig.video.youtubeId}/hqdefault.jpg`,
          content_loc: `https://youtu.be/${siteConfig.video.youtubeId}`,
          player_loc: `https://www.youtube-nocookie.com/embed/${siteConfig.video.youtubeId}`,
          publication_date: siteConfig.video.uploadDate,
        },
      ],
    },
    {
      url: absoluteUrl("/book"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      images: [
        absoluteUrl(siteConfig.heroImagePath),
        absoluteUrl(siteConfig.horizontalLogoPath),
      ],
    },
  ];
}
