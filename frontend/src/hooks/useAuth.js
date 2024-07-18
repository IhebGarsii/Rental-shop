// hooks/useAuth.js
import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Retrieve user from localStorage
    const user = localStorage.getItem("ROles");
    console.log("idUser from localStorage:", user); // Debugging log

    // Check if user exists and set isAuthenticated state
    setIsAuthenticated(!!user);
    console.log("Setting isAuthenticated state to:", !!user); // Debugging log
  }, []);

  return { isAuthenticated };
};
