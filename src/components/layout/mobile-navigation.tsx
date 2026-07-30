import Link from "next/link";
import { Home, PackageSearch, UserRound } from "lucide-react";

export function MobileNavigation() {
  return (
    <nav className="fixed inset-x-4 bottom-4 z-40 flex justify-around rounded-2xl border bg-background/95 p-2 shadow-lg backdrop-blur md:hidden">
      <Link href="/" className="flex flex-col items-center gap-1 p-2 text-xs">
        <Home className="size-4" />
        Home
      </Link>
      <Link
        href="/gear"
        className="flex flex-col items-center gap-1 p-2 text-xs"
      >
        <PackageSearch className="size-4" />
        Gear
      </Link>
      <Link
        href="/dashboard"
        className="flex flex-col items-center gap-1 p-2 text-xs"
      >
        <UserRound className="size-4" />
        Account
      </Link>
    </nav>
  );
}
