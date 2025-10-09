import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { api } from '../api/api';
import AuthContext from '../contexts/AuthContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated on app load
  useEffect(() => {
    checkAuthStatus();
  }, []); // Empty dependency array to run only once

  const checkAuthStatus = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/v1/user/me');

      if (response.status === 200) {
        setUser(response.data);
        setIsAuthenticated(true);
        console.log('User authenticated successfully:', response.data.fullname);
      }
    } catch (error) {
      console.log('User not authenticated:', error.response?.status);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await api.post('/api/v1/user/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      // Clear any stored user data
      localStorage.removeItem('user');
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
  };

  const value = useMemo(() => ({
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
    checkAuthStatus
  }), [user, isAuthenticated, loading, checkAuthStatus]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
