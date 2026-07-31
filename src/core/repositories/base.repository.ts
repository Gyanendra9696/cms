import { pool } from '../database/pool';
import type { AuditEntity, TenantEntity } from '../database/base.entity';

export abstract class BaseRepository<T extends TenantEntity> {
  protected abstract entityName: string;

  protected getTenantFilter(tenant: { orgId: string; buId: string; campusId: string }, offset: number = 0) {
    const p1 = (offset + 1).toString();
    const p2 = (offset + 2).toString();
    const p3 = (offset + 3).toString();
    return {
      query: `organization_id = $${p1} AND business_unit_id = $${p2} AND campus_id = $${p3}`,
      values: [tenant.orgId, tenant.buId, tenant.campusId],
    };
  }

  async findById(id: string, tenant: { orgId: string; buId: string; campusId: string }): Promise<T | null> {
    const filter = this.getTenantFilter(tenant, 1);
    const query = `SELECT * FROM ${this.entityName} WHERE id = $4 AND ${filter.query} AND deleted_at IS NULL`;
    const { rows } = await pool.query(query, [id, ...filter.values]);
    const entity = rows[0] as T | undefined;
    return entity ?? null;
  }

  async findAll(tenant: { orgId: string; buId: string; campusId: string }): Promise<T[]> {
    const filter = this.getTenantFilter(tenant, 0);
    const query = `SELECT * FROM ${this.entityName} WHERE ${filter.query} AND deleted_at IS NULL`;
    const { rows } = await pool.query(query, filter.values);
    return rows as T[];
  }

  async create(data: Omit<T, keyof AuditEntity>, tenant: { orgId: string; buId: string; campusId: string }, userId: string): Promise<T> {
    const keys = Object.keys(data);
    const values = Object.values(data) as unknown[];
    
    // Use manual indexing to satisfy linting
    const dataPlaceholders = keys.map((key, i) => { void key; return '$' + (i + 1).toString(); }).join(', ');
    const tenantOffset = keys.length;
    const q1 = (tenantOffset + 1).toString();
    const q2 = (tenantOffset + 2).toString();
    const q3 = (tenantOffset + 3).toString();
    const q4 = (tenantOffset + 4).toString();
    
    const query = `
      INSERT INTO ${this.entityName} (${keys.join(', ')}, organization_id, business_unit_id, campus_id, created_at, created_by, updated_at, updated_by, version_lock)
      VALUES (${dataPlaceholders}, $${q1}, $${q2}, $${q3}, NOW(), $${q4}, NOW(), $${q4}, 0)
      RETURNING *;
    `;
    const params: unknown[] = [...values, tenant.orgId, tenant.buId, tenant.campusId, userId];
    const { rows } = await pool.query(query, params);
    return rows[0] as T;
  }

  async update(id: string, data: Partial<T>, tenant: { orgId: string; buId: string; campusId: string }, userId: string, currentVersion: number): Promise<T> {
    const keys = Object.keys(data);
    const values = Object.values(data) as unknown[];
    
    // Set clause: $1..n (data values)
    const setClause = keys.map((key, i) => `${key} = $` + (i + 1).toString()).join(', ');
    
    // Filter: userId($n+1), id($n+2), currentVersion($n+3), tenant($n+4..n+6)
    const n = keys.length;
    const filter = this.getTenantFilter(tenant, n + 3);
    
    const qUserId = (n + 1).toString();
    const qId = (n + 2).toString();
    const qVersion = (n + 3).toString();
    
    const query = `
      UPDATE ${this.entityName}
      SET ${setClause}, updated_at = NOW(), updated_by = $${qUserId}, version_lock = version_lock + 1
      WHERE id = $${qId} AND version_lock = $${qVersion} AND ${filter.query}
      RETURNING *;
    `;
    const params: unknown[] = [...values, userId, id, currentVersion, ...filter.values];
    const { rows } = await pool.query(query, params);
    
    if (rows.length === 0) {
      throw new Error('Update failed: Concurrency conflict or record not found.');
    }
    return rows[0] as T;
  }

  async softDelete(id: string, tenant: { orgId: string; buId: string; campusId: string }, userId: string): Promise<void> {
    const filter = this.getTenantFilter(tenant, 2);
    const query = `
      UPDATE ${this.entityName}
      SET is_active = FALSE, deleted_at = NOW(), deleted_by = $1, updated_at = NOW(), updated_by = $1
      WHERE id = $2 AND ${filter.query}
    `;
    const result = await pool.query(query, [userId, id, ...filter.values]);
    if (result.rowCount === 0) {
        throw new Error('Delete failed: Record not found');
    }
  }
}
