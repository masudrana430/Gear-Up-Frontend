"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const categories = [
  { name: "Camping", image: "/images/categories/camping.jpg" },
  { name: "Cycling", image: "/images/categories/cycling.jpg" },
  { name: "Hiking", image: "/images/categories/hiking.jpg" },
  { name: "Photography", image: "/images/categories/photography.jpg" },
  { name: "Water sports", image: "/images/categories/water-sports.jpg" },
  { name: "Fitness", image: "/images/categories/fitness.jpg" },
];

export function CategoryRail() {
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

    // Start from the middle, so dragging works in both directions.
    rail.scrollLeft = rail.scrollWidth / 4;

    const moveCategories = (currentTime: number) => {
      const delta = currentTime - previousTime;
      previousTime = currentTime;

      if (!isHoveringRef.current && !isDraggingRef.current) {
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
      aria-label="Browse gear categories"
      className="border-b border-slate-200 bg-white py-3 dark:border-white/10 dark:bg-background"
    >
      <div className="mx-auto max-w-[1440px]">
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
                  key={`${category.name}-${index}`}
                  href="/gear"
                  tabIndex={isDuplicate ? -1 : undefined}
                  aria-hidden={isDuplicate}
                  onClick={(event) => {
                    if (wasDraggedRef.current) {
                      event.preventDefault();
                    }
                  }}
                  className="group relative mr-3 h-[78px] w-[132px] shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-200 shadow-sm transition duration-300 hover:-translate-y-1 hover:scale-105 hover:border-teal-400 hover:shadow-lg dark:border-white/10 dark:bg-slate-800 sm:h-[80px] sm:w-[140px]"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage: `url('${category.image}')`,
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  <span className="absolute inset-x-2 bottom-2 text-xs font-bold text-white drop-shadow">
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