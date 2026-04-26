import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      primary: '#212C4F', // Dark Blue from image
      background: isDarkMode ? '#121212' : '#F8F9FA',
      cardBackground: isDarkMode ? '#1E1E1E' : '#FFFFFF',
      text: isDarkMode ? '#FFFFFF' : '#1A1A1A',
      secondaryText: isDarkMode ? '#A0A0A5' : '#8E8E93',
      navBackground: isDarkMode ? '#1E1E1E' : '#FFFFFF',
      border: isDarkMode ? '#333333' : '#E5E5EA',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
