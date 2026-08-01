export interface DashboardStatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
  actionText?: string;
  link?: string;
}

export interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  userName?: string;
  roleName?: string;
  avatarInitials?: string;
}
