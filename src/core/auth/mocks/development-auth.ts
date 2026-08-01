export interface MockUser {
  loginId: string;
  password: string;
  roleCode: string;
  roleName: string;
  dashboardRoute: string;
  email: string;
  tenantId: string;
}

// Temporary development users.
// Replace with backend authentication after API integration.
const MOCK_USERS: MockUser[] = [
  { loginId: 'rootadmin', password: 'Admin@123', roleCode: 'PLATFORM_ROOT_ADMIN', roleName: 'Platform Root Admin', dashboardRoute: '/dashboard', email: 'rootadmin@example.com', tenantId: 'tenant1' },
  { loginId: 'sysadmin', password: 'Admin@123', roleCode: 'SYSTEM_ADMINISTRATOR', roleName: 'System Administrator', dashboardRoute: '/dashboard', email: 'sysadmin@example.com', tenantId: 'tenant1' },
  { loginId: 'orgadmin', password: 'Admin@123', roleCode: 'ORGANIZATION_ADMIN', roleName: 'Organization Administrator', dashboardRoute: '/dashboard', email: 'orgadmin@example.com', tenantId: 'tenant1' },
  { loginId: 'campusadmin', password: 'Admin@123', roleCode: 'CAMPUS_ADMIN', roleName: 'Campus Administrator', dashboardRoute: '/dashboard', email: 'campusadmin@example.com', tenantId: 'tenant1' },
  { loginId: 'je', password: 'Admin@123', roleCode: 'JUNIOR_ENGINEER', roleName: 'Junior Engineer', dashboardRoute: '/dashboard', email: 'je@example.com', tenantId: 'tenant1' },
  { loginId: 'storekeeper', password: 'Admin@123', roleCode: 'STORE_KEEPER', roleName: 'Store Keeper', dashboardRoute: '/dashboard', email: 'storekeeper@example.com', tenantId: 'tenant1' },
  { loginId: 'technician', password: 'Admin@123', roleCode: 'TECHNICIAN', roleName: 'Technician', dashboardRoute: '/dashboard', email: 'technician@example.com', tenantId: 'tenant1' },
];

export const authenticateDevelopmentUser = (identifier: string, password: string): MockUser | null => {
  return MOCK_USERS.find(u => u.loginId === identifier && u.password === password) || null;
};
