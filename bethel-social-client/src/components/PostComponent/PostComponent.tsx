import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useHomePage } from "../../context/homepagecontext"
import { AuthProvider } from "../../context/Loggedin";

interface PostComponentProps {
  username: string;
  pfp: string;
  text: string;
  likes: number;
  date: string;
  image?: string;
  postId: number;
  user_id: string;
}
const PostComponent: React.FC<PostComponentProps> = ({
  username,
  text,
  likes,
  image,
  date,
  pfp,
  postId,
  user_id
}) => {
  const { likeAPost } = useHomePage();
    const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL
    const [imageUrl, setImageUrl] = React.useState<string | undefined>(undefined);


    useEffect(() => {
      //flow to get an image posted by someone
      const fetchImage = async () => {
        if (image) {
          const token = localStorage.getItem('authToken');
          try {
            const response = await fetch(`${baseURL}/proxy${image}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            if (response.ok) {
              const blob = await response.blob();
              const url = URL.createObjectURL(blob);
              setImageUrl(url);
            } else {
              console.error('Failed to fetch image');
            }
          } catch (error) {
            console.error('Error fetching image:', error);
          }
        }
      };
  
      fetchImage();
    }, [image, baseURL]);

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = {
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };
    return date.toLocaleString('en-US', options);
  }
  return (
    <AuthProvider>
    <div id="post-container" className="p-5 rounded-xl bg-white border-b-8 border-gray-300">
      <div id="pfp-username" className="flex border-b-2 border-maroon">
        <Link to={`/profile/${user_id}/${username}`} className="flex">
        <img src={pfp} className="h-10 w-10 rounded-full" />
        <p className="p-2">{username}</p>
        </Link>
      </div>
      <div id="text-body" className="flex justify-center py-1">
        <div id="text-container" className="bg-gray-100 md:w-3/4 p-3 rounded-xl">
          <p>
            {text}
          </p>
        </div>
        
      </div>
      {image && (
        <div id="image-container" className="flex justify-center border-b-2">
          <img
            src={imageUrl}
            className="h-60 md:h-96"
            alt="Post"
          />
        </div>
      )}
      <div id="bottom-bar" className="flex justify-between py-1">
        <div className="flex">
       <button onClick={()=>likeAPost(postId)}>Like</button>
       <p className="px-1">{likes}</p>
       </div>
       <div id="date">
{formatDate(date)}
       </div>
      </div>
    </div>
    </AuthProvider>
  );
};

export default PostComponent;
