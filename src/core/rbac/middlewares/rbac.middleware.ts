import type { RbacService } from '../services/rbac.service';
import type { MiddlewareRequest, MiddlewareResponse } from '../interfaces/middleware.types';

export class RbacMiddleware {
  constructor(private rbacService: RbacService) {}

  /**
   * Higher-order handler for RBAC check.
   * @param permissionCode The required permission code (e.g., 'resource:action')
   */
  public check(permissionCode: string) {
    return async (
      req: MiddlewareRequest,
      res: MiddlewareResponse
    ): Promise<MiddlewareResponse> => {
      void res;
      // 1. Validate Authentication and Tenant Context
      if (!req.user.id || !req.tenant.organizationId) {
        return {
          status: 401,
          error: { code: 'UNAUTHORIZED', message: 'Authentication or tenant context missing' },
        };
      }

      // 2. Perform RBAC Check
      // Map MiddlewareRequest.tenant to RbacService expected format
      const tenantContext = {
        orgId: req.tenant.organizationId,
        buId: req.tenant.businessUnitId ?? '',
        campusId: req.tenant.campusId ?? '',
      };

      const hasPermission = await this.rbacService.checkPermission(
        req.user.id,
        permissionCode,
        tenantContext
      );

      if (!hasPermission) {
        return {
          status: 403,
          error: { code: 'FORBIDDEN', message: 'Insufficient permissions' },
        };
      }

      // 3. Authorized
      return { status: 200 };
    };
  }
}
