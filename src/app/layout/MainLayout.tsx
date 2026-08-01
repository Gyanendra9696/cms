import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Breadcrumb } from './Breadcrumb';
import { Footer } from './Footer';

export const MainLayout: React.FC = () => {
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <Sidebar />
      <div className="d-flex flex-column flex-grow-1">
        <Header />
        <main className="flex-grow-1 p-4 bg-light overflow-auto">
          <Breadcrumb />
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};
