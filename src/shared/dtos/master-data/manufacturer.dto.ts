import { z } from 'zod';
import type { AuditFieldsDTO } from '../common/audit.dto';

export const CreateManufacturerSchema = z.object({
  name: z.string().min(1).max(255),
  code: z.string().min(1).max(50),
});

export const UpdateManufacturerSchema = CreateManufacturerSchema.partial().extend({
  is_active: z.boolean().optional(),
});

export type CreateManufacturerRequest = z.infer<typeof CreateManufacturerSchema>;
export type UpdateManufacturerRequest = z.infer<typeof UpdateManufacturerSchema>;

export interface ManufacturerResponse extends AuditFieldsDTO {
  id: string;
  name: string;
  code: string;
  is_active: boolean;
  version_lock: number;
}
