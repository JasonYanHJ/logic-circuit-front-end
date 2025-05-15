/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import {
  getAuthUser,
  logout as logoutRequest,
  login as loginRequest,
  register as registerRequest,
} from "./authService";

// Create the context
const AuthContext = createContext(null);

// Create a provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getAuthUser()
      .then((res) => setUser(res))
      .catch(() => setUser("guest"));
  }, []);

  const login = (email, password) =>
    loginRequest(email, password).then((res) => {
      getAuthUser()
        .then((res) => setUser(res))
        .catch(() => setUser("guest"));
      window.location.href = "/";
      return res;
    });

  const register = (email, password, code) =>
    registerRequest(email, password, code);

  const logout = () =>
    logoutRequest().then((res) => {
      setUser("guest");
      return res;
    });

  const value = {
    user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

// Default export for the custom hook
export default useAuth;
