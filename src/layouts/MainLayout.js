import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
  const location = useLocation();
  // Extract the role from the URL path (e.g., /company/... -> company)
  const role = location.pathname.split('/')[1];

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar role={role} />
      <main style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
