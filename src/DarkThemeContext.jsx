import { createContext, useState } from 'react';

export const DarkThemeContext = createContext();

export const DarkThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => setIsDarkTheme((prev) => !prev);

  return (
    <DarkThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </DarkThemeContext.Provider>
  );
};