export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type QueryParams = Record<string, string | number | boolean | undefined>;

export interface RequestConfig {
  method: HttpMethod;
  url: string;
  data?: unknown;
  params?: QueryParams;
  headers?: Record<string, string>;
}

export interface InterceptorHooks {
  onRequest?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
  onResponse?: (response: unknown) => unknown | Promise<unknown>;
  onError?: (error: unknown) => Promise<unknown>;
}
