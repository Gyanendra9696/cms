import React from 'react';
import { DashboardHeader } from './components/DashboardHeader';
import { DashboardStatCard } from './components/DashboardStatCard';
import { dashboardStatCards } from './data/dashboard.data';

export const PlatformRootAdminDashboard: React.FC = () => {
  return (
    <div className="container-fluid py-4 px-3 px-md-4 bg-light min-vh-100">
      <DashboardHeader 
        title="Welcome back, Super Admin!"
        subtitle="Platform overview across all organizations."
        userName="Super Admin"
        roleName="Platform Root Admin"
        avatarInitials="SA"
      />

      <div className="row g-4">
        {dashboardStatCards.map((card, index) => (
          <div key={index} className="col-12 col-md-4 col-lg-2">
            <DashboardStatCard {...card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformRootAdminDashboard;
