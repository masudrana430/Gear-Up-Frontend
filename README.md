# GearUp Frontend

A modern, responsive frontend for renting sports and outdoor equipment. GearUp connects customers who need equipment with providers who manage rental inventory, while giving administrators the tools required to supervise the platform.

## Overview

GearUp supports three role-based experiences:

- **Customers** browse equipment, select rental dates, complete payments, track rentals, and review returned gear.
- **Providers** manage equipment inventory and process incoming rental orders.
- **Administrators** monitor users, gear, rentals, payments, categories, and platform activity.

The application is built with the Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, React Hook Form, Zod, Recharts, Motion, and Three.js-based visualization libraries.

## Core Features

### Customer Experience

- Browse available sports and outdoor gear
- Search and filter by category, price, brand, and availability
- View gear details, images, pricing, and provider information
- Select rental dates with date validation
- Create and track rental orders
- Complete secure SSLCommerz payments in BDT
- Review payment history and rental activity
- Submit reviews after eligible rentals are returned
- View responsive analytics for payments, retention, transactions, and rentals

### Provider Experience

- Create, view, update, and remove gear listings
- Manage gear availability and inventory
- Review incoming rental orders
- Progress orders through the rental lifecycle
- View provider sales, order, and inventory analytics
- Use responsive Sales Performance and Sales Distribution dashboards

### Admin Experience

- View platform-level statistics
- Manage categories
- Monitor customers and providers
- Suspend or reactivate users
- Monitor gear, rentals, and payments
- Moderate platform content and activity
- Review payment distribution and operational status

## Rental Lifecycle

```text
PLACED → CONFIRMED → PAID → PICKED_UP → RETURNED
```

Orders may also move to `CANCELLED` when applicable.

## Payment Flow

GearUp uses SSLCommerz for payment processing.

1. The customer creates a rental.
2. The frontend initiates payment through:

```text
POST /api/v1/payments/{rentalId}/initiate
```

3. The backend returns a `gatewayUrl`.
4. The customer is redirected to SSLCommerz.
5. The backend processes success, failure, cancellation, and IPN callbacks.
6. The frontend displays the resulting payment and rental state.

## Technology Stack

### Framework and Language

| Technology | Purpose |
| --- | --- |
| Next.js 16 | App Router, routing, layouts, server rendering, and application architecture |
| React 19 | Component-based user interface |
| TypeScript 5 | Static type safety |
| Node.js | Local development and build runtime |

### Styling and UI

| Technology | Purpose |
| --- | --- |
| Tailwind CSS 4 | Utility-first styling and responsive layouts |
| shadcn | Reusable application components |
| Base UI | Accessible headless UI primitives |
| class-variance-authority | Component variant management |
| clsx | Conditional class-name composition |
| tailwind-merge | Tailwind class conflict resolution |
| next-themes | Light and dark theme support |
| tw-animate-css | Tailwind-compatible UI animations |

### Data Fetching and State Management

| Technology | Purpose |
| --- | --- |
| TanStack Query | Server-state fetching, caching, synchronization, and mutations |
| TanStack Query Devtools | Query inspection during development |
| Zustand | Lightweight client-side state management |
| js-cookie | Browser cookie utilities |

### Forms and Validation

| Technology | Purpose |
| --- | --- |
| React Hook Form | Performant form state management |
| Zod | Schema validation and type inference |
| Hook Form Resolvers | React Hook Form and Zod integration |
| React DayPicker | Rental-date selection |
| date-fns | Date parsing, comparison, and formatting |

### Animation and Interactive Visuals

| Technology | Purpose |
| --- | --- |
| Motion | Page, component, and interaction animations |
| Lottie React | JSON-based animations |
| tw-animate-css | Utility-driven UI transitions |
| Three.js | 3D rendering |
| React Three Fiber | React renderer for Three.js |
| Drei | Helpers and abstractions for React Three Fiber |
| three-globe | Interactive globe visualizations |
| Cobe | Lightweight WebGL globe effects |

### Charts and Feedback

| Technology | Purpose |
| --- | --- |
| Recharts | Responsive dashboard charts and analytics |
| Sonner | Toast notifications |
| Lucide React | Interface icons |
| Tabler Icons React | Additional icon set |

