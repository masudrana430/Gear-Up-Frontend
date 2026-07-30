import { RentalDetails } from "@/components/customer/rental-details";
import { PageHeader } from "@/components/shared/page-header";

export default async function CustomerOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <div className="space-y-7"><PageHeader title="Rental details" description="Order status, dates, items, and payment information." /><RentalDetails id={id} /></div>;
}
