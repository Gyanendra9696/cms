import { BaseRepository } from '../../repositories/base.repository';
import type { Permission } from '../interfaces/rbac.types';
import { pool } from '../../database/pool';

export class PermissionRepository extends BaseRepository<Permission> {
  protected entityName = 'permissions';

  async findByCode(code: string, tenant: { orgId: string; buId: string; campusId: string }): Promise<Permission | null> {
    const filter = this.getTenantFilter(tenant, 1);
    const query = `SELECT * FROM ${this.entityName} WHERE code = $4 AND ${filter.query} AND is_active = TRUE`;
    const { rows } = await pool.query(query, [code, ...filter.values]);
    return (rows[0] as Permission | undefined) ?? null;
  }

  async findByModule(module: string, tenant: { orgId: string; buId: string; campusId: string }): Promise<Permission[]> {
    const filter = this.getTenantFilter(tenant, 1);
    const query = `SELECT * FROM ${this.entityName} WHERE module = $4 AND ${filter.query} AND is_active = TRUE`;
    const { rows } = await pool.query(query, [module, ...filter.values]);
    return rows as Permission[];
  }

  async findByRole(roleId: string, tenant: { orgId: string; buId: string; campusId: string }): Promise<Permission[]> {
    const filter = this.getTenantFilter(tenant, 1);
    const query = `
      SELECT p.* FROM ${this.entityName} p
      JOIN role_permissions rp ON p.id = rp.permission_id
      WHERE rp.role_id = $4 AND ${filter.query} AND p.is_active = TRUE
    `;
    const { rows } = await pool.query(query, [roleId, ...filter.values]);
    return rows as Permission[];
  }
}
