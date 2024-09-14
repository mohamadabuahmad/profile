import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="p-4">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
