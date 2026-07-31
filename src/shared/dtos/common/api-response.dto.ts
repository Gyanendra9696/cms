export interface ValidationErrorDetail {
  field: string;
  message: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PagedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
