import type { BaseRepository } from './base.repository';
import type { TenantEntity } from '../database/base.entity';

export interface SearchRepository<T extends TenantEntity> extends BaseRepository<T> {
  search(query: unknown): Promise<T[]>;
}
