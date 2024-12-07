import {useState, useRef, useEffect } from 'react'
import PostComponent from '../PostComponent'
import Layout from '../Layout'
import { useAuth } from '../../context/Loggedin'
import CreatePost from '../CreatePost'
import { Link } from 'react-router-dom'
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
const HomePage = () => {
  const { isLoggedIn, userInfo } = useAuth();
  console.log(isLoggedIn, userInfo)
  const posts = useRef<Post[]>([]);
  const offset = useRef(0);
  const [loading, setLoading] = useState(false);

  const getPosts = async () =>{ //add extra functionality later to make only certain posts show up to reduce load times
    setLoading(true);
    console.log('get posts is running')
    try{
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/posts?limit=5&offset=${offset.current}`, {
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
//this function will run to complete reload all posts if a user creates a post so it appears at the top of the feed
const getPostsAfterUserPosts = async () =>{ //add extra functionality later to make only certain posts show up to reduce load times
  offset.current = 0;
  posts.current = [];
  getPosts();
}

//https://finaltest-951995672515.us-central1.run.app/home
//https://finaltest-951995672515.us-central1.run.app
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

  return (
    <Layout>
      {isLoggedIn ? (
      <div className="md:px-52 bg-gray-200">
        <div className="py-2 ">
        <CreatePost getposts={getPostsAfterUserPosts} />
        </div>
    <div className="font-semibold">
        {posts.current.map((post: Post) =>(
          <div key={post.post_id}>
          <PostComponent user_id={post.user_id} postId={post.post_id} username={post.name} pfp={post.profile_pic} text={post.post_text} likes={post.like_number} date={post.timestamp} image={post.post_image} />
          </div>
        ))}
    </div>
    {loading && <p>Loading...</p>}
    </div>) : (<div className="flex justify-center bg-gray-200 md:p-24 text-3xl text-center">
    <div className="font-semibold">
        <h2>You must be logged into a valid @bethelks.edu account to use this site</h2>
        <Link className="text-blue-500" to="/info">Learn why</Link>
    </div>
    </div>)}
    </Layout>
  )
}

export default HomePage