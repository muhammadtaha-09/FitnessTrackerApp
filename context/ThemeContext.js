import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notificationsOn, setNotificationsOn] = useState(false);

  const toggleTheme = () => setIsDarkMode(prev => !prev);
  const toggleNotifications = () => setNotificationsOn(prev => !prev);

  const theme = {
    isDarkMode,
    toggleTheme,
    notificationsOn,
    toggleNotifications,
    colors: {
      primary: '#C8F560',           // Neon green accent
      primaryDark: '#A8D840',       // Darker green for pressed states
      background: isDarkMode ? '#0D0D0D' : '#F5F5F5',
      cardBackground: isDarkMode ? '#1A1A1A' : '#FFFFFF',
      cardBackgroundAlt: isDarkMode ? '#222222' : '#F0F0F0',
      text: isDarkMode ? '#FFFFFF' : '#0D0D0D',
      secondaryText: isDarkMode ? '#8A8A8E' : '#6E6E73',
      navBackground: isDarkMode ? '#1A1A1A' : '#FFFFFF',
      border: isDarkMode ? '#2C2C2E' : '#D1D1D6',
      inputBackground: isDarkMode ? '#1C1C1E' : '#F2F2F7',
      accentText: '#0D0D0D',        // Text on neon green buttons
      danger: '#FF453A',
      success: '#32D74B',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
