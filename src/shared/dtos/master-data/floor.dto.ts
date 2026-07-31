import { z } from 'zod';
import type { AuditFieldsDTO } from '../common/audit.dto';

export const CreateFloorSchema = z.object({
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  building_id: z.string().uuid(),
  name: z.string().min(1).max(255),
  code: z.string().min(1).max(50),
});

export const UpdateFloorSchema = CreateFloorSchema.partial().extend({
  is_active: z.boolean().optional(),
});

export type CreateFloorRequest = z.infer<typeof CreateFloorSchema>;
export type UpdateFloorRequest = z.infer<typeof UpdateFloorSchema>;

export interface FloorResponse extends AuditFieldsDTO {
  id: string;
  building_id: string;
  name: string;
  code: string;
  is_active: boolean;
  version_lock: number;
}
