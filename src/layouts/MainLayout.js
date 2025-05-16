import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
  const location = useLocation();
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
