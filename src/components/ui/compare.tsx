"use client";

import Image from "next/image";
import {
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type CompareProps = {
  firstImage: string;
  secondImage: string;
  className?: string;
  firstImageClassName?: string;
  secondImageClassname?: string;
  initialSliderPercentage?: number;
  slideMode?: "hover" | "drag";
  showHandlebar?: boolean;
  autoplay?: boolean;
  autoplayDuration?: number;
};

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 100);
}

export function Compare({
  firstImage,
  secondImage,
  className = "",
  firstImageClassName = "",
  secondImageClassname = "",
  initialSliderPercentage = 50,
  slideMode = "hover",
  showHandlebar = true,
  autoplay = false,
  autoplayDuration = 5000,
}: CompareProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPercentage, setSliderPercentage] = useState(
    clamp(initialSliderPercentage),
  );
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);



  useEffect(() => {
    if (!autoplay || hasInteracted) return;

    const interval = window.setInterval(() => {
      setSliderPercentage((current) => (current >= 100 ? 0 : current + 1));
    }, Math.max(30, autoplayDuration / 100));

    return () => window.clearInterval(interval);
  }, [autoplay, autoplayDuration, hasInteracted]);

  const updateSliderPosition = (clientX: number) => {
    const container = containerRef.current;

    if (!container) return;

    const bounds = container.getBoundingClientRect();
    const nextPosition = ((clientX - bounds.left) / bounds.width) * 100;

    setSliderPercentage(clamp(nextPosition));
  };

  const handlePointerDown = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    setHasInteracted(true);
    setIsDragging(true);

    event.currentTarget.setPointerCapture(event.pointerId);
    updateSliderPosition(event.clientX);
  };

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (slideMode !== "hover" && !isDragging) return;

    setHasInteracted(true);
    updateSliderPosition(event.clientX);
  };

  const finishDragging = (event: ReactPointerEvent<HTMLDivElement>) => {
    setIsDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyboardMove = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
  ) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    setHasInteracted(true);

    setSliderPercentage((current) =>
      clamp(current + (event.key === "ArrowRight" ? 5 : -5)),
    );
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishDragging}
      onPointerCancel={finishDragging}
      className={`relative isolate overflow-hidden bg-slate-950 touch-pan-y ${className}`}
    >
      {/* Right side: Rent and explore */}
      <div className="absolute inset-0">
        <Image
          src={secondImage}
          alt=""
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className={`object-cover ${secondImageClassname}`}
        />
      </div>

      {/* Left side: Buy and store */}
      <div
        className="absolute inset-0 z-10 overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - sliderPercentage}% 0 0)`,
        }}
      >
        <Image
          src={firstImage}
          alt=""
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className={`object-cover ${firstImageClassName}`}
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 z-20 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_18px_rgba(255,255,255,0.85)]"
        style={{ left: `${sliderPercentage}%` }}
      />

      {showHandlebar && (
        <button
          type="button"
          aria-label="Move image comparison slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(sliderPercentage)}
          aria-orientation="horizontal"
          role="slider"
          onKeyDown={handleKeyboardMove}
          className="absolute top-1/2 z-30 grid size-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border border-white/70 bg-white text-slate-950 shadow-xl transition hover:scale-110 focus:outline-none focus:ring-4 focus:ring-cyan-300/60"
          style={{ left: `${sliderPercentage}%` }}
        >
          <span aria-hidden="true" className="text-base font-black">
            ↔
          </span>
        </button>
      )}
    </div>
  );
}