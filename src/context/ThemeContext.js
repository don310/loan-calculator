import React, { createContext, useContext, useState } from 'react';

const ThemeModeContext = createContext();

export const ThemeModeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('light');
  const toggleTheme = () => {
    setThemeMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };
  return (
    <ThemeModeContext.Provider value={{ themeMode, toggleTheme }}>
      {children}
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeModeContext);