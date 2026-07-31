import type { FilterDTO, SortDTO, SearchRequestDTO } from '@shared/dtos/common/search.dto';
import type { PaginationRequestDTO } from '@shared/dtos/common/pagination.dto';

export const buildQueryString = (
  pagination?: PaginationRequestDTO,
  search?: SearchRequestDTO
): string => {
  const params = new URLSearchParams();

  if (pagination) {
    params.append('page', pagination.page.toString());
    params.append('limit', pagination.limit.toString());
  }

  if (search?.searchTerm) {
    params.append('search', search.searchTerm);
  }

  search?.filters?.forEach((filter: FilterDTO) => {
    params.append(`filter[${filter.field}][${filter.operator}]`, String(filter.value));
  });

  search?.sort?.forEach((sort: SortDTO) => {
    params.append(`sort[${sort.field}]`, sort.order);
  });

  return params.toString();
};
