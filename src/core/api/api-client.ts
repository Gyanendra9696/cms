import { baseHttpClient } from './base-http-client';
import { createRequestBuilder, type TenantHeaders } from './request-builder';
import { unwrapResponse } from './response-handler';
import type { HttpMethod } from './api.types';
import type { ApiResponse } from '@shared/dtos/common/api-response.dto';

const builder = createRequestBuilder(''); // Base URL can be configured from environment

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
const request = async <TReq, TRes>(
  method: HttpMethod,
  url: string,
  tenant: TenantHeaders,
  data?: TReq,
  authToken?: string
): Promise<TRes> => {
  const config = builder.build({ url, method, data }, tenant, authToken);
  const response = await baseHttpClient(config);
  return unwrapResponse<TRes>((await response.json()) as ApiResponse<TRes>);
};

export const apiClient = {
  get: <T>(url: string, tenant: TenantHeaders, authToken?: string) => request<undefined, T>('GET', url, tenant, undefined, authToken),
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  post: <TReq, TRes>(url: string, data: TReq, tenant: TenantHeaders, authToken?: string) => request<TReq, TRes>('POST', url, tenant, data, authToken),
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  put: <TReq, TRes>(url: string, data: TReq, tenant: TenantHeaders, authToken?: string) => request<TReq, TRes>('PUT', url, tenant, data, authToken),
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  patch: <TReq, TRes>(url: string, data: TReq, tenant: TenantHeaders, authToken?: string) => request<TReq, TRes>('PATCH', url, tenant, data, authToken),
  delete: <T>(url: string, tenant: TenantHeaders, authToken?: string) => request<undefined, T>('DELETE', url, tenant, undefined, authToken),
};
