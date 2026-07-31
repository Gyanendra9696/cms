import type { TenantEntity } from '../../database/base.entity';

export interface Role extends TenantEntity {
  name: string;
  code: string;
  description?: string;
  is_system: boolean;
  is_active: boolean;
}

export interface Permission extends TenantEntity {
  module: string;
  resource: string;
  action: string;
  code: string;
  description?: string;
  is_active: boolean;
}

export interface UserRoleAssignment extends TenantEntity {
  user_id: string;
  role_id: string;
}

export interface RolePermissionAssignment extends TenantEntity {
  role_id: string;
  permission_id: string;
}

export interface UserPermissionAssignment extends TenantEntity {
  user_id: string;
  permission_id: string;
}

export interface JwtPayload {
  sub: string;
  user_id: string;
  organization_id: string;
  roles: string[];
  permissions: string[];
  iat: number;
  exp: number;
}

export interface PermissionCheckContext {
  user_id: string;
  organization_id: string;
  required_permissions: string[];
}
