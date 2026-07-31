export interface BaseEntity {
  id: string;
}

export interface AuditEntity extends BaseEntity {
  created_at: Date;
  created_by: string;
  updated_at: Date;
  updated_by: string;
  version_lock: number;
}

export interface StatusEntity extends AuditEntity {
  is_active: boolean;
  deleted_at: Date | null;
}

export interface TenantEntity extends AuditEntity {
  organization_id: string;
}

export interface CodeNameEntity extends BaseEntity {
  code: string;
  name: string;
}
