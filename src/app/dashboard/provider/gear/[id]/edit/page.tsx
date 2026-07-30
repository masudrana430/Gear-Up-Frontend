import { GearForm } from "@/components/gear/gear-form";
import { PageHeader } from "@/components/shared/page-header";
export default async function EditGearPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <div className="space-y-7"><PageHeader title="Edit gear" description="Update listing details, pricing, and stock." /><GearForm gearId={id} /></div>; }
