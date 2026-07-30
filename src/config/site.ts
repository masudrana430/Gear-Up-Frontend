export const siteConfig = {
  name: "GearUp",
  description: "Rent sports and outdoor gear from trusted local providers.",
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "https://gear-up-backend-delta.vercel.app/api/v1",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
};
