import type { Metadata } from "next";
import { Quotes } from "@/components/Quotes";

export const metadata: Metadata = {
  alternates: { canonical: "/quotes/" },
  title: "Quotes",
  description: "Request a quote for a Telegram bot, website, animated site or automation from Kolawole Suleiman (Cortex).",
};

export default function QuotesPage() {
  return (
    <div className="pt-24">
      <Quotes />
    </div>
  );
}
