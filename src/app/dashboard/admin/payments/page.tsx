import { AdminPaymentTable } from "@/components/admin/payment-table";
import { PageHeader } from "@/components/shared/page-header";
export default function AdminPaymentsPage() { return <div className="space-y-7"><PageHeader title="Platform payments" description="Inspect SSLCommerz transaction status and revenue." /><AdminPaymentTable /></div>; }
