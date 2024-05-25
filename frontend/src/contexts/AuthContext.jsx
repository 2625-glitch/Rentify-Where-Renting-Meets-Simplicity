/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

// Create AuthContext
export const AuthContext = createContext();

// Create AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);

  const login = () => {
    setIsLoggedin(true);
  };

  const logout = () => {
    setIsLoggedin(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
