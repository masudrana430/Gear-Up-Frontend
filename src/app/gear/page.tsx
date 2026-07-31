"use client";

import { Suspense, useMemo, type FormEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { GearQuery } from "@/types";
import { GearFilters } from "@/components/gear/gear-filters";
import { GearGrid } from "@/components/gear/gear-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FilterTag = {
  id: string;
  label: string;
  clear: Partial<GearQuery>;
};

function readPositiveInteger(value: string | null, fallback: number) {
  const number = Number(value);

  return Number.isInteger(number) && number > 0 ? number : fallback;
}

function readOptionalNumber(value: string | null) {
  if (value === null || value === "") return undefined;

  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
}

export default function GearPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6">
          <div className="h-10 w-64 animate-pulse rounded bg-muted" />
        </main>
      }
    >
      <GearPageContent />
    </Suspense>
  );
}

function GearPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.toString();

  const filters = useMemo<GearQuery>(() => {
    const params = new URLSearchParams(urlQuery);

    const sortByValue = params.get("sortBy");
    const sortOrderValue = params.get("sortOrder");
    const availableValue = params.get("available");

    return {
      page: readPositiveInteger(params.get("page"), 1),
      limit: readPositiveInteger(params.get("limit"), 12),
      search: params.get("search") || undefined,
      category: params.get("category") || undefined,
      brand: params.get("brand") || undefined,
      minPrice: readOptionalNumber(params.get("minPrice")),
      maxPrice: readOptionalNumber(params.get("maxPrice")),
      available:
        availableValue === "true"
          ? true
          : availableValue === "false"
            ? false
            : undefined,
      sortBy:
        sortByValue === "name" ||
        sortByValue === "pricePerDay" ||
        sortByValue === "createdAt"
          ? sortByValue
          : "createdAt",
      sortOrder: sortOrderValue === "asc" ? "asc" : "desc",
    };
  }, [urlQuery]);

  const writeFilters = (nextFilters: GearQuery) => {
    const params = new URLSearchParams();

    const setParam = (
      key: string,
      value: string | number | boolean | undefined,
    ) => {
      if (value !== undefined && value !== "") {
        params.set(key, String(value));
      }
    };

    setParam("page", nextFilters.page ?? 1);
    setParam("limit", nextFilters.limit ?? 12);
    setParam("search", nextFilters.search);
    setParam("category", nextFilters.category);
    setParam("brand", nextFilters.brand);
    setParam("minPrice", nextFilters.minPrice);
    setParam("maxPrice", nextFilters.maxPrice);
    setParam("available", nextFilters.available);
    setParam("sortBy", nextFilters.sortBy ?? "createdAt");
    setParam("sortOrder", nextFilters.sortOrder ?? "desc");

    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const search = String(formData.get("search") ?? "").trim();

    writeFilters({
      ...filters,
      search: search || undefined,
      page: 1,
    });
  };
  const activeTags: FilterTag[] = [];

  if (filters.search) {
    activeTags.push({
      id: "search",
      label: `Search: ${filters.search}`,
      clear: { search: undefined },
    });
  }

  if (filters.category) {
    activeTags.push({
      id: "category",
      label: `Category: ${filters.category}`,
      clear: { category: undefined },
    });
  }

  if (filters.brand) {
    activeTags.push({
      id: "brand",
      label: `Brand: ${filters.brand}`,
      clear: { brand: undefined },
    });
  }

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    const minimum =
      filters.minPrice !== undefined ? `৳${filters.minPrice}` : "Any";
    const maximum =
      filters.maxPrice !== undefined ? `৳${filters.maxPrice}` : "Any";

    activeTags.push({
      id: "price",
      label: `Price: ${minimum} – ${maximum}`,
      clear: { minPrice: undefined, maxPrice: undefined },
    });
  }

  if (filters.available !== undefined) {
    activeTags.push({
      id: "available",
      label: filters.available ? "Available now" : "Unavailable",
      clear: { available: undefined },
    });
  }

  const sortValue = `${filters.sortBy ?? "createdAt"}:${
    filters.sortOrder ?? "desc"
  }`;

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6">
      <div className="mb-8">
        <p className="text-sm font-semibold text-primary">
          EQUIPMENT FOR EVERY ADVENTURE
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight">
          Browse rental gear
        </h1>

        <p className="mt-3 max-w-2xl text-muted-foreground">
          Search trusted local inventory and reserve exactly what you need.
        </p>
      </div>

      {/* Main search box */}
      <form
        onSubmit={handleSearch}
        className="relative mb-5 flex items-center gap-3"
      >
        <Search className="pointer-events-none absolute left-4 size-5 text-muted-foreground" />

        <Input
          key={urlQuery}
          name="search"
          defaultValue={filters.search ?? ""}
          className="h-12 pl-11 pr-4"
          placeholder="Search rental gear, brands, or equipment..."
        />

        <Button type="submit" className="h-12 px-5">
          Search
        </Button>
      </form>

      {/* Active tags and sorting */}
      <div className="mb-7 flex flex-col gap-4 border-y py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {activeTags.length > 0 ? (
            <>
              {activeTags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() =>
                    writeFilters({
                      ...filters,
                      ...tag.clear,
                      page: 1,
                    })
                  }
                  className="inline-flex items-center gap-1 rounded-full border bg-muted px-3 py-1.5 text-sm font-medium transition hover:bg-destructive/10 hover:text-destructive"
                >
                  {tag.label}
                  <X className="size-3.5" />
                </button>
              ))}

              <button
                type="button"
                onClick={() =>
                  writeFilters({
                    page: 1,
                    limit: filters.limit ?? 12,
                    sortBy: "createdAt",
                    sortOrder: "desc",
                  })
                }
                className="px-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Clear all
              </button>
            </>
          ) : (
            <span className="text-sm text-muted-foreground">
              No filters selected
            </span>
          )}
        </div>

        <label className="flex items-center gap-2 text-sm font-medium">
          <SlidersHorizontal className="size-4" />
          Sort by:
          <select
            value={sortValue}
            onChange={(event) => {
              const [sortBy, sortOrder] = event.target.value.split(":");

              writeFilters({
                ...filters,
                sortBy: sortBy as GearQuery["sortBy"],
                sortOrder: sortOrder as GearQuery["sortOrder"],
                page: 1,
              });
            }}
            className="h-9 rounded-md border bg-background px-3 text-sm outline-none"
          >
            <option value="createdAt:desc">Newest first</option>
            <option value="createdAt:asc">Oldest first</option>
            <option value="pricePerDay:asc">Price: low to high</option>
            <option value="pricePerDay:desc">Price: high to low</option>
            <option value="name:asc">Name: A–Z</option>
            <option value="name:desc">Name: Z–A</option>
          </select>
        </label>
      </div>

      <div className="grid gap-7 lg:grid-cols-[260px_1fr]">
        <GearFilters value={filters} onChange={writeFilters} />
        <GearGrid filters={filters} />
      </div>
    </main>
  );
}
