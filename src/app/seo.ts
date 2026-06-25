const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const siteUrl = /^https?:\/\//.test(configuredSiteUrl)
  ? configuredSiteUrl
  : `https://${configuredSiteUrl}`;

export const siteConfig = {
  name: "Rock Steady",
  title: "Rock Steady | Phoenix Valley Cover Band",
  description:
    "Rock Steady is a Phoenix Valley cover band playing classic rock, 80s and 90s favorites, dance-floor staples, and local rock party sets across Arizona.",
  url: siteUrl.replace(/\/$/, ""),
  facebookUrl: "https://www.facebook.com/rocksteadybandaz",
  logoPath: "/images/rock-steady-logo.png",
  heroImagePath: "/images/show-07.jpg",
  keywords: [
    "Rock Steady",
    "Rock Steady Band AZ",
    "Phoenix cover band",
    "Phoenix Valley cover band",
    "Arizona cover band",
    "Scottsdale live music",
    "Tempe cover band",
    "Mesa cover band",
    "Chandler cover band",
    "Gilbert cover band",
    "classic rock cover band",
    "private event band Phoenix",
    "bar band Phoenix",
  ],
  areaServed: [
    "Phoenix",
    "Scottsdale",
    "Tempe",
    "Mesa",
    "Chandler",
    "Gilbert",
    "Glendale",
    "Peoria",
  ],
};

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}
