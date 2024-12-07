import React, { createContext, useContext } from "react";
import { useAuth } from "./Loggedin";
interface Post {
    post_id: number,
    name: string,
    profile_pic: string,
    post_text: string,
    likes: number,
    timestamp: string,
    post_image: string,
  }
interface HomepageContextType {
    posts: Post[];
    offset: number;
    loading: boolean;
    setPosts:(posts: Post[]) => void;
    setOffset:(offset: number) => void;
    setLoading:(loading: boolean) => void;
    likeAPost:(post_id: number) => void;
}

const HomepageContext = createContext<HomepageContextType | undefined>(undefined);

export const useHomePage = () => {
  const context = useContext(HomepageContext);
  if (!context) {
    throw new Error('useHomepage must be used within an AuthProvider');
  }
  return context;
};

interface HomePageProviderProps {
    children: React.ReactNode;
}

export const HomePageProvider: React.FC<HomePageProviderProps> = ({ children }) => {
  const { userInfo } = useAuth();
    const [posts, setPosts] = React.useState<Post[]>([]);
    const [offset, setOffset] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    const likeAPost = async (post_id: number) =>{
        //add functionality to like a post
        console.log('user' + userInfo.name + 'liked post' + post_id)
    }
    return (
        <HomepageContext.Provider value={{posts, offset, loading, setPosts, setOffset, setLoading, likeAPost}}>
            {children}
        </HomepageContext.Provider>
    );
};
