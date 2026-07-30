import Link from "next/link";
import { CheckCircle2, CircleX, RotateCcw } from "lucide-react";

const content = {
  success: {
    icon: CheckCircle2,
    title: "Payment successful",
    description: "Your transaction was completed. The rental status may take a moment to update.",
    style: "text-emerald-600",
  },
  cancel: {
    icon: RotateCcw,
    title: "Payment cancelled",
    description: "No completed payment was recorded. You can return to the order and try again.",
    style: "text-amber-600",
  },
  fail: {
    icon: CircleX,
    title: "Payment failed",
    description: "The gateway could not complete the transaction. Please try again or use another payment method.",
    style: "text-destructive",
  },
} as const;

export function PaymentResult({ result }: { result: keyof typeof content }) {
  const { icon: Icon, title, description, style } = content[result];
  return <main className="mx-auto flex w-full max-w-lg flex-1 items-center px-4 py-20"><section className="w-full rounded-3xl border bg-card p-8 text-center shadow-sm"><Icon className={`mx-auto size-14 ${style}`} /><h1 className="mt-6 text-3xl font-bold">{title}</h1><p className="mt-3 text-muted-foreground">{description}</p><div className="mt-7 flex justify-center gap-3"><Link href="/dashboard/customer/orders" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">View rentals</Link><Link href="/dashboard/customer/payments" className="rounded-lg border px-4 py-2 text-sm font-medium">Payment history</Link></div></section></main>;
}
