import { z } from 'zod';
import type { BaseEntityDTO } from '../common/base-entity.dto';

export const CreateWarehouseSchema = z.object({
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  organization_id: z.string().uuid(),
  name: z.string().min(1).max(255),
  code: z.string().min(1).max(50),
});

export const UpdateWarehouseSchema = CreateWarehouseSchema.partial().extend({
  is_active: z.boolean().optional(),
});

export type CreateWarehouseRequest = z.infer<typeof CreateWarehouseSchema>;
export type UpdateWarehouseRequest = z.infer<typeof UpdateWarehouseSchema>;

export interface WarehouseResponse extends BaseEntityDTO {
  organization_id: string;
  name: string;
  code: string;
}
