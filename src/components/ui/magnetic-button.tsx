"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  strength?: number;
};

export function MagneticButton({
  children,
  className = "",
  disabled = false,
  strength = 0.28,
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);

  const resetPosition = () => {
    const element = wrapperRef.current;
    if (!element) return;

    element.style.transition =
      "transform 500ms cubic-bezier(0.22, 1, 0.36, 1)";
    element.style.transform = "translate3d(0, 0, 0)";
  };

  const handlePointerMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (disabled || event.pointerType === "touch") return;

    const element = wrapperRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = Math.max(
      -18,
      Math.min(18, (event.clientX - centerX) * strength),
    );

    const y = Math.max(
      -18,
      Math.min(18, (event.clientY - centerY) * strength),
    );

    element.style.transition = "transform 90ms ease-out";
    element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  return (
    <span
      ref={wrapperRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPosition}
      onPointerCancel={resetPosition}
      className={`inline-flex will-change-transform ${disabled ? "pointer-events-none" : ""} ${className}`}
    >
      {children}
    </span>
  );
}