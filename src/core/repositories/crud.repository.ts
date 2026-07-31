import type { BaseRepository } from './base.repository';
import type { TenantEntity } from '../database/base.entity';

export interface CrudRepository<T extends TenantEntity> extends BaseRepository<T> {
  findById(id: string): Promise<T | null>;
  create(data: unknown): Promise<T>;
}
