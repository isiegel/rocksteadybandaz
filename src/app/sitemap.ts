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
      changeFrequency: "monthly",
      priority: 1,
      images: indexedImages.map((path) => absoluteUrl(path)),
    },
  ];
}
