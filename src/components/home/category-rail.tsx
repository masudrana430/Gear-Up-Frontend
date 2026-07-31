"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const categories = [
  {
    name: "Camping",
    slug: "camping",
    image: "/images/categories/camping.jpg",
  },
  {
    name: "Cycling",
    slug: "cycling",
    image: "/images/categories/cycling.jpg",
  },
  {
    name: "Hiking",
    slug: "hiking",
    image: "/images/categories/hiking.jpg",
  },
  {
    name: "Team Sports",
    slug: "team-sports",
    image: "/images/categories/team-sports.jpg",
  },
  {
    name: "Water Sports",
    slug: "water-sports",
    image: "/images/categories/water-sports.jpg",
  },
  {
    name: "Fitness",
    slug: "fitness",
    image: "/images/categories/fitness.jpg",
  },
];

type CategoryRailProps = {
  showHeading?: boolean;
};

export function CategoryRail({
  showHeading = false,
}: CategoryRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);
  const isDraggingRef = useRef(false);
  const wasDraggedRef = useRef(false);
  const dragStartRef = useRef({ x: 0, scrollLeft: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const keepScrollLooping = (element: HTMLDivElement) => {
    const loopWidth = element.scrollWidth / 2;

    if (!loopWidth) return;

    if (element.scrollLeft >= loopWidth) {
      element.scrollLeft -= loopWidth;
    }

    if (element.scrollLeft <= 0) {
      element.scrollLeft += loopWidth;
    }
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let animationFrame = 0;
    let previousTime = performance.now();

    rail.scrollLeft = rail.scrollWidth / 4;

    const moveCategories = (currentTime: number) => {
      const delta = currentTime - previousTime;
      previousTime = currentTime;

      if (!isHoveringRef.current && !isDraggingRef.current) {
        // Visual movement: left to right
        rail.scrollLeft -= delta * 0.06;
        keepScrollLooping(rail);
      }

      animationFrame = requestAnimationFrame(moveCategories);
    };

    animationFrame = requestAnimationFrame(moveCategories);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const finishDragging = () => {
    isDraggingRef.current = false;
    setIsDragging(false);

    window.setTimeout(() => {
      wasDraggedRef.current = false;
    }, 0);
  };

  return (
    <section
      aria-label="Shop gear by activity"
      className="border-b border-slate-200 bg-white dark:border-white/10 dark:bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {showHeading && (
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
            Shop by activity
          </h2>
        )}

        <div
          ref={railRef}
          className={`overflow-x-scroll select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onPointerEnter={() => {
            isHoveringRef.current = true;
          }}
          onPointerLeave={() => {
            isHoveringRef.current = false;
          }}
          onPointerDown={(event) => {
            if (event.pointerType === "mouse" && event.button !== 0) return;

            const rail = event.currentTarget;

            isDraggingRef.current = true;
            wasDraggedRef.current = false;
            setIsDragging(true);

            dragStartRef.current = {
              x: event.clientX,
              scrollLeft: rail.scrollLeft,
            };

            rail.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (!isDraggingRef.current) return;

            const rail = event.currentTarget;
            const distance = event.clientX - dragStartRef.current.x;

            if (Math.abs(distance) > 4) {
              wasDraggedRef.current = true;
            }

            rail.scrollLeft = dragStartRef.current.scrollLeft - distance;
            keepScrollLooping(rail);
          }}
          onPointerUp={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId);
            }

            finishDragging();
          }}
          onPointerCancel={finishDragging}
        >
          <div className="flex w-max py-1">
            {[...categories, ...categories].map((category, index) => {
              const isDuplicate = index >= categories.length;

              return (
                <Link
                  key={`${category.slug}-${index}`}
                  href={`/gear?category=${encodeURIComponent(
                    category.slug,
                  )}&page=1&limit=12&sortBy=createdAt&sortOrder=desc`}
                  tabIndex={isDuplicate ? -1 : undefined}
                  aria-hidden={isDuplicate}
                  onClick={(event) => {
                    if (wasDraggedRef.current) {
                      event.preventDefault();
                    }
                  }}
                  className="group relative mr-3 h-[82px] w-[140px] shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-200 shadow-sm transition duration-300 hover:-translate-y-1 hover:scale-105 hover:border-cyan-400 hover:shadow-lg dark:border-white/10 dark:bg-slate-800 sm:h-[88px] sm:w-[150px]"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage: `url('${category.image}')`,
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                  <span className="absolute inset-x-3 bottom-2 text-sm font-bold text-white drop-shadow">
                    {category.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}