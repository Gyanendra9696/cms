import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthFrontendService } from '../../core/auth/services/auth-frontend.service';
import { PlatformRootAdminDashboard } from '../dashboard/PlatformRootAdminDashboard';
import { TechnicianDashboard } from '../dashboard/TechnicianDashboard';
import { PlaceholderPage } from '../common/PlaceholderPage';

const authService = new AuthFrontendService();

export const RoleDashboardResolver: React.FC = () => {
  const user = authService.getCurrentUser();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // user.roles[0] stores the roleCode
  const roleCode = user.roles[0];

  switch (roleCode) {
    case 'PLATFORM_ROOT_ADMIN':
      return <PlatformRootAdminDashboard />;
    case 'TECHNICIAN':
      return <TechnicianDashboard />;
    case 'SYSTEM_ADMINISTRATOR':
    case 'ORGANIZATION_ADMIN':
    case 'CAMPUS_ADMIN':
    case 'STORE_KEEPER':
    case 'JUNIOR_ENGINEER':
      return <PlaceholderPage title={roleCode} />;
    default:
      return <Navigate to="/login" replace />;
  }
};
