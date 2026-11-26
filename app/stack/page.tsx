import type { Metadata } from "next";
import { Stack } from "@/components/Stack";

export const metadata: Metadata = {
  alternates: { canonical: "/stack/" },
  title: "Stack",
  description: "The languages, frameworks and services Kolawole Suleiman (Cortex) uses to build AI agents and websites.",
};

export default function StackPage() {
  return <Stack />;
}
