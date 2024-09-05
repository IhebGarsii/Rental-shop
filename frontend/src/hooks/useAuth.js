import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("Roles");
    console.log("idUser from localStorage:", user);
    setIsAuthenticated(!!user);
    console.log("Setting isAuthenticated state to:", !!user);
  }, []);

  return { isAuthenticated };
};
