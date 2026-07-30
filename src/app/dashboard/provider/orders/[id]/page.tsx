import { ProviderOrderDetails } from "@/components/provider/provider-order-details";
import { PageHeader } from "@/components/shared/page-header";
export default async function ProviderOrderPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <div className="space-y-7"><PageHeader title="Order details" description="Customer, dates, items, and payment information." /><ProviderOrderDetails id={id} /></div>; }
