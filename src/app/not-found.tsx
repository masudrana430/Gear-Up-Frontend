import Link from "next/link";

export default function NotFound() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">404 - Page not found</h1>
      <Link href="/" className="mt-4 inline-block underline">
        Return home
      </Link>
    </main>
  );
}
