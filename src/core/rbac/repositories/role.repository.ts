import { BaseRepository } from '../../repositories/base.repository';
import type { Role } from '../interfaces/rbac.types';
import { pool } from '../../database/pool';

export class RoleRepository extends BaseRepository<Role> {
  protected entityName = 'roles';

  async findByTenant(tenant: { orgId: string; buId: string; campusId: string }): Promise<Role[]> {
    return this.findAll(tenant);
  }

  async findByCode(code: string, tenant: { orgId: string; buId: string; campusId: string }): Promise<Role | null> {
    const filter = this.getTenantFilter(tenant, 1);
    const query = `SELECT * FROM ${this.entityName} WHERE code = $4 AND ${filter.query} AND is_active = TRUE`;
    const { rows } = await pool.query(query, [code, ...filter.values]);
    return (rows[0] as Role | undefined) ?? null;
  }
}
