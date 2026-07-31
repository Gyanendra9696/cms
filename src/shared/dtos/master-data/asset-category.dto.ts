import { z } from 'zod';
import type { AuditFieldsDTO } from '../common/audit.dto';

export const CreateAssetCategorySchema = z.object({
  name: z.string().min(1).max(255),
  code: z.string().min(1).max(50),
});

export const UpdateAssetCategorySchema = CreateAssetCategorySchema.partial().extend({
  is_active: z.boolean().optional(),
});

export type CreateAssetCategoryRequest = z.infer<typeof CreateAssetCategorySchema>;
export type UpdateAssetCategoryRequest = z.infer<typeof UpdateAssetCategorySchema>;

export interface AssetCategoryResponse extends AuditFieldsDTO {
  id: string;
  name: string;
  code: string;
  is_active: boolean;
  version_lock: number;
}
