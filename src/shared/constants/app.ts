export const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  AUDITOR: 'AUDITOR',
} as const;

export const PERMISSIONS = {
  READ_ASSET: 'READ_ASSET',
  WRITE_ASSET: 'WRITE_ASSET',
} as const;

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'cms_auth_token',
  AUTH_USER: 'cms_auth_user',
} as const;
