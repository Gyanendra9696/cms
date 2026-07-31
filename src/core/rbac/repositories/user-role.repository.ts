import { BaseRepository } from '../../repositories/base.repository';
import type { UserRoleAssignment } from '../interfaces/rbac.types';
import { pool } from '../../database/pool';

export class UserRoleRepository extends BaseRepository<UserRoleAssignment> {
  protected entityName = 'user_role_assignments';

  async findByUser(userId: string, tenant: { orgId: string; buId: string; campusId: string }): Promise<UserRoleAssignment[]> {
    const filter = this.getTenantFilter(tenant, 1);
    const query = `SELECT * FROM ${this.entityName} WHERE user_id = $4 AND ${filter.query}`;
    const { rows } = await pool.query(query, [userId, ...filter.values]);
    return rows as UserRoleAssignment[];
  }

  async assignRole(userId: string, roleId: string, tenant: { orgId: string; buId: string; campusId: string }, actorId: string): Promise<UserRoleAssignment> {
    const query = `
      INSERT INTO ${this.entityName} (user_id, role_id, organization_id, business_unit_id, campus_id, created_at, created_by, updated_at, updated_by, version_lock)
      VALUES ($1, $2, $3, $4, $5, NOW(), $6, NOW(), $6, 0)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [userId, roleId, tenant.orgId, tenant.buId, tenant.campusId, actorId]);
    return rows[0] as UserRoleAssignment;
  }

  async removeRole(userId: string, roleId: string, tenant: { orgId: string; buId: string; campusId: string }): Promise<void> {
    const filter = this.getTenantFilter(tenant, 2);
    const query = `DELETE FROM ${this.entityName} WHERE user_id = $1 AND role_id = $2 AND ${filter.query}`;
    await pool.query(query, [userId, roleId, ...filter.values]);
  }
}
