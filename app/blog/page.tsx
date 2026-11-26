import type { Metadata } from "next";
import { Blog } from "@/components/Blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on building AI agents, interactive websites and automation, by Kolawole Suleiman (Cortex).",
};

export default function BlogPage() {
  return (
    <div className="pt-24">
      <Blog />
    </div>
  );
}
