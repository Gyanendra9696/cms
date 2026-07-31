import { z } from 'zod';
import type { AuditFieldsDTO } from '../common/audit.dto';

export const CreateAssetSubCategorySchema = z.object({
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  asset_category_id: z.string().uuid(),
  name: z.string().min(1).max(255),
  code: z.string().min(1).max(50),
});

export const UpdateAssetSubCategorySchema = CreateAssetSubCategorySchema.partial().extend({
  is_active: z.boolean().optional(),
});

export type CreateAssetSubCategoryRequest = z.infer<typeof CreateAssetSubCategorySchema>;
export type UpdateAssetSubCategoryRequest = z.infer<typeof UpdateAssetSubCategorySchema>;

export interface AssetSubCategoryResponse extends AuditFieldsDTO {
  id: string;
  asset_category_id: string;
  name: string;
  code: string;
  is_active: boolean;
  version_lock: number;
}
