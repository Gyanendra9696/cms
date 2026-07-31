import { z } from 'zod';
import type { BaseEntityDTO } from '../common/base-entity.dto';

export const CreateOrganizationSchema = z.object({
  name: z.string().min(1).max(255),
  code: z.string().min(1).max(50),
});

export const UpdateOrganizationSchema = CreateOrganizationSchema.partial().extend({
  is_active: z.boolean().optional(),
});

export type CreateOrganizationRequest = z.infer<typeof CreateOrganizationSchema>;
export type UpdateOrganizationRequest = z.infer<typeof UpdateOrganizationSchema>;

export interface OrganizationResponse extends BaseEntityDTO {
  name: string;
  code: string;
}
