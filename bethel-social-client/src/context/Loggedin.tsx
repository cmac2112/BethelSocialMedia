import React, { createContext, useEffect } from "react";
import { useGoogleLogin, googleLogout } from '@react-oauth/google';

interface LoggedInContextType {
    isLoggedIn?: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
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
        scope: "openid profile email",
        onSuccess: async (tokenResponse) => {
            console.log('Login Success:', tokenResponse);
            setIsLoggedIn(true);
            const { access_token} = tokenResponse;
            console.log('Access Token:', access_token);
            
            localStorage.setItem('authToken', tokenResponse.access_token)
            // Fetch user information from Google's UserInfo API
            const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    'Authorization': `Bearer ${tokenResponse.access_token}`
                }
            });
            const userInfoData = await userInfoResponse.json();
            setUserInfo(userInfoData);
            console.log('User Info:', userInfoData);
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
        }
    }, []);

    const updateUserProfile = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('No token found');
        }

        const response = await fetch('http://localhost:3000/api/authtest', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ profileData: 'new profile data' })
        });

        if (!response.ok) {
            throw new Error('Failed to update profile');
        }

        const data = await response.json();
        console.log('Profile updated:', data);
        return data;
    };

    return (
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, userInfo }}>
            {isLoggedIn ? (
                <div>
                    <button onClick={handleLogout}>Logout</button>
                    {userInfo && (
                        <>
                            <p>{userInfo.name}</p>
                            <p>{userInfo.email}</p>
                            <img src={userInfo.picture} alt={userInfo.name} />
                            <button onClick={updateUserProfile}>Update Profile</button>
                        </>
                    )}
                </div>
            ) : (
                <button onClick={() =>login()}>Login with Google</button>
            )}
            {children}
        </LoginContext.Provider>
    );
};
