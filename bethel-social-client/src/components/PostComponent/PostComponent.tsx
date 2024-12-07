import React, {useEffect} from "react";
import { Link } from "react-router-dom";
//import bigimg from "../../assets/img.jpg"

/*im thinking that we may need a post component like this so we can reuse it on the
home page and the profile page. we feed it the post data we grab into the return here and render it for each post
*/

interface PostComponentProps {
  username: string;
  pfp: string;
  text: string;
  likes: number;
  date: string;
  image?: string;
}
const PostComponent: React.FC<PostComponentProps> = ({
  username,
  text,
  likes,
  image,
  date,
  pfp,
}) => {
  //this will need props, they should come from the
  //parent component, this is a child of to determine what
  //posts we need to show

  /*
    ex: if we are on the homepage then show all most recent posts,
    but if we are on the profile page then show only posts that are from the given profile
    This could be done with some fetch trickery */

  /*
    something like:
    let response = await fetch('https://localhost/api/${props.profileId}/posts')
    let posts = await response.json()

    then map the data to an array and iterate through generating new html (jsx) elements filling in the data
     */
    const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL
    const [imageUrl, setImageUrl] = React.useState<string | undefined>(undefined);

    useEffect(() => {
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
  return (
    <div id="post-container" className="p-5 rounded-xl bg-white border-b-8 border-gray-300">
      <div id="pfp-username" className="flex border-b-2 border-maroon">
        <Link to={`/profile/${username}`} className="flex">
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
            className="h-60 md:h-screen"
            alt="Post"
          />
        </div>
      )}
      <div id="bottom-bar" className="flex justify-between py-1">
        <div className="flex">
       <img src={pfp} className="h-5 w-5 rounded-full" />
       <p className="text-gray-400 px-1">{likes}</p>
       </div>
       <div id="date">
{date}
       </div>
      </div>
    </div>
  );
};

export default PostComponent;
