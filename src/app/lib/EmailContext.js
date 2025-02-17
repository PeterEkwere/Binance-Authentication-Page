import { createContext, useState, useContext } from "react";
import { useEffect } from 'react';

const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState("");
  console.log("EmailProvider initialized with:", userEmail);

  useEffect(() => {
    console.log("EmailProvider mounted");
    return () => console.log("EmailProvider unmounted");
  }, []);

  return (
    <EmailContext.Provider value={{ userEmail, setUserEmail }}>
      {children}
    </EmailContext.Provider>
  );
};

// Custom hook for easy access
export const useEmail = () => useContext(EmailContext);
