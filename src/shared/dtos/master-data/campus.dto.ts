import { z } from 'zod';
import type { AuditFieldsDTO } from '../common/audit.dto';

export const CreateCampusSchema = z.object({
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  business_unit_id: z.string().uuid(),
  name: z.string().min(1).max(255),
  code: z.string().min(1).max(50),
});

export const UpdateCampusSchema = CreateCampusSchema.partial().extend({
  is_active: z.boolean().optional(),
});

export type CreateCampusRequest = z.infer<typeof CreateCampusSchema>;
export type UpdateCampusRequest = z.infer<typeof UpdateCampusSchema>;

export interface CampusResponse extends AuditFieldsDTO {
  id: string;
  business_unit_id: string;
  name: string;
  code: string;
  is_active: boolean;
  version_lock: number;
}
