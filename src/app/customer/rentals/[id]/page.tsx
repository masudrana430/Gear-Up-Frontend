import { redirect } from "next/navigation";

export default async function PaymentReturnCompatibilityPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ payment?: string }>;
}) {
  const { id } = await params;
  const { payment } = await searchParams;

  if (payment === "success") {
    redirect(`/payment/success?rentalId=${encodeURIComponent(id)}`);
  }

  redirect(`/dashboard/customer/orders/${encodeURIComponent(id)}`);
}
