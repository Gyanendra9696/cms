import { z } from 'zod';
import type { AuditFieldsDTO } from '../common/audit.dto';

export const CreateBusinessUnitSchema = z.object({
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  organization_id: z.string().uuid(),
  name: z.string().min(1).max(255),
  code: z.string().min(1).max(50),
});

export const UpdateBusinessUnitSchema = CreateBusinessUnitSchema.partial().extend({
  is_active: z.boolean().optional(),
});

export type CreateBusinessUnitRequest = z.infer<typeof CreateBusinessUnitSchema>;
export type UpdateBusinessUnitRequest = z.infer<typeof UpdateBusinessUnitSchema>;

export interface BusinessUnitResponse extends AuditFieldsDTO {
  id: string;
  organization_id: string;
  name: string;
  code: string;
  is_active: boolean;
  version_lock: number;
}
