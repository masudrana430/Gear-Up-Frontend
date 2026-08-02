"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Package, ShieldCheck, Star } from "lucide-react";
import { Lens } from "@/components/ui/lens";
import { gearService } from "@/services/gear.service";
import { queryKeys } from "@/lib/query/query-keys";
import { getErrorMessage } from "@/lib/api/error-parser";
import { ErrorMessage } from "@/components/shared/error-message";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { RentalForm } from "./rental-form";

export function GearDetails({ id }: { id: string }) {
  const query = useQuery({
    queryKey: queryKeys.gearDetail(id),
    queryFn: () => gearService.detail(id),
  });

  if (query.isLoading) {
    return <LoadingSpinner label="Loading gear details…" />;
  }

  if (query.isError || !query.data) {
    return <ErrorMessage message={getErrorMessage(query.error)} />;
  }

  const gear = query.data;
  const image = gear.images?.find((url) => !url.includes("example.com"));

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
      <div>
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-100 to-orange-100 dark:from-emerald-950 dark:to-orange-950">
          {image ? (
            <Lens
              zoomFactor={2}
              lensSize={175}
              duration={0.15}
              isStatic={false}
              lensColor="rgba(34, 211, 238, 0.35)"
              ariaLabel={`Magnify ${gear.name} image`}
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={image}
                  alt={gear.name}
                  fill
                  unoptimized
                  priority
                  className="select-none object-cover"
                />
              </div>
            </Lens>
          ) : (
            <div className="relative aspect-[16/10]">
              <Package className="absolute inset-0 m-auto size-24 text-primary/40" />
            </div>
          )}
        </div>

        <div className="mt-7">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            {gear.category?.name}
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            {gear.name}
          </h1>

          <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>{gear.brand}</span>

            <span className="flex items-center gap-1">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              {gear._count?.reviews ?? 0} reviews
            </span>

            <span className="flex items-center gap-1">
              <ShieldCheck className="size-4 text-emerald-600" />
              Provider: {gear.provider?.name ?? "Verified"}
            </span>
          </div>

          <p className="mt-7 leading-7 text-muted-foreground">
            {gear.description}
          </p>

          {Object.keys(gear.specifications ?? {}).length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-semibold">Specifications</h2>

              <dl className="mt-4 grid gap-3 rounded-2xl border p-5 sm:grid-cols-2">
                {Object.entries(gear.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between gap-4 border-b pb-2 last:border-0"
                  >
                    <dt className="capitalize text-muted-foreground">{key}</dt>
                    <dd className="font-medium">{String(value)}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>
      </div>

      <aside>
        <RentalForm gear={gear} />
      </aside>
    </div>
  );
}