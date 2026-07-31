import type { InterceptorHooks, RequestConfig } from './api.types';

export const interceptors: InterceptorHooks = {
  onRequest: (config: RequestConfig) => {
    // Inject auth token placeholder
    // config.headers = { ...config.headers, Authorization: 'Bearer ...' };
    return config;
  },
  onResponse: (response: unknown) => {
    // Log response metrics
    return response;
  },
  onError: async (error: unknown) => {
    // Token refresh placeholder
    // if (isUnauthorized(error)) { ... }
    await Promise.reject(new Error(error as string));
  },
};
