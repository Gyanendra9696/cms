import { z } from 'zod';
import type { AuditFieldsDTO } from '../common/audit.dto';

export const CreateVendorSchema = z.object({
  name: z.string().min(1).max(255),
  code: z.string().min(1).max(50),
});

export const UpdateVendorSchema = CreateVendorSchema.partial().extend({
  is_active: z.boolean().optional(),
});

export type CreateVendorRequest = z.infer<typeof CreateVendorSchema>;
export type UpdateVendorRequest = z.infer<typeof UpdateVendorSchema>;

export interface VendorResponse extends AuditFieldsDTO {
  id: string;
  name: string;
  code: string;
  is_active: boolean;
  version_lock: number;
}
