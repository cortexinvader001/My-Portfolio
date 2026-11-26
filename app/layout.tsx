import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import { IslandHeader } from "@/components/IslandHeader";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site.config";

const title = "Kolawole Suleiman — Cortex";
const description =
  "Cortex — Where Curiosity Meets Intelligence. Developer building AI agents, interactive websites and automation.";
const cover = { url: "/images/og-cover.jpg", width: 1200, height: 630, alt: "Kolawole Suleiman — Cortex" };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: "Cortex",
  title: {
    default: title,
    template: "%s | Cortex",
  },
  description,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Cortex",
    title,
    description,
    url: site.url,
    locale: "en_US",
    images: [cover],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [cover.url],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <IslandHeader />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
