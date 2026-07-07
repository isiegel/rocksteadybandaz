import { bookingYear } from './booking-year';

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
  title: "Rock Steady | Phoenix Classic Rock Cover Band",
  description: `Now booking ${bookingYear} dates: book Rock Steady, a female-fronted Phoenix classic rock cover band for bars, patios, private parties, corporate events, and neighborhood nights across Arizona.`,
  url: siteUrl.replace(/\/$/, ""),
  alternateNames: [
    "Rock Steady Band AZ",
    "Rock Steady Phoenix Cover Band",
    "Rock Steady AZ",
  ],
  facebookUrl: "https://www.facebook.com/rocksteadybandaz",
  instagramUrl: "https://www.instagram.com/rock.steady.band.az",
  instagramHandle: "rock.steady.band.az",
  email: "info@rocksteadybandaz.com",
  logoPath: "/images/rock-steady-logo.png",
  logoPreviewPath: "/images/rock-steady-logo-preview.webp",
  horizontalLogoPath: "/images/rock-steady-horizontal.png",
  horizontalLogoPreviewPath: "/images/rock-steady-horizontal-preview.webp",
  sampleSongListPath: "/images/rock-steady-sample-song-list.png",
  sampleSongListPreviewPath: "/images/rock-steady-sample-song-list-preview.webp",
  iconPath: "/images/rock-steady-rs.png",
  heroImagePath: "/images/show-07.jpg",
  keywords: [
    "Rock Steady",
    "Rock Steady Band AZ",
    "Phoenix cover band",
    "Phoenix classic rock cover band",
    "Arizona cover band",
    "female fronted cover band Phoenix",
    "live rock music Phoenix",
    "Scottsdale live music",
    "Scottsdale cover band",
    "Tempe cover band",
    "Mesa cover band",
    "Chandler cover band",
    "Gilbert cover band",
    "Glendale cover band",
    "Peoria cover band",
    "classic rock cover band",
    "private event band Phoenix",
    "private party band Scottsdale",
    "bar band Phoenix",
    "corporate event band Phoenix",
    `${bookingYear} band booking Phoenix`,
    `${bookingYear} live music Phoenix`,
  ],
  searchTopics: [
    "Phoenix cover band",
    "classic rock cover band",
    "female-fronted rock band",
    "live music for bars",
    "private party band",
    "corporate event band",
    "patio live music",
    "Arizona live music",
  ],
  bookingServiceTypes: [
    "Live music",
    "Classic rock cover band",
    "Bar entertainment",
    "Private event music",
    "Corporate event music",
  ],
  // Every Valley community the band plays. Rendered as the "Phoenix range"
  // chips on the homepage and mirrored into areaServed structured data, so the
  // schema always matches the on-page claim.
  areaServed: [
    "Phoenix",
    "Scottsdale",
    "Paradise Valley",
    "Fountain Hills",
    "Tempe",
    "Mesa",
    "Chandler",
    "Gilbert",
    "Glendale",
    "Peoria",
    "Queen Creek",
    "Apache Junction",
    "San Tan Valley",
    "Surprise",
    "Goodyear",
    "Avondale",
    "Sun City",
    "Sun City West",
    "Ahwatukee",
    "Cave Creek",
    "Carefree",
    "Anthem",
    "New River",
    "Buckeye",
  ],
  video: {
    youtubeId: "TiDSYeBD4pw",
    title: "Rock Steady live Phoenix cover band performance",
    description:
      "Watch Rock Steady perform live in Phoenix with classic rock, 80s and 90s favorites, and dance-floor covers from a female-fronted Arizona cover band.",
    uploadDate: "2025-10-25T00:00:00-07:00",
  },
};

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}
