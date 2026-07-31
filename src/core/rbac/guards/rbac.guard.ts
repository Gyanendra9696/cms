import 'reflect-metadata';
import type { RbacService } from '../services/rbac.service';
import { REQUIRED_PERMISSIONS_KEY } from '../decorators/require-permission.decorator';
import type { TenantContext } from '../interfaces/middleware.types';

export class RbacGuard {
  constructor(private rbacService: RbacService) {}

  /**
   * Validates permissions for a target handler.
   * @param target The class or method handler
   * @param userId The ID of the user
   * @param tenant The tenant context
   */
  async canActivate(
    target: object,
    userId: string,
    tenant: TenantContext
  ): Promise<boolean> {
    const requiredPermissions = Reflect.getMetadata(
      REQUIRED_PERMISSIONS_KEY,
      target
    ) as string[] | undefined;

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true; // No permissions required, allow access
    }

    // Map Middleware tenant to RbacService format
    const tenantContext = {
      orgId: tenant.organizationId,
      buId: tenant.businessUnitId ?? '',
      campusId: tenant.campusId ?? '',
    };

    return this.rbacService.checkAllPermissions(
      userId,
      requiredPermissions,
      tenantContext
    );
  }
}
