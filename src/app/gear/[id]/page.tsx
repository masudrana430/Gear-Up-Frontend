import { GearDetails } from "@/components/gear/gear-details";

export default async function GearDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6">
      <GearDetails id={id} />
    </main>
  );
}
