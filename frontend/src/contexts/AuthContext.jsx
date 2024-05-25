/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [token, setToken] = useState(null);

  const login = (token) => {
    setIsLoggedin(true);
    setToken(token);
  };

  const logout = () => {
    setIsLoggedin(false);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedin, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
