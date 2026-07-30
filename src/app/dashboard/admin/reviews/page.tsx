import { AdminReviewTable } from "@/components/admin/review-table";
import { PageHeader } from "@/components/shared/page-header";
export default function AdminReviewsPage() { return <div className="space-y-7"><PageHeader title="Review moderation" description="Review and remove customer feedback across all gear listings." /><AdminReviewTable /></div>; }
