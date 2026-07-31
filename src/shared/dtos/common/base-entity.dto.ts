import type { AuditFieldsDTO } from './audit.dto';

export interface BaseEntityDTO extends AuditFieldsDTO {
  id: string;
  organization_id: string;
  business_unit_id?: string;
  campus_id?: string;
  is_active: boolean;
  version_lock: number;
}
