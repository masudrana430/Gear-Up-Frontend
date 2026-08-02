import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  CreditCard,
  PackageCheck,
} from "lucide-react";
import { VideoHero } from "@/components/home/video-hero";
import { CategoryRail } from "@/components/home/category-rail";
import { GearGrid } from "@/components/gear/gear-grid";
import { MarketplaceActions } from "@/components/home/marketplace-actions";
import { GearFlowSection } from "@/components/home/gear-flow-section";
import { CategoryShowcase } from "@/components/home/category-showcase";
import Newsletter from "@/components/home/Newsletter";
import { VideoHeroFooter } from "@/components/home/video-hero-footer";
import { OwnLessCompare } from "@/components/home/own-less-compare";
// import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { AnimatedTestimonialsDemo } from "@/components/home/AnimatedTestimonials";
// import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const features = [
  {
    icon: CalendarCheck,
    title: "Choose your dates",
    text: "Select available gear and rental dates that fit your plan.",
  },
  {
    icon: CreditCard,
    title: "Pay securely",
    text: "Complete real payment through the SSLCommerz gateway.",
  },
  {
    icon: PackageCheck,
    title: "Pick up and explore",
    text: "Track confirmation, pickup, and return status from your dashboard.",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      <VideoHero />
      <CategoryRail />
      <MarketplaceActions />

      <section className="mx-auto max-w-8xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-primary">AVAILABLE NOW</p>
            <h2 className="mt-2 text-3xl font-bold">Featured equipment</h2>
          </div>

          <Link
            href="/gear"
            className="hidden items-center gap-1 text-sm font-medium sm:flex"
          >
            View all <ArrowRight className="size-4" />
          </Link>
        </div>

        <GearGrid filters={{ page: 1, limit: 3 }} />
      </section>

      <GearFlowSection />

      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-8xl px-4 py-16 sm:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border bg-card p-6">
                <Icon className="size-8 text-primary" />
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CategoryShowcase />
      <Newsletter />
      <VideoHeroFooter />
      <OwnLessCompare />
      <AnimatedTestimonialsDemo/>
    </main>
  );
}
