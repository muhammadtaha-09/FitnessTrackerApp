import React, { createContext, useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock initial load to check if user is already logged in (async storage could go here)
  useEffect(() => {
    const checkLoginStatus = async () => {
      // Simulate checking storage
      setTimeout(() => {
        setIsAuthenticated(false);
        setLoading(false);
      }, 1000);
    };
    checkLoginStatus();
  }, []);

  const login = async (email, password) => {
    // Mock authentication
    return new Promise((resolve) => {
      setTimeout(() => {
        const firstName = email.split('@')[0];
        const formattedName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
        
        setUser({ email, firstName: formattedName });
        setIsAuthenticated(true);
        resolve({ success: true });
      }, 800);
    });
  };

  const logout = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser(null);
        setIsAuthenticated(false);
        resolve({ success: true });
      }, 500);
    });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FA' }}>
        <ActivityIndicator size="large" color="#1A1A1A" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
