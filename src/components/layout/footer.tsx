import Link from "next/link";
import { Mountain } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2 font-medium text-foreground">
          <Mountain className="size-4" /> GearUp
        </div>
        <p>Sports and outdoor equipment, ready when adventure calls.</p>
        <div className="flex gap-4">
          <Link href="/gear" className="hover:text-foreground">Browse</Link>
          <Link href="/auth/register" className="hover:text-foreground">Become a provider</Link>
        </div>
      </div>
    </footer>
  );
}
