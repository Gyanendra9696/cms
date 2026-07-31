export interface TenantContext {
  organizationId: string;
  businessUnitId?: string;
  campusId?: string;
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  isSystem?: boolean;
}

export interface MiddlewareRequest<T = Record<string, unknown>> {
  user: AuthenticatedUser;
  tenant: TenantContext;
  body: T;
  params: Record<string, string>;
  query: Record<string, string | string[]>;
}

export interface MiddlewareResponse<T = unknown> {
  status: number;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}
