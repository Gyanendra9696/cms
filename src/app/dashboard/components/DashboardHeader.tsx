import React from 'react';
import { DashboardHeaderProps } from '../types/dashboard.types';
import { formatCurrentDate } from '../utils/date';
import '../dashboard.css';

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title = "Welcome back!",
  subtitle = "Platform overview.",
  userName = "User",
  roleName = "Admin",
  avatarInitials = "U"
}) => {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center bg-white p-4 rounded-4 shadow-sm mb-4 gap-3">
      <div>
        <h1 className="h3 fw-bold text-dark mb-1">
          {title} 👋
        </h1>
        <p className="text-muted mb-0">
          {subtitle}
        </p>
      </div>

      <div className="d-flex align-items-center flex-wrap gap-3">
        <div className="input-group dashboard-search">
          <span className="input-group-text bg-light border-end-0">
            <i className="bi bi-search text-muted"></i>
          </span>
          <input
            type="search"
            className="form-control bg-light border-start-0 ps-0"
            placeholder="Search anything..."
            aria-label="Search"
          />
        </div>

        <button
          type="button"
          className="btn btn-light position-relative rounded-circle p-2 d-flex align-items-center justify-content-center notification-button"
          aria-label="Notifications"
        >
          <i className="bi bi-bell fs-5 text-secondary"></i>
          <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
            <span className="visually-hidden">New alerts</span>
          </span>
        </button>

        <div className="d-none d-lg-flex align-items-center text-muted small bg-light px-3 py-2 rounded-3">
          <i className="bi bi-calendar-event me-2"></i>
          <span>{formatCurrentDate()}</span>
        </div>

        <div className="d-flex align-items-center gap-2 ps-2 border-start">
          <div
            className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold dashboard-avatar"
          >
            {avatarInitials}
          </div>
          <div className="d-none d-sm-block text-start">
            <h6 className="mb-0 fw-semibold text-dark fs-6">{userName}</h6>
            <small className="text-muted" style={{ fontSize: '11px' }}>{roleName}</small>
          </div>
        </div>
      </div>
    </div>
  );
};
