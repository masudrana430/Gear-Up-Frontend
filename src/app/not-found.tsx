import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-lg flex-1 p-8 text-center">
      <p className="text-sm font-semibold text-primary">404</p>
      <h1 className="mt-2 text-3xl font-bold">Page not found</h1>
      <p className="mt-3 text-muted-foreground">The page may have moved or the address may be incorrect.</p>
      <Link href="/" className="mt-6 inline-block rounded-lg bg-primary px-4 py-2 text-primary-foreground">
        Return home
      </Link>
    </main>
  );
}
