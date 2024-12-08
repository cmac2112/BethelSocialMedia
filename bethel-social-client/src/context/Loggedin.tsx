import React, { createContext, useEffect, useContext } from "react";
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
interface userInfo {
    name: string;
    email: string;
    picture: string;
    sub: string;
    given_name: string;
    family_name: string;
    hd: string;
}
interface LoggedInContextType {
    isLoggedIn?: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    userInfo?: any;
    login?: () => void;
    logout?: () => void;
    updateUserProfile?: () => Promise<any>;
}

const AuthContext = createContext<LoggedInContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface LoggedInProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<LoggedInProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState<userInfo | null>(null);
    const login = useGoogleLogin({
        scope: "openid profile email",
        onSuccess: async (tokenResponse) => {
            console.log('Login Success, checking validity status:', tokenResponse);
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
            console.log('before creating new logged in user')
            try{
                console.log('creating new logged in user')
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/createuser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tokenResponse.access_token}`
                    }
                })
                const data = await response.json();
                console.log(data);
            }catch(e){
                console.log(e);
            }
            if (userInfoData.hd !== 'bethelks.edu') {
                console.log('Invalid email domain');
                setIsLoggedIn(false);
                return;
            }else{
                setIsLoggedIn(true);
            }
            //must handle token forging on backend when the application is built
            // if a user enters a random string of letters and numbers to the authToken field
            // in local storage, they can fool the code in showing that they are logged in and seeing home posts
            
        },
        onError: (error) => {
            console.log('Login Failed:', error);
            setIsLoggedIn(false);
        },
    });

    const logout = () => {
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
        const handleBeforeUnload = () =>{
            localStorage.removeItem('authToken')
        }
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, []);

    const updateUserProfile = async () => {
        console.log('Updating profile');
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('No token found');
        }

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/authtest`, {
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
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userInfo, login, logout, updateUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
};
