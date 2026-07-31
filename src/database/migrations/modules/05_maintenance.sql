-- 05_maintenance.sql
CREATE TABLE work_orders (
    id UUID PRIMARY KEY,
    organization_id UUID NOT NULL,
    business_unit_id UUID NOT NULL,
    campus_id UUID NOT NULL,
    wo_number VARCHAR(100) NOT NULL,
    description TEXT,
    status VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID NOT NULL,
    version_lock INTEGER DEFAULT 0
);
CREATE INDEX idx_work_orders_tenant ON work_orders(organization_id, business_unit_id, campus_id);
