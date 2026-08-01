"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

const categories = [
  {
    name: "Camping",
    slug: "camping",
    image: "/images/categories/camping.jpg",
    description: "Tents, lights, sleeping bags, and everything for camp.",
  },
  {
    name: "Cycling",
    slug: "cycling",
    image: "/images/categories/cycling.jpg",
    description: "Reliable local gear for your next ride.",
  },
  {
    name: "Hiking",
    slug: "hiking",
    image: "/images/categories/hiking.jpg",
    description: "Backpacks, trekking gear, and trail essentials.",
  },
  {
    name: "Team Sports",
    slug: "team-sports",
    image: "/images/categories/team-sports.jpg",
    description: "Gear for games, practice, and competition.",
  },
  {
    name: "Water Sports",
    slug: "water-sports",
    image: "/images/categories/water-sports.jpg",
    description: "Get outside with dependable water-sport rentals.",
  },
  {
    name: "Fitness",
    slug: "fitness",
    image: "/images/categories/fitness.jpg",
    description: "Train your way without buying more equipment.",
  },
];

const previewWidths = ["16%", "10%", "7%", "5%", "4%"];

type RotationDirection = "next" | "previous";

function categoryHref(slug: string) {
  return `/gear?category=${slug}&page=1&limit=12&sortBy=createdAt&sortOrder=desc`;
}

export function CategoryShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const orderedCategories = categories.map(
    (_, index) => categories[(activeIndex + index) % categories.length],
  );

  const featuredCategory = orderedCategories[0];
  const previewCategories = orderedCategories.slice(1);

  const rotate = (movement: RotationDirection) => {
    const track = trackRef.current;

    if (!track || isAnimating) return;

    setIsAnimating(true);

    const exitX = movement === "next" ? -60 : 60;
    const exitRotation = movement === "next" ? -4 : 4;

    const exitAnimation = track.animate(
      [
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) rotateY(0deg)",
        },
        {
          opacity: 0,
          transform: `translate3d(${exitX}px, 0, 0) rotateY(${exitRotation}deg)`,
        },
      ],
      {
        duration: 220,
        easing: "ease-in",
        fill: "forwards",
      },
    );

    void exitAnimation.finished.then(
      () => {
        setActiveIndex((current) =>
          movement === "next"
            ? (current + 1) % categories.length
            : (current - 1 + categories.length) % categories.length,
        );

        window.requestAnimationFrame(() => {
          const updatedTrack = trackRef.current;

          if (!updatedTrack) {
            setIsAnimating(false);
            return;
          }

          const enterAnimation = updatedTrack.animate(
            [
              {
                opacity: 0,
                transform: `translate3d(${-exitX}px, 0, 0) rotateY(${-exitRotation}deg)`,
              },
              {
                opacity: 1,
                transform: "translate3d(0, 0, 0) rotateY(0deg)",
              },
            ],
            {
              duration: 620,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "both",
            },
          );

          void enterAnimation.finished.then(
            () => setIsAnimating(false),
            () => setIsAnimating(false),
          );
        });
      },
      () => setIsAnimating(false),
    );
  };

  return (
    <section className="relative isolate overflow-hidden border-y border-slate-200 bg-white py-16 text-slate-950 sm:py-20 dark:border-white/10 dark:bg-[#050b1f] dark:text-white">
      {/* Dark-mode background effects */}
      <div
        aria-hidden="true"
        className="absolute -left-32 -top-40 hidden size-[32rem] rounded-full bg-cyan-400/15 blur-3xl dark:block"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-52 -right-24 hidden size-[34rem] rounded-full bg-violet-500/20 blur-3xl dark:block"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden opacity-20 dark:block [background-image:linear-gradient(rgba(103,232,249,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.1)_1px,transparent_1px)] [background-size:34px_34px]"
      />

      <div className="relative mx-auto max-w-8xl px-4 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-indigo-600 dark:text-cyan-300">
              EXPLORE GEARUP
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl dark:text-white">
              Choose your next activity.
            </h2>

            <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
              Browse rental gear made for every kind of adventure.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label="Previous category"
              onClick={() => rotate("previous")}
              disabled={isAnimating}
              className="grid size-10 place-items-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600 transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:bg-white/[0.06] dark:text-cyan-200 dark:shadow-[0_8px_30px_rgba(0,0,0,0.25)] dark:hover:border-cyan-300/50 dark:hover:bg-cyan-300 dark:hover:text-slate-950"
            >
              <ChevronLeft className="size-4" />
            </button>

            <button
              type="button"
              aria-label="Next category"
              onClick={() => rotate("next")}
              disabled={isAnimating}
              className="grid size-10 place-items-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600 transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:bg-white/[0.06] dark:text-cyan-200 dark:shadow-[0_8px_30px_rgba(0,0,0,0.25)] dark:hover:border-cyan-300/50 dark:hover:bg-cyan-300 dark:hover:text-slate-950"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden [perspective:1200px] dark:rounded-[1.35rem] dark:border dark:border-white/10 dark:bg-white/[0.025] dark:p-2">
          <div
            ref={trackRef}
            className="flex gap-2.5 will-change-transform"
          >
            <Link
              href={categoryHref(featuredCategory.slug)}
              className="group relative h-[290px] shrink-0 basis-[72%] overflow-hidden rounded-xl border border-white/10 bg-slate-950 shadow-xl shadow-slate-950/20 sm:h-[340px] sm:basis-[64%] dark:shadow-[0_20px_65px_rgba(0,0,0,0.55)]"
            >
              <Image
                src={featuredCategory.image}
                alt={featuredCategory.name}
                fill
                priority
                sizes="(min-width: 640px) 64vw, 72vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/35 to-transparent" />

              <div className="absolute inset-x-5 bottom-5 text-white sm:inset-x-6 sm:bottom-6">
                <p className="text-xs font-bold tracking-[0.16em] text-cyan-200">
                  FEATURED CATEGORY
                </p>

                <h3 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                  {featuredCategory.name}
                </h3>

                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-cyan-100 opacity-0 transition duration-300 group-hover:opacity-100">
                  Explore gear <ArrowUpRight className="size-4" />
                </span>
              </div>
            </Link>

            {previewCategories.map((category, previewIndex) => (
              <Link
                key={category.slug}
                href={categoryHref(category.slug)}
                style={{
                  flexBasis: previewWidths[previewIndex] ?? "3%",
                }}
                className="group relative h-[290px] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-slate-900 transition-[flex-basis,transform] duration-700 hover:-translate-y-1 sm:h-[340px]"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="160px"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/15 to-transparent" />

                {previewIndex === 0 && (
                  <p className="absolute inset-x-3 bottom-3 text-sm font-bold text-white">
                    {category.name}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end dark:border-white/10">
          <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            {featuredCategory.description} Reserve from trusted providers and
            prepare for your next outing.
          </p>

          <Link
            href={categoryHref(featuredCategory.slug)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-indigo-200 px-4 text-sm font-semibold text-indigo-700 transition duration-300 hover:-translate-y-0.5 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white dark:border-cyan-300/30 dark:bg-cyan-300/10 dark:text-cyan-200 dark:hover:border-cyan-300 dark:hover:bg-cyan-300 dark:hover:text-slate-950"
          >
            Browse {featuredCategory.name}
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}