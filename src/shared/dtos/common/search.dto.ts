export interface FilterDTO {
  field: string;
  operator: 'eq' | 'neq' | 'gt' | 'lt' | 'like' | 'in';
  value: unknown;
}

export interface SortDTO {
  field: string;
  order: 'asc' | 'desc';
}

export interface SearchRequestDTO {
  filters?: FilterDTO[];
  sort?: SortDTO[];
  searchTerm?: string;
}
