import React from 'react';
import { Link } from 'react-router-dom';

export const ProfileMenu: React.FC = () => {
  return (
    <div className="dropdown">
      <button 
        className="btn btn-secondary dropdown-toggle" 
        type="button" 
        data-bs-toggle="dropdown" 
        aria-expanded="false"
      >
        User
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li><Link className="dropdown-item" to="#">Profile</Link></li>
        <li><Link className="dropdown-item" to="#">Change Password</Link></li>
        <li><hr className="dropdown-divider" /></li>
        <li><Link className="dropdown-item text-danger" to="/login">Logout</Link></li>
      </ul>
    </div>
  );
};
