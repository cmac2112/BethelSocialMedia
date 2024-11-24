import React, { createContext, useEffect, useContext } from "react";
import { useGoogleLogin, googleLogout } from '@react-oauth/google';

interface LoggedInContextType {
    isLoggedIn?: boolean;
    
}

const HomepageContext = createContext<LoggedInContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(HomepageContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface LoggedInProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<LoggedInProviderProps> = ({ children }) => {

    return (
        <HomepageContext.Provider value={{}}>
            {children}
        </HomepageContext.Provider>
    );
};
