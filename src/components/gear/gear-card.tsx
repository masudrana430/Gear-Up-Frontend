import Image from "next/image";
import Link from "next/link";
import { Package, Star } from "lucide-react";
import type { GearItem } from "@/types";
import { formatCurrency } from "@/lib/utils/format-currency";

export function GearCard({ gear }: { gear: GearItem }) {
  const image = gear.images?.find((url) => !url.includes("example.com"));
  return (
    <article className="group overflow-hidden rounded-2xl border bg-card transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/gear/${gear.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-emerald-100 to-orange-100 dark:from-emerald-950 dark:to-orange-950">
          {image ? (
            <Image
              src={image}
              alt={gear.name}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <Package className="absolute inset-0 m-auto size-14 text-primary/45" />
          )}
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium shadow-sm">
            {gear.category?.name ?? "Outdoor gear"}
          </span>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {gear.brand}
              </p>
              <h3 className="mt-1 line-clamp-1 font-semibold">{gear.name}</h3>
            </div>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />
              {gear._count?.reviews ?? 0}
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <p>
              <span className="text-lg font-bold">
                {formatCurrency(gear.pricePerDay)}
              </span>
              <span className="text-xs text-muted-foreground"> / day</span>
            </p>
            <span
              className={`text-xs font-medium ${gear.stockQuantity ? "text-emerald-600" : "text-destructive"}`}
            >
              {gear.stockQuantity
                ? `${gear.stockQuantity} available`
                : "Unavailable"}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
