import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Load user from localStorage, parsing the JSON string
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Effect to fetch user data on initial load if only token exists (less likely now)
  // This effect might be simplified if user data is always stored with the token on login
  useEffect(() => {
    const fetchUserIfMissing = async () => {
      // Only fetch if we have a token but no user data in state (e.g., page refresh lost state)
      if (token && !user) {
        try {
          console.log("Attempting to fetch missing user data with token...");
          // Replace with your actual endpoint to get user data with a token
          const res = await axios.get(`${config.API_URL}/api/auth/me`, { headers: { 'x-auth-token': token } });
          
          // Assuming your backend returns user data if token is valid
          // Update state and localStorage with fresh user data
          setUser(res.data.user); // Assuming user data is in res.data.user
          localStorage.setItem('user', JSON.stringify(res.data.user));
          console.log("Fetched missing user data.");

        } catch (error) {
          console.error("Error fetching user data with token:", error);
          // If token is invalid or expired, log out
          logout(); // This logout will remove the invalid token and user from storage
        }
      }
    };
    
    fetchUserIfMissing();
  }, [token, user]); // Re-run effect if token or user changes

  // Example login function - ensure user data is also stored
  const login = (newToken, userData) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data
    setToken(newToken);
    setUser(userData); // Set user state
  };

  // Example logout function - clear token and user data
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Clear user data from storage
    setToken(null);
    setUser(null);
  };

  return (
    // Update loading state to reflect if token exists but user data is not yet loaded
    <AuthContext.Provider value={{ user, token, login, logout, loading: token && !user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 