import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Rock Steady | Phoenix Valley Cover Band",
  description:
    "Rock Steady is a Phoenix Valley cover band playing classic rock, dance favorites, and local rock party sets across Arizona.",
  icons: {
    icon: "/images/rock-steady-logo.png",
  },
  openGraph: {
    title: "Rock Steady",
    description:
      "A Phoenix Valley cover band bringing a local rock party to bars, patios, private events, and neighborhood nights.",
    images: ["/images/rock-steady-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
