import { useState, useEffect } from "react";

const Auth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if a user is already logged in (e.g., from cookies or local storage)
    const storedToken = localStorage.getItem("user_token");
    setIsLoggedIn(!!storedToken);
  }, []);

  const login = (userData) => {
    // Perform login logic, store token on successful login (e.g., localStorage)
    localStorage.setItem("user_token", "your_token"); // Replace with actual token
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Remove user token from storage on logout
    localStorage.removeItem("user_token");
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout };
};

export default Auth;
