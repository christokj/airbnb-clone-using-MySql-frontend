import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

function Layout() {
  return (
    <div className='py-4 px-8 flex flex-col min-h-screen'>
      <Header />
            <div className="min-h-96">
                <Outlet />
            </div>

    </div>
  );
}

export default Layout;