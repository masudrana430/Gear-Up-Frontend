import { RentalDetails } from "@/components/customer/rental-details";
import { PageHeader } from "@/components/shared/page-header";

export default async function ReviewRentalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="space-y-7">
      <PageHeader
        title="Review your rental"
        description="Share an honest rating after returning the equipment."
      />
      <RentalDetails id={id} mode="review" />
    </div>
  );
}
