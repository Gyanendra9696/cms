export interface BaseEntity {
  id: string;
}

export interface AuditEntity extends BaseEntity {
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  version_lock: number;
}

export interface TenantEntity extends AuditEntity {
  organization_id: string;
  business_unit_id: string;
  campus_id: string;
}

export interface StatusEntity extends TenantEntity {
  is_active: boolean;
  deleted_at: string | null;
}
