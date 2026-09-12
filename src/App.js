import React, { createContext, useContext, useEffect, useState } from 'react';
import AppRouter from './router';
import { initGA, logPageView } from './analytics';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const STORAGE_KEY = 'mohamaddev-theme';

const readInitialTheme = () => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch (error) {
    // Private browsing or blocked storage: fall back to the system preference.
  }
  // Warm white is the brand's ground, so it is what a first-time visitor sees.
  // The ink theme is the identity's reversed application, one toggle away.
  return 'light';
};

const App = () => {
  const [theme, setTheme] = useState(readInitialTheme);

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      // Not being able to remember the choice is not worth breaking the page over.
    }
  }, [theme]);

  const toggleTheme = () => setTheme((previous) => (previous === 'light' ? 'dark' : 'light'));

  useEffect(() => {
    initGA();
    logPageView();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AppRouter />
    </ThemeContext.Provider>
  );
};

export default App;
