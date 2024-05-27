/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLogin = async () => {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/v1/auth/checkLogin`,
        {
          token,
        }
      );
      console.log(result);
      setIsLoggedin(result.data.data !== false ? true : false);
      setIsLoading(true);
    };
    fetchLogin();
  });
  console.log(isLoggedin);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedin(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedin(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedin, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
