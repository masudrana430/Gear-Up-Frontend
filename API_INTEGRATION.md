# GearUp API Integration

Backend base URL:

`https://gear-up-backend-delta.vercel.app/api/v1`

The frontend uses a centralized `apiRequest` client in
`src/lib/api/client.ts`. It parses the backend response envelope, attaches the
JWT bearer token, and converts failed responses into a structured `ApiError`.
TanStack Query manages remote data, loading states, cache invalidation, and
mutation refreshes.

## Authentication

| Frontend | Endpoint | Method |
| --- | --- | --- |
| `LoginForm` | `/auth/login` | POST |
| `RegisterForm` | `/auth/register` | POST |
| `useAuth` | `/auth/me` | GET |

The JWT and role are stored in same-site cookies for optimistic Next.js Proxy
route checks. The backend remains authoritative and validates the bearer token
and role for every protected API call.

## Public catalogue

| Frontend | Endpoint | Method |
| --- | --- | --- |
| `GearGrid`, home page, browse page | `/gear` | GET |
| `GearFilters`, `GearForm` | `/categories` | GET |
| `GearDetails` | `/gear/{id}` | GET |
| Gear reviews | `/reviews/gear/{gearId}` | GET |

The browse page maps search, category, brand, minimum price, maximum price, and
pagination controls to API query parameters.

## Customer

| Frontend | Endpoint | Method |
| --- | --- | --- |
| `RentalForm` | `/rentals` | POST |
| `RentalTable` | `/rentals` | GET |
| `RentalDetails` | `/rentals/{id}` | GET |
| Rental cancel action | `/rentals/{id}/cancel` | PATCH |
| `PaymentInitiation` | `/payments/{rentalId}/initiate` | POST |
| `PaymentTable` | `/payments` | GET |
| Payment detail service | `/payments/{id}` | GET |
| `ReviewForm` | `/reviews` | POST |
| Review service | `/reviews/{id}` | PATCH, DELETE |

The payment initiation response supplies a real SSLCommerz `gatewayUrl`. The
frontend redirects the browser to that URL. The backend owns the SSLCommerz
success, failure, cancellation, and IPN callbacks:

- `POST /payments/success`
- `POST /payments/fail`
- `POST /payments/cancel`
- `POST /payments/ipn`

The frontend also provides `/payment/success`, `/payment/fail`, and
`/payment/cancel` result pages. The current backend success callback redirects
to `/customer/rentals/{id}?payment=success`; a compatibility route forwards
that return to `/payment/success`.

The current backend failure and cancellation callbacks record the transaction
and return JSON instead of redirecting the browser. Before the final payment
demo, update those two backend callbacks to redirect to the deployed
`/payment/fail` and `/payment/cancel` frontend routes.

## Provider

| Frontend | Endpoint | Method |
| --- | --- | --- |
| `ProviderGearTable`, `GearForm` | `/provider/gear` | GET, POST |
| Gear edit/deactivate | `/provider/gear/{id}` | PATCH, DELETE |
| `ProviderOrderTable` | `/provider/orders` | GET |
| `ProviderOrderDetails` | `/provider/orders/{id}` | GET |
| Provider status actions | `/provider/orders/{id}/status` | PATCH |

The UI follows the supported state transitions: placed to confirmed/cancelled,
paid to picked up, and picked up to returned.

## Admin

| Frontend | Endpoint | Method |
| --- | --- | --- |
| `CategoryTable` | `/admin/categories` | GET, POST |
| Category actions | `/admin/categories/{id}` | PATCH, DELETE |
| `UserTable` | `/admin/users` | GET |
| User status action | `/admin/users/{id}/status` | PATCH |
| `GearModerationTable` | `/admin/gear` | GET |
| Gear status action | `/admin/gear/{id}/status` | PATCH |
| `AdminRentalTable` | `/admin/rentals` | GET |
| `AdminPaymentTable` | `/admin/payments` | GET |

### Review moderation compatibility

The OpenAPI contract does not expose `GET /admin/reviews`. The Admin review
screen therefore loads Admin gear listings, requests each listing's public
`GET /reviews/gear/{gearId}` data, and combines the results into one moderation
table. Admin deletion uses the existing `DELETE /reviews/{id}` endpoint.

## Error and validation behavior

- All forms use React Hook Form with Zod schemas.
- Inline messages identify invalid fields before submission.
- API mutation failures appear as Sonner toast notifications.
- Query failures render structured, user-friendly error panels.
- `error.tsx`, `not-found.tsx`, loading skeletons, and empty states cover route
  and data-fetching failures.
