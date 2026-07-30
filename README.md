# GearUp Frontend

GearUp is a responsive sports and outdoor equipment rental frontend built with
Next.js 16, TypeScript, Tailwind CSS, TanStack Query, Zustand, React Hook Form,
and Zod.

## Live services

- Backend API: https://gear-up-backend-delta.vercel.app
- Swagger: https://gear-up-backend-delta.vercel.app/api-docs
- OpenAPI: https://gear-up-backend-delta.vercel.app/api-docs.json

## Features

- Public gear catalogue with search and filters
- JWT login and customer/provider registration
- Optimistic role protection through Next.js Proxy
- Customer rental, cancellation, payment, history, and review flows
- Provider inventory CRUD and order fulfillment workflow
- Admin user, category, gear, rental, and payment management
- Real SSLCommerz gateway initiation
- Responsive UI, dark mode, loading skeletons, empty states, and error feedback
- Zod and React Hook Form validation
- Automated ESLint, TypeScript, and production-build CI

## Admin test account

These credentials were verified against the deployed backend:

```text
Email: admin@gearup.com
Password: GearUpAdmin@2026
```

## Local development

```bash
cp .env.example .env.local
npm ci
npm run dev
```

Open http://localhost:3000.

## Quality checks

```bash
npm run lint
npm run type-check
npm run build
```

## Environment variables

```env
NEXT_PUBLIC_API_BASE_URL=https://gear-up-backend-delta.vercel.app/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Set `NEXT_PUBLIC_APP_URL` to the production Vercel URL when deploying.

## API mapping

See [API_INTEGRATION.md](./API_INTEGRATION.md) for the complete mapping between
frontend components and backend endpoints, payment behavior, and the documented
Admin review-listing API gap.
