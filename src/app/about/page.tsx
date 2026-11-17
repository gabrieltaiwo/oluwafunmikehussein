import type { Metadata } from "next";
import { AboutPageLayouts } from "@/components/AboutPageLayouts";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "About",
  description: `Background and corporate governance career of ${profile.displayName}.`,
};

export default function AboutPage() {
  return <AboutPageLayouts />;
}
