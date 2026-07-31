import { z } from 'zod';
import type { AuditFieldsDTO } from '../common/audit.dto';

export const CreateCostCenterSchema = z.object({
  name: z.string().min(1).max(255),
  code: z.string().min(1).max(50),
});

export const UpdateCostCenterSchema = CreateCostCenterSchema.partial().extend({
  is_active: z.boolean().optional(),
});

export type CreateCostCenterRequest = z.infer<typeof CreateCostCenterSchema>;
export type UpdateCostCenterRequest = z.infer<typeof UpdateCostCenterSchema>;

export interface CostCenterResponse extends AuditFieldsDTO {
  id: string;
  name: string;
  code: string;
  is_active: boolean;
  version_lock: number;
}
