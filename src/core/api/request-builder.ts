import type { RequestConfig } from './api.types';

export interface TenantHeaders {
  organizationId: string;
  businessUnitId?: string;
  campusId?: string;
}

export const createRequestBuilder = (baseUrl: string) => {
  return {
    build(
      config: Omit<RequestConfig, 'headers'>,
      tenant: TenantHeaders,
      authToken?: string
    ): RequestConfig {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'X-Organization-ID': tenant.organizationId,
        'X-Correlation-ID': crypto.randomUUID(),
      };

      if (tenant.businessUnitId) {
        headers['X-Business-Unit-ID'] = tenant.businessUnitId;
      }
      if (tenant.campusId) {
        headers['X-Campus-ID'] = tenant.campusId;
      }
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      return {
        ...config,
        url: `${baseUrl}${config.url}`,
        headers,
      };
    },
  };
};
