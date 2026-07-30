export type ErrorDetail = {
  field?: string;
  path?: string;
  message: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errorDetails?: ErrorDetail[];
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PaginatedData<T> = {
  items: T[];
  meta: PaginationMeta;
};

export type ListQuery = {
  page?: number;
  limit?: number;
  search?: string;
};
