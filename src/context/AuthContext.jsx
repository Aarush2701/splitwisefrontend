import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

const login = (token) => {
  localStorage.setItem("token", token);
  setIsAuthenticated(true);
};

const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    setIsAuthenticated(true);
  } else {
    setIsAuthenticated(false);
  }
}, []);



  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
