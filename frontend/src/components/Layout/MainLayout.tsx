import React, { ReactNode } from 'react';
import Header from '../Header/Header';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;