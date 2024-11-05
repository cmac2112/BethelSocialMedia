import React, { createContext, useEffect } from "react";
import { useGoogleLogin, googleLogout } from '@react-oauth/google';

interface LoggedInContextType {
    isLoggedIn?: boolean;
    setIsLoggedIn: (isloggedIn: boolean) => void;
    userInfo?: any;
}

export const LoginContext = createContext<LoggedInContextType>({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    userInfo: null,
});

interface LoggedInProviderProps {
    children: React.ReactNode;
}

export const LoggedInProvider: React.FC<LoggedInProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState<any>(null);

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log('Login Success:', tokenResponse);
            setIsLoggedIn(true);
            localStorage.setItem('authToken', tokenResponse.access_token);

            // Fetch user information from Google's UserInfo API
            const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    'Authorization': `Bearer ${tokenResponse.access_token}`
                }
            });
            const userInfoData = await userInfoResponse.json();
            setUserInfo(userInfoData);
        },
        onError: (error) => {
            console.log('Login Failed:', error);
            setIsLoggedIn(false);
        },
    });

    const handleLogout = () => {
        googleLogout();
        setIsLoggedIn(false);
        setUserInfo(null);
        localStorage.removeItem('authToken');
        console.log('Logout Success');
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
            // Optionally, you can fetch user info here as well if needed
        }
    }, []);

    return (
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, userInfo }}>
            {isLoggedIn ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <button onClick={() => login()}>Login with Google</button>
            )}
            {children}
        </LoginContext.Provider>
    );
};