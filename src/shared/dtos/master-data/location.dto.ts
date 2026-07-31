import { z } from 'zod';
import type { AuditFieldsDTO } from '../common/audit.dto';

export const CreateLocationSchema = z.object({
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  floor_id: z.string().uuid(),
  name: z.string().min(1).max(255),
  code: z.string().min(1).max(50),
});

export const UpdateLocationSchema = CreateLocationSchema.partial().extend({
  is_active: z.boolean().optional(),
});

export type CreateLocationRequest = z.infer<typeof CreateLocationSchema>;
export type UpdateLocationRequest = z.infer<typeof UpdateLocationSchema>;

export interface LocationResponse extends AuditFieldsDTO {
  id: string;
  floor_id: string;
  name: string;
  code: string;
  is_active: boolean;
  version_lock: number;
}
