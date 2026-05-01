import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  return (
    <div className="flex h-screen bg-cf-bg overflow-hidden text-cf-text">
      {/* Fixed Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        
        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8 bg-cf-bg relative">
          {/* Decorative ambient blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cf-blue/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cf-accent/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
          
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
