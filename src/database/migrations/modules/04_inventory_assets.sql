-- 04_inventory_assets.sql
CREATE TABLE items_catalog (
    id UUID PRIMARY KEY,
    organization_id UUID NOT NULL,
    business_unit_id UUID NOT NULL,
    campus_id UUID NOT NULL,
    item_code VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID NOT NULL,
    version_lock INTEGER DEFAULT 0
);
CREATE INDEX idx_items_catalog_tenant ON items_catalog(organization_id, business_unit_id, campus_id);
