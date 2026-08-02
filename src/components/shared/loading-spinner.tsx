"use client";

import Lottie from "lottie-react";
import loadingAnimation from "@/assets/animations/loading.json";

type LoadingSpinnerProps = {
  label?: string;
};

export function LoadingSpinner({
  label = "Loading…",
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-48 flex-col items-center justify-center gap-3 text-muted-foreground"
    >
      <div aria-hidden="true" className="size-24 sm:size-28">
        <Lottie
          animationData={loadingAnimation}
          loop
          autoplay
          className="size-full"
        />
      </div>

      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}