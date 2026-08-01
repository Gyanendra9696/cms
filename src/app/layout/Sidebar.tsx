import React from 'react';
import { NavLink } from 'react-router-dom';

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: 'bi-speedometer2' },
  { name: 'Organization', path: '/organization', icon: 'bi-building' },
  { name: 'Campuses', path: '/campuses', icon: 'bi-geo-alt' },
  { name: 'Departments', path: '/departments', icon: 'bi-diagram-3' },
  { name: 'Masters', path: '/masters', icon: 'bi-database' },
  { name: 'Access Control', path: '/access-control', icon: 'bi-shield-lock' },
  { name: 'Audit Logs', path: '/audit-logs', icon: 'bi-journal-text' },
  { name: 'Security Center', path: '/security-center', icon: 'bi-shield-check' },
  { name: 'Backup & Restore', path: '/backup-restore', icon: 'bi-arrow-repeat' },
  { name: 'Settings', path: '/settings', icon: 'bi-gear' },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar d-flex flex-column flex-shrink-0 p-3 bg-dark text-white">
      <div className="fs-4 fw-bold p-2 mb-3 border-bottom border-secondary">CMS ERP</div>
      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems.map((item) => (
          <li className="nav-item" key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : 'text-white'}`
              }
            >
              <i className={`bi ${item.icon} me-2`}></i>
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};
