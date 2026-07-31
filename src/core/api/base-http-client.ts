/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import type { RequestConfig } from './api.types';
import { interceptors } from './interceptors';
import { handleApiError } from './error-handler';

export async function baseHttpClient(config: RequestConfig): Promise<Response> {
  let currentConfig = config;
  if (interceptors.onRequest) {
    currentConfig = await interceptors.onRequest(currentConfig);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(currentConfig.url, {
      method: currentConfig.method,
      headers: currentConfig.headers ?? {},
      body: currentConfig.data ? JSON.stringify(currentConfig.data) : null,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      await handleApiError(response);
    }

    if (interceptors.onResponse) {
       
      await interceptors.onResponse(response);
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (interceptors.onError) {
      await interceptors.onError(error);
    }
    throw error;
  }
}
