import type { BaseAuditFields } from '@shared/types/master-data';

export interface MasterDataService<T extends BaseAuditFields> {
  findById: (id: string) => Promise<T | null>;
  create: (data: Omit<T, keyof BaseAuditFields>) => Promise<T>;
  update: (id: string, data: Partial<Omit<T, keyof BaseAuditFields>>) => Promise<T>;
  softDelete: (id: string) => Promise<void>;
  toggleStatus: (id: string, isActive: boolean) => Promise<T>;
}
