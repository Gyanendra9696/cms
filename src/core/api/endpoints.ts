export const ACTIONS = {
  SEARCH: 'search',
  BULK_DELETE: 'bulk-delete',
  ACTIVATE: 'activate',
  DEACTIVATE: 'deactivate',
  EXPORT: 'export',
  IMPORT: 'import',
} as const;

export type MasterDataAction = typeof ACTIONS[keyof typeof ACTIONS];

export const ENDPOINTS = {
  MASTER_DATA: {
    ORGANIZATIONS: '/api/v1/organizations',
    BUSINESS_UNITS: '/api/v1/business-units',
    CAMPUSES: '/api/v1/campuses',
    BUILDINGS: '/api/v1/buildings',
    FLOORS: '/api/v1/floors',
    LOCATIONS: '/api/v1/locations',
    WAREHOUSES: '/api/v1/warehouses',
    STORAGE_BINS: '/api/v1/storage-bins',
    DEPARTMENTS: '/api/v1/departments',
    COST_CENTERS: '/api/v1/cost-centers',
    UOMS: '/api/v1/uoms',
    VENDORS: '/api/v1/vendors',
    MANUFACTURERS: '/api/v1/manufacturers',
    BRANDS: '/api/v1/brands',
    ASSET_CATEGORIES: '/api/v1/asset-categories',
    ASSET_SUB_CATEGORIES: '/api/v1/asset-sub-categories',
    ASSET_GROUPS: '/api/v1/asset-groups',
  },
} as const;
