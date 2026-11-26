import type { Metadata } from "next";
import { About } from "@/components/About";

export const metadata: Metadata = {
  alternates: { canonical: "/about/" },
  title: "About",
  description:
    "About Kolawole Suleiman (Cortex): a developer who builds AI agents, ordering sites and interactive web experiences.",
};

export default function AboutPage() {
  return <About />;
}
