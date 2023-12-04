// src/hooks/useAuth.js
import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in (you may use your own logic)
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('accessToken', token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout };
};

export default useAuth;
