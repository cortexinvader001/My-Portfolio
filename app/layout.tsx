import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import { IslandHeader } from "@/components/IslandHeader";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Kolawole Suleiman — Cortex",
    template: "%s | Cortex",
  },
  description:
    "Cortex — Where Curiosity Meets Intelligence. Developer building AI agents, interactive websites and automation.",
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
