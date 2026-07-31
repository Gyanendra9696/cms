export interface BaseAuditFields {
  created_at: Date;
  created_by: string;
  updated_at: Date;
  updated_by: string;
  is_active: boolean;
  deleted_at: Date | null;
  version_lock: number;
}

export interface Organization extends BaseAuditFields {
  id: string;
  name: string;
  code: string;
}

export interface BusinessUnit extends BaseAuditFields {
  id: string;
  organization_id: string;
  name: string;
  code: string;
}

export interface Campus extends BaseAuditFields {
  id: string;
  business_unit_id: string;
  name: string;
  code: string;
}

export interface Building extends BaseAuditFields {
  id: string;
  campus_id: string;
  name: string;
  code: string;
}

export interface Floor extends BaseAuditFields {
  id: string;
  building_id: string;
  name: string;
  code: string;
}

export interface Location extends BaseAuditFields {
  id: string;
  floor_id: string;
  name: string;
  code: string;
}

export interface Department extends BaseAuditFields {
  id: string;
  name: string;
  code: string;
}

export interface CostCenter extends BaseAuditFields {
  id: string;
  name: string;
  code: string;
}

export interface Warehouse extends BaseAuditFields {
  id: string;
  name: string;
  code: string;
}

export interface StorageBin extends BaseAuditFields {
  id: string;
  warehouse_id: string;
  name: string;
  code: string;
}

export interface UOM extends BaseAuditFields {
  id: string;
  name: string;
  code: string;
}

export interface Vendor extends BaseAuditFields {
  id: string;
  name: string;
  code: string;
}

export interface AssetCategory extends BaseAuditFields {
  id: string;
  name: string;
  code: string;
}