## Application Architecture

The project follows a feature-oriented Next.js App Router structure.

```text
src/
├── app/
│   ├── auth/
│   ├── dashboard/
│   │   ├── customer/
│   │   ├── provider/
│   │   └── admin/
│   ├── gear/
│   ├── payment/
│   ├── error.tsx
│   ├── loading.tsx
│   └── not-found.tsx
├── components/
│   ├── customer/
│   ├── provider/
│   ├── admin/
│   ├── shared/
│   └── ui/
├── lib/
│   ├── query/
│   └── auth/
├── services/
├── hooks/
├── stores/
└── types/
```

The exact directory contents may evolve as the application grows, but the main architecture separates pages, role-specific components, shared UI, service-layer API access, query configuration, and application types.

## Dashboard Architecture

### Provider Dashboard

```text
src/app/dashboard/provider/page.tsx
```

Uses:

- `ProviderStats`
- `ProviderOrderTable`
- `PageHeader`
- `providerService`
- `queryKeys`
- TanStack Query

The analytics interface includes Sales Performance and Sales Distribution sections backed by provider gear and order data.

### Customer Dashboard

```text
src/app/dashboard/customer/page.tsx
```

Uses:

- `CustomerStats`
- `RentalTable`
- `PageHeader`
- `rentalService`
- `paymentService`
- `queryKeys`
- TanStack Query

The analytics interface includes Payments, Retention, Transactions, and Rentals sections backed by real customer rental and payment data.

## Authentication and Authorization

GearUp uses role-aware authentication and protected application routes.

Supported roles:

```text
CUSTOMER
PROVIDER
ADMIN
```

The frontend uses server-side authentication helpers such as `getServerUser` and `serverApi`, together with protected routes and middleware. Navigation, dashboards, and available actions change according to the authenticated user's role.

## API

### Backend

```text
https://gear-up-backend-delta.vercel.app
```

### API Documentation

```text
https://gear-up-backend-delta.vercel.app/api-docs
```

### OpenAPI Specification

```text
https://gear-up-backend-delta.vercel.app/api-docs.json
```

The frontend API base URL must include the `/api/v1` prefix.

## Environment Variables

Create a `.env.local` file in the project root:

```env
BACKEND_API_URL=https://gear-up-backend-delta.vercel.app/api/v1
```

Add any additional environment variables required by your local authentication, deployment, or integration configuration.

Never commit secrets or production credentials to source control.

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm
- Access to the GearUp backend API

### Installation

```bash
git clone <repository-url>
cd Gear-Up-Frontend
npm install
```

Create `.env.local`, then start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint across the project |
| `npm run type-check` | Run TypeScript without emitting files |

Before submitting changes, run:

```bash
npm run lint
npm run type-check
npm run build
```

## UX and Quality Standards

- Responsive layouts across mobile, tablet, and desktop
- Accessible and reusable UI components
- Light and dark themes
- Loading skeletons and clear pending states
- Structured error feedback
- Toast notifications for user actions
- Route-level `loading.tsx`, `error.tsx`, and `not-found.tsx`
- Consistent status badges and role-aware actions
- Typed service functions and query keys
- Form validation with React Hook Form and Zod
- Optimized images with `next/image`
- Analytics driven by real API data rather than static values

## Dependency Summary

```text
Next.js 16.2.12
React 19.2.4
TypeScript 5
Tailwind CSS 4
shadcn 4.16.0
TanStack Query 5.101.4
Zustand 5.0.14
React Hook Form 7.83.0
Zod 3.25.76
Motion 12.43.0
Recharts 3.10.1
Three.js 0.185.1
React Three Fiber 9.7.0
React Three Drei 10.7.7
Lottie React 2.4.1
Sonner 2.0.7
```

## Project Status

GearUp Frontend is under active development. Current work includes role-specific dashboards, real backend integration, rental and payment workflows, analytics visualizations, responsive UI refinement, and production-readiness improvements.

## Author

**Masud Rana**

- Portfolio: https://masud-rana.dev/
- GitHub: https://github.com/masudrana430
- LinkedIn: https://www.linkedin.com/in/masudrana430
