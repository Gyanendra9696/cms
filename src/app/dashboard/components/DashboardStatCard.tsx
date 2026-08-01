import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardStatCardProps } from '../types/dashboard.types';
import '../dashboard.css';

const COLOR_MAP = {
  primary: 'bg-primary-subtle text-primary',
  success: 'bg-success-subtle text-success',
  warning: 'bg-warning-subtle text-warning',
  danger: 'bg-danger-subtle text-danger',
  info: 'bg-info-subtle text-info',
  purple: 'bg-purple-subtle text-purple',
};

export const DashboardStatCard: React.FC<DashboardStatCardProps> = ({
  title,
  value,
  icon,
  color,
  actionText = 'View All',
  link = '#'
}) => {
  const colorClass = COLOR_MAP[color] || 'bg-light text-secondary';

  return (
    <div className="card border-0 shadow-sm rounded-4 h-100 transition-hover">
      <div className="card-body p-4 d-flex flex-column justify-content-between">
        {/* Top Section: Icon & Value */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div
            className={`rounded-3 d-flex align-items-center justify-content-center stat-icon-box ${colorClass}`}
          >
            <i className={`bi ${icon}`}></i>
          </div>
          <span className="fs-3 fw-bold text-dark">{value}</span>
        </div>

        {/* Middle Section: Title */}
        <div>
          <h6 className="text-muted fw-medium mb-3 fs-6">{title}</h6>
        </div>

        {/* Bottom Section: Action Link */}
        <div className="pt-2 border-top border-light d-flex align-items-center justify-content-between">
          <Link
            to={link}
            className="text-decoration-none fw-semibold small text-primary d-flex align-items-center"
          >
            {actionText} <i className="bi bi-arrow-right ms-1"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};
