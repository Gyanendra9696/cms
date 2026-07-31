import { PermissionRepository } from '../repositories/permission.repository';
import { RoleRepository } from '../repositories/role.repository';
import { UserRoleRepository } from '../repositories/user-role.repository';
import { PermissionEvaluator } from './permission.evaluator';
import { PermissionCache } from './permission.cache';
import type { UserRoleAssignment, Permission } from '../interfaces/rbac.types';

export class RbacService {
  public readonly evaluator: PermissionEvaluator;
  public readonly cache: PermissionCache;
  public readonly permissionRepo: PermissionRepository;
  public readonly roleRepo: RoleRepository;
  public readonly userRoleRepo: UserRoleRepository;

  constructor() {
    this.permissionRepo = new PermissionRepository();
    this.roleRepo = new RoleRepository();
    this.userRoleRepo = new UserRoleRepository();
    this.evaluator = new PermissionEvaluator(this.permissionRepo, this.userRoleRepo, this.roleRepo);
    this.cache = new PermissionCache();
  }

  // --- Permission Checking ---

  async checkPermission(
    userId: string,
    permissionCode: string,
    tenant: { orgId: string; buId: string; campusId: string }
  ): Promise<boolean> {
    return this.evaluator.hasPermission(userId, permissionCode, tenant);
  }

  async checkAnyPermission(
    userId: string,
    permissionCodes: string[],
    tenant: { orgId: string; buId: string; campusId: string }
  ): Promise<boolean> {
    return this.evaluator.hasAnyPermission(userId, permissionCodes, tenant);
  }

  async checkAllPermissions(
    userId: string,
    permissionCodes: string[],
    tenant: { orgId: string; buId: string; campusId: string }
  ): Promise<boolean> {
    return this.evaluator.hasAllPermissions(userId, permissionCodes, tenant);
  }

  // --- Role & Permission Management ---

  async getUserRoles(
    userId: string,
    tenant: { orgId: string; buId: string; campusId: string }
  ): Promise<UserRoleAssignment[]> {
    return this.userRoleRepo.findByUser(userId, tenant);
  }

  async getUserPermissions(
    userId: string,
    tenant: { orgId: string; buId: string; campusId: string }
  ): Promise<Permission[]> {
    const roles = await this.getUserRoles(userId, tenant);
    const permissions: Permission[] = [];
    
    for (const role of roles) {
      const rolePermissions = await this.permissionRepo.findByRole(role.role_id, tenant);
      permissions.push(...rolePermissions);
    }
    
    // Return unique permissions
    return Array.from(new Map(permissions.map(p => [p.id, p])).values());
  }

  async assignRoleToUser(
    userId: string,
    roleId: string,
    tenant: { orgId: string; buId: string; campusId: string },
    actorId: string
  ): Promise<UserRoleAssignment> {
    return this.userRoleRepo.assignRole(userId, roleId, tenant, actorId);
  }

  async removeRoleFromUser(
    userId: string,
    roleId: string,
    tenant: { orgId: string; buId: string; campusId: string }
  ): Promise<void> {
    return this.userRoleRepo.removeRole(userId, roleId, tenant);
  }
}
