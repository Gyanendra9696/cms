import type { ApiResponse, PagedResponse } from '@shared/dtos/common/api-response.dto';

export const unwrapResponse = <T>(response: ApiResponse<T>): T => {
  return response.data;
};

export const unwrapPagedResponse = <T>(response: PagedResponse<T>): T[] => {
  return response.data;
};
