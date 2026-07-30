"use client";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <main className="mx-auto w-full max-w-xl flex-1 p-8 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">{error.message || "An unexpected error interrupted this page."}</p>
      <button type="button" onClick={unstable_retry} className="mt-5 rounded-lg bg-primary px-4 py-2 text-primary-foreground">
        Try again
      </button>
    </main>
  );
}
