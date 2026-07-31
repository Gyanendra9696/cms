import { type StatusEntity } from './base.entity';

export interface Organization extends StatusEntity {
  name: string;
  code: string;
}

export interface Campus extends StatusEntity {
  organization_id: string;
  name: string;
  code: string;
}

export interface Building extends StatusEntity {
  campus_id: string;
  name: string;
  code: string;
}

export interface Floor extends StatusEntity {
  building_id: string;
  name: string;
  code: string;
}

export interface Location extends StatusEntity {
  floor_id: string;
  name: string;
  code: string;
}

export interface StorageBin extends StatusEntity {
  location_id: string;
  name: string;
  code: string;
}
