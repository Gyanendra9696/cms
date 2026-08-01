import { DashboardStatCardProps } from '../types/dashboard.types';

export const dashboardStatCards: DashboardStatCardProps[] = [
  {
    title: 'Organizations',
    value: 18,
    icon: 'bi-building',
    color: 'primary',
    actionText: 'View All →',
    link: '/organization',
  },
  {
    title: 'Campuses',
    value: 56,
    icon: 'bi-geo-alt',
    color: 'success',
    actionText: 'View All →',
    link: '/campuses',
  },
  {
    title: 'Total Users',
    value: '1,248',
    icon: 'bi-people',
    color: 'purple',
    actionText: 'View All →',
    link: '/users',
  },
  {
    title: 'Active Licenses',
    value: 18,
    icon: 'bi-shield-check',
    color: 'warning',
    actionText: 'View All →',
    link: '/licenses',
  },
  {
    title: 'Pending Approvals',
    value: 234,
    icon: 'bi-clipboard-check',
    color: 'danger',
    actionText: 'View All →',
    link: '/approvals',
  },
  {
    title: 'Active Organizations',
    value: 16,
    icon: 'bi-building-check',
    color: 'info',
    actionText: 'View All →',
    link: '/organization',
  },
];
