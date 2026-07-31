import { z } from 'zod';
import type { AuditFieldsDTO } from '../common/audit.dto';

export const CreateStorageBinSchema = z.object({
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  warehouse_id: z.string().uuid(),
  name: z.string().min(1).max(255),
  code: z.string().min(1).max(50),
});

export const UpdateStorageBinSchema = CreateStorageBinSchema.partial().extend({
  is_active: z.boolean().optional(),
});

export type CreateStorageBinRequest = z.infer<typeof CreateStorageBinSchema>;
export type UpdateStorageBinRequest = z.infer<typeof UpdateStorageBinSchema>;

export interface StorageBinResponse extends AuditFieldsDTO {
  id: string;
  warehouse_id: string;
  name: string;
  code: string;
  is_active: boolean;
  version_lock: number;
}
