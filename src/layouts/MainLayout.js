import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Start each newly visited page at the top (footer links used to leave you mid-page).
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

const MainLayout = ({ children }) => {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
