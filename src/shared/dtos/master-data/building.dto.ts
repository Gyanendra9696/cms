import { z } from 'zod';
import type { AuditFieldsDTO } from '../common/audit.dto';

export const CreateBuildingSchema = z.object({
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  campus_id: z.string().uuid(),
  name: z.string().min(1).max(255),
  code: z.string().min(1).max(50),
});

export const UpdateBuildingSchema = CreateBuildingSchema.partial().extend({
  is_active: z.boolean().optional(),
});

export type CreateBuildingRequest = z.infer<typeof CreateBuildingSchema>;
export type UpdateBuildingRequest = z.infer<typeof UpdateBuildingSchema>;

export interface BuildingResponse extends AuditFieldsDTO {
  id: string;
  campus_id: string;
  name: string;
  code: string;
  is_active: boolean;
  version_lock: number;
}
