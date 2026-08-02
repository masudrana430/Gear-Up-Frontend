// import FeaturesSectionDemo from "@/components/ui/features-section-demo-3";
import { FeaturesSectionDemo } from "@/components/ui/features-section-demo-3";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Features | GearUp",
  description:
    "Explore the features that make renting outdoor gear simple with GearUp.",
};

export default function FeaturesPage() {
  return <FeaturesSectionDemo/>;
}