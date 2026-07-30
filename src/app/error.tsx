"use client";

export default function ErrorPage({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <button type="button" onClick={reset} className="mt-4 underline">
        Try again
      </button>
    </main>
  );
}
