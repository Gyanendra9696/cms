export interface ApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
}

export interface PagedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
}

export interface PaginationRequest {
  page: number;
  limit: number;
}

export interface FilterRequest {
  field: string;
  value: string | number | boolean;
  operator: 'eq' | 'neq' | 'gt' | 'lt' | 'like';
}

export interface SortRequest {
  field: string;
  order: 'asc' | 'desc';
}
