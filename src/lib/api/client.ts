import { siteConfig } from "@/config/site";
import type { ApiErrorResponse, ApiResponse } from "@/types";
import { tokenStorage } from "@/lib/auth/token";
import { ApiError } from "./error-parser";

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  token?: string;
};

export async function apiRequest<T>(
  path: string,
  { body, token, headers, ...options }: RequestOptions = {},
): Promise<T> {
  const accessToken = token ?? tokenStorage.get();
  const response = await fetch(`${siteConfig.apiBaseUrl}${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const payload = (await response.json().catch(() => null)) as
    | ApiResponse<T>
    | ApiErrorResponse
    | null;

  if (!response.ok || !payload || !payload.success) {
    const errorPayload = payload as ApiErrorResponse | null;
    throw new ApiError(
      errorPayload?.message ?? "The server could not complete your request.",
      response.status,
      errorPayload?.errorDetails,
    );
  }

  return (payload as ApiResponse<T>).data;
}

export function queryString(values: Record<string, unknown>) {
  const params = new URLSearchParams();
  Object.entries(values).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  });
  const query = params.toString();
  return query ? `?${query}` : "";
}
