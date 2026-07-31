import type { Permission } from '../interfaces/rbac.types';

export class PermissionCache {
  private cache: Map<string, Permission[]> = new Map();

  private getCacheKey(userId: string, tenant: { orgId: string; buId: string; campusId: string }): string {
    return `${tenant.orgId}:${tenant.buId}:${tenant.campusId}:${userId}`;
  }

  get(userId: string, tenant: { orgId: string; buId: string; campusId: string }): Permission[] | undefined {
    return this.cache.get(this.getCacheKey(userId, tenant));
  }

  set(userId: string, tenant: { orgId: string; buId: string; campusId: string }, permissions: Permission[]): void {
    this.cache.set(this.getCacheKey(userId, tenant), permissions);
  }

  clear(userId: string, tenant: { orgId: string; buId: string; campusId: string }): void {
    this.cache.delete(this.getCacheKey(userId, tenant));
  }
}
