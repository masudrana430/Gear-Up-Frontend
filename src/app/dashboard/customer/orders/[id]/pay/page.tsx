import { PaymentInitiation } from "@/components/customer/payment-initiation";
import { PageHeader } from "@/components/shared/page-header";

export default async function PayRentalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <div className="space-y-7"><PageHeader title="Pay for rental" description="Complete payment through the secure SSLCommerz gateway." /><PaymentInitiation rentalId={id} /></div>;
}
