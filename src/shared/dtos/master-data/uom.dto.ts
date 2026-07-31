import { z } from 'zod';
import type { AuditFieldsDTO } from '../common/audit.dto';

export const CreateUomSchema = z.object({
  name: z.string().min(1).max(255),
  code: z.string().min(1).max(50),
});

export const UpdateUomSchema = CreateUomSchema.partial().extend({
  is_active: z.boolean().optional(),
});

export type CreateUomRequest = z.infer<typeof CreateUomSchema>;
export type UpdateUomRequest = z.infer<typeof UpdateUomSchema>;

export interface UomResponse extends AuditFieldsDTO {
  id: string;
  name: string;
  code: string;
  is_active: boolean;
  version_lock: number;
}
