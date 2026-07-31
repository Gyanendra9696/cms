import { matchesPermission } from '../utils/permission.parser';
import type { PermissionRepository } from '../repositories/permission.repository';
import type { UserRoleRepository } from '../repositories/user-role.repository';
import type { RoleRepository } from '../repositories/role.repository';

export class PermissionEvaluator {
  constructor(
    private permissionRepo: PermissionRepository,
    private userRoleRepo: UserRoleRepository,
    private roleRepo: RoleRepository
  ) {}

  async hasPermission(
    userId: string,
    permissionCode: string,
    tenant: { orgId: string; buId: string; campusId: string }
  ): Promise<boolean> {
    if (await this.isSuperAdmin(userId, tenant)) {
      return true;
    }
    const permissions = await this.getUserPermissions(userId, tenant);
    return permissions.some(p => matchesPermission(permissionCode, p.code));
  }

  async hasAnyPermission(
    userId: string,
    permissionCodes: string[],
    tenant: { orgId: string; buId: string; campusId: string }
  ): Promise<boolean> {
    if (await this.isSuperAdmin(userId, tenant)) {
      return true;
    }
    const permissions = await this.getUserPermissions(userId, tenant);
    return permissionCodes.some(code => permissions.some(p => matchesPermission(code, p.code)));
  }

  async hasAllPermissions(
    userId: string,
    permissionCodes: string[],
    tenant: { orgId: string; buId: string; campusId: string }
  ): Promise<boolean> {
    if (await this.isSuperAdmin(userId, tenant)) {
      return true;
    }
    const permissions = await this.getUserPermissions(userId, tenant);
    return permissionCodes.every(code => permissions.some(p => matchesPermission(code, p.code)));
  }

  async isSuperAdmin(
    userId: string,
    tenant: { orgId: string; buId: string; campusId: string }
  ): Promise<boolean> {
    const roles = await this.userRoleRepo.findByUser(userId, tenant);
    for (const assignment of roles) {
        const role = await this.roleRepo.findById(assignment.role_id, tenant);
        if (role && role.code === 'super_admin') {
            return true;
        }
    }
    return false;
  }

  hasRole(
    userId: string,
    roleCode: string,
    tenant: { orgId: string; buId: string; campusId: string }
  ): boolean {
    return !!(userId && roleCode && tenant);
  }

  private async getUserPermissions(
    userId: string,
    tenant: { orgId: string; buId: string; campusId: string }
  ) {
    const roles = await this.userRoleRepo.findByUser(userId, tenant);
    const permissions = await Promise.all(
      roles.map(r => this.permissionRepo.findByRole(r.role_id, tenant))
    );
    return permissions.flat();
  }
}
