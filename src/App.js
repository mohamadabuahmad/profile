// import React, { createContext, useState, useContext, useEffect } from "react";
// import AppRouter from "./router";
// import { initGA, logPageView } from "./analytics"; // 🔹 Import Google Analytics functions

// // Create a context for the theme
// const ThemeContext = createContext();

// export const useTheme = () => useContext(ThemeContext);

// const App = () => {
//   const [theme, setTheme] = useState("light"); // Default theme is light

//   useEffect(() => {
//     document.body.className = theme; // Apply the theme class to the body
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light"); // Toggle between light and dark
//   };

//   // 🔹 Initialize Google Analytics when the app loads
//   useEffect(() => {
//     initGA();
//     logPageView();
//   }, []);

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       <AppRouter />
//     </ThemeContext.Provider>
//   );
// };

// export default App;

import React, { createContext, useState, useContext, useEffect } from "react";
import AppRouter from "./router";
import { initGA, logPageView } from "./analytics"; // 🔹 Google Analytics functions

// Create a context for the theme
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

const App = () => {
  // Set initial theme based on system preference
  const [theme, setTheme] = useState(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  // Apply theme to the body element safely
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Initialize Google Analytics on app load
  useEffect(() => {
    initGA();
    logPageView();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app ${theme}`}>
        <AppRouter />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
