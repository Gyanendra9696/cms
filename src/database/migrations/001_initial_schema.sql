-- Phase 5.13 Enterprise Schema Foundation
-- Naming: snake_case
-- PK: UUID v7

CREATE TABLE organizations (
    id UUID PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID NOT NULL,
    version_lock INTEGER DEFAULT 0
);

CREATE TABLE business_units (
    id UUID PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES organizations(id),
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID NOT NULL,
    version_lock INTEGER DEFAULT 0,
    UNIQUE(organization_id, code)
);

CREATE INDEX idx_business_units_tenant ON business_units(organization_id);
