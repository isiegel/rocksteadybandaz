// Default to the production domain so canonical URLs, og:url, the sitemap,
// and JSON-LD @id never fall back to localhost when NEXT_PUBLIC_SITE_URL is
// unset on the server. Override the env var only for non-production hosts.
const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rocksteadybandaz.com";

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
  instagramUrl: "https://www.instagram.com/rock.steady.band.az",
  instagramHandle: "rock.steady.band.az",
  email: "info@rocksteadybandaz.com",
  logoPath: "/images/rock-steady-logo.png",
  horizontalLogoPath: "/images/rock-steady-horizontal.png",
  iconPath: "/images/rock-steady-rs.png",
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
