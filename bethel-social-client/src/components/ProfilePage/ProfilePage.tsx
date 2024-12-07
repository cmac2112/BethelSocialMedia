import { useState, useRef, useEffect } from "react";
import Layout from "../Layout";
import pfp from "../../assets/profilepic.jpg";
import settingspic from "../../assets/settings.png";
import PostComponent from "../PostComponent";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/Loggedin";
interface Post {
  post_id: number,
  name: string,
  profile_pic: string,
  post_text: string,
  like_number: number,
  timestamp: string,
  post_image: string,
  user_id: string,
}
const ProfilePage = () => {
  const [bio, setBio] = useState(""); //angel will use this to change the bio
  const posts = useRef<Post[]>([]) //this will hold the posts that the user has made
  const offset = useRef(0);
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { userid, username } = useParams();
  const { userInfo, isLoggedIn } = useAuth();
  console.log(userid)

  const checkIfOwner = () =>{ //check to see if the user owns the profile
  //check to see if the user owns the profile
  if(userInfo.sub === userid){
    console.log('this is your profile')
    console.log(userInfo.sub)
    console.log(userid)
    setIsOwner(true);
  }else{
    console.log('this is not your profile')
    setIsOwner(false);
  }
}

  useEffect(() =>{
    checkIfOwner();
  }, [])

  const getPosts = async () =>{ //add extra functionality later to make only certain posts show up to reduce load times
    setLoading(true);
    console.log('get posts is running')
    try{
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/posts/${userid}?limit=5&offset=${offset.current}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const data = await response.json();
    console.log(data)
    posts.current = [...posts.current, ...data];
    offset.current += 5;

  }catch(err){
    console.log(err)
    //use seth's error popup
  }
  setLoading(false);
}

const changeBio = async () => {
    const token = localStorage.getItem('authToken');
    try{
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/bio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({bio: bio})
    });
    const data = await response.json();
    setBio(data.bio);
    console.log(data);
    } catch (err) {
      console.log(err);
      //use seth's error popup
    }
}


const handleScroll = () => {
  if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1 && !loading) {
    getPosts();
  }
};

useEffect(() => {
  getPosts();
}, [userInfo]);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  },[loading, isLoggedIn]);


  //obviously change images later
  return (
    <Layout>
      <div
        className="container max-w-full flex justify-evenly bg-gray-50 relative border-b-2 p-1"
        id="pfp-title-container"
      >
        <div className="md:p-10">
          <img
            src={pfp}
            className="rounded-full h-40 w-40 border-4 border-maroon shadow-2xl"
          />
        </div>
        <div className="p-10">
          <h2 className=" text-xl md:text-7xl font-semibold">Welcome</h2>
          <h2 className="text-end text-xl font-semibold">{username}</h2>
        </div>
        <div className="justify-self-end" id="settings">
          {isOwner && (
          <img
            src={settingspic}
            id="settings"
            className="rounded-full h-5 w-5 absolute top-2 right-2 hover:cursor-pointer"
          />
          )}
        </div>
      </div>
      <div id="bio-area" className="flex justify-evenly border-b-2">
        <div id="bio-container" className="container md:w-2/4 p-2">
        <div className="text-pretty bg-slate-50 p-5 rounded-xl">
        {bio}
        </div>
        <button onClick={changeBio} className="bg-maroon text-white p-2 rounded-xl">Change Bio</button>
        </div>

      </div>

      <div id="posts-container" className="bg-gray-300 p-4 md:px-36">
      {posts.current.map((post: Post) =>(
        <div key={post.post_id}>
        <PostComponent user_id={post.user_id} postId={post.post_id} username={post.name} pfp={post.profile_pic} text={post.post_text} likes={post.like_number} date={post.timestamp} image={post.post_image} />
        </div>
      ))}
        {/* will need props for pfp, date posted, image if it contains an image... */}
      </div>
    </Layout>
  );
};

export default ProfilePage;
