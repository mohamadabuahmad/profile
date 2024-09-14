import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../App';  // Import the useTheme hook
import { FaSun, FaMoon } from 'react-icons/fa';  // Import sun and moon icons
import './Navbar.css';  // Import CSS file

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();  // Get theme and toggle function from context

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/apps" className="nav-link">Apps</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </div>
      <button className="theme-toggle-button" onClick={toggleTheme}>
        {theme === 'light' ? <FaMoon /> : <FaSun />} {/* Toggle between sun and moon icons */}
      </button>
    </nav>
  );
};

export default Navbar;
