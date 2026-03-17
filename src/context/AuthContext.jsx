import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('diamond_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (username, password) => {
    // Dummy authentication logic
    if (username === 'admin' && password === 'admin123') {
      const adminData = { username: 'admin', role: 'admin', name: 'Super Admin' };
      setUser(adminData);
      localStorage.setItem('diamond_user', JSON.stringify(adminData));
      return { success: true, role: 'admin' };
    } else if (username === 'user' && password === 'user123') {
      const userData = { username: 'user', role: 'user', name: 'Regular User' };
      setUser(userData);
      localStorage.setItem('diamond_user', JSON.stringify(userData));
      return { success: true, role: 'user' };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('diamond_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
