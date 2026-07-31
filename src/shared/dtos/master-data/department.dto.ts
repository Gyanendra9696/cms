import { z } from 'zod';
import type { AuditFieldsDTO } from '../common/audit.dto';

export const CreateDepartmentSchema = z.object({
  name: z.string().min(1).max(255),
  code: z.string().min(1).max(50),
});

export const UpdateDepartmentSchema = CreateDepartmentSchema.partial().extend({
  is_active: z.boolean().optional(),
});

export type CreateDepartmentRequest = z.infer<typeof CreateDepartmentSchema>;
export type UpdateDepartmentRequest = z.infer<typeof UpdateDepartmentSchema>;

export interface DepartmentResponse extends AuditFieldsDTO {
  id: string;
  name: string;
  code: string;
  is_active: boolean;
  version_lock: number;
}
