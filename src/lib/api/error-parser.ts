import type { ApiErrorResponse } from "@/types";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public details: ApiErrorResponse["errorDetails"] = [],
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function getErrorMessage(error: unknown) {
  if (error instanceof ApiError || error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}
