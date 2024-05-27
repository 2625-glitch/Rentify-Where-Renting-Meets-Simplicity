/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchLogin = async () => {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/v1/auth/checkLogin`,
        {
          token,
        }
      );
      setUser(result.data.data);
    };
    fetchLogin();
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
