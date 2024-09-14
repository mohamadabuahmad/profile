import React, { createContext, useState, useContext, useEffect } from 'react';
import AppRouter from './router';

// Create a context for the theme
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const App = () => {
  const [theme, setTheme] = useState('light');  // Default theme is light

  useEffect(() => {
    document.body.className = theme;  // Apply the theme class to the body
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');  // Toggle between light and dark
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AppRouter />
    </ThemeContext.Provider>
  );
};

export default App;
