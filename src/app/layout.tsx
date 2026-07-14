import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BackToTop } from "./components/BackToTop";
import { DownloadTracking } from "./components/DownloadTracking";
import { FunnelTracking } from "./components/FunnelTracking";
import { SiteFooter } from "./components/SiteFooter";
import { absoluteUrl, siteConfig } from "./seo";

const title = {
  default: siteConfig.title,
  template: `%s | ${siteConfig.name}`,
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title,
  applicationName: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "music",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: siteConfig.iconPath,
    apple: siteConfig.iconPath,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: siteConfig.heroImagePath,
        width: 1286,
        height: 965,
        alt: "Rock Steady Phoenix classic rock cover band performing live",
      },
      {
        url: siteConfig.logoPath,
        width: 1024,
        height: 842,
        alt: "Rock Steady band logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl(siteConfig.heroImagePath),
        alt: "Rock Steady Phoenix classic rock cover band performing live",
      },
    ],
  },
  other: {
    "geo.region": "US-AZ",
    "geo.placename": "Phoenix",
    "geo.position": "33.4484;-112.0740",
    ICBM: "33.4484, -112.0740",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* suppressHydrationWarning ignores attribute mismatches on <body> caused
          by browser extensions (password managers, Grammarly, etc.) that inject
          attributes before React hydrates. It only suppresses the body element
          itself, not its children, so real hydration bugs still surface. */}
      <body suppressHydrationWarning>
        {children}
        <SiteFooter />
        <BackToTop />
        <Analytics />
        <DownloadTracking />
        <FunnelTracking />
      </body>
    </html>
  );
}
