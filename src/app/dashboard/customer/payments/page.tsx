import { PaymentTable } from "@/components/customer/payment-table";
import { PageHeader } from "@/components/shared/page-header";

export default function CustomerPaymentsPage() {
  return <div className="space-y-7"><PageHeader title="Payment history" description="Review SSLCommerz transactions and their current status." /><PaymentTable /></div>;
}
