import React from 'react';
import { ProfileMenu } from './ProfileMenu';

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = "CMS ERP" }) => {
  return (
    <header className="navbar navbar-expand navbar-light bg-white border-bottom py-2 px-4">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">{title}</span>
        <div className="d-flex align-items-center">
          <input 
            type="search" 
            placeholder="Search..." 
            className="form-control form-control-sm me-3"
            style={{ width: '200px' }}
          />
          <button className="btn btn-link text-dark me-3 p-0">
            <i className="bi bi-bell"></i>
          </button>
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};
