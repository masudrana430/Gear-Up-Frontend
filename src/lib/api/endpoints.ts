export const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    me: "/auth/me",
  },
  categories: "/categories",
  gear: "/gear",
  provider: {
    gear: "/provider/gear",
    orders: "/provider/orders",
  },
  rentals: "/rentals",
  payments: "/payments",
  reviews: "/reviews",
  admin: {
    categories: "/admin/categories",
    users: "/admin/users",
    gear: "/admin/gear",
    rentals: "/admin/rentals",
    payments: "/admin/payments",
  },
} as const;
