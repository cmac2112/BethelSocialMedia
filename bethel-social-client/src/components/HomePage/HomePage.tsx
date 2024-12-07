import React, { useEffect } from 'react'
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
  likes: number,
  timestamp: string,
  post_image: string,
}
const HomePage = () => {
  /*
  const posts = [
    {
      username: 'testuser1',
      pfp: 'https://www.example.com/pfp1.jpg',
      text: 'this is a test of the post component 1',
      likes: 410
    },
    {
      username: 'testuser2',
      pfp: 'https://www.example.com/pfp2.jpg',
      text: 'this is a test of the post component 2',
      likes: 2130
    },
    {
      username: 'testuser3',
      pfp: 'https://www.example.com/pfp3.jpg',
      text: 'this is a test of the post component 3',
      likes: 230
    },
    {
      username: 'testuser4',
      pfp: 'https://www.example.com/pfp4.jpg',
      text: 'this is a test of the post component 4',
      likes: 310
    },
    {
      username: 'testuser5',
      pfp: 'https://www.example.com/pfp5.jpg',
      text: 'this is a test of the post component 5',
      likes: 230
    },
    {
      username: 'testuser6',
      pfp: 'https://www.example.com/pfp6.jpg',
      text: 'this is a test of the post component 6',
      likes: 510
    },
    {
      username: 'testuser7',
      pfp: 'https://www.example.com/pfp7.jpg',
      text: 'this is a test of the post component 7',
      likes: 30
    },
    {
      username: 'testuser8',
      pfp: 'https://www.example.com/pfp8.jpg',
      text: 'this is a test of the post component 8',
      likes: 20
    },
    {
      username: 'testuser9',
      pfp: 'https://www.example.com/pfp9.jpg',
      text: 'this is a test of the post component 9',
      likes: 10
    },
    {
      username: 'testuser10',
      pfp: 'https://www.example.com/pfp10.jpg',
      text: 'this is a test of the post component 10',
      likes: 52
    }
  ];
  */
  const { isLoggedIn, userInfo } = useAuth();
  console.log(isLoggedIn, userInfo)
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [offset, setOffset] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const getPosts = async () =>{ //add extra functionality later to make only certain posts show up to reduce load times
    setLoading(true);
    try{
    const token = localStorage.getItem('authToken');
    const response = await fetch(`http://localhost:3000/api/posts?limit=5&offset=${offset}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const data = await response.json();
    console.log(data)
    setPosts((prevPosts) => [...prevPosts, ...data]);
    setOffset((prevOffset) => prevOffset + 5);

  }catch(err){
    console.log(err)
  }
  setLoading(false);
}

const handleScroll = () => {
  if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1 && !loading) {
    getPosts();
  }
};
useEffect(() => {
  getPosts();
}, []);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);

  },[loading]);

  return (
    <Layout>
      {isLoggedIn ? (
      <div className="md:px-52 bg-gray-200">
        <div className="py-2 ">
        <CreatePost />
        </div>
    <div className="font-semibold">
        {posts.map((post) =>(
          <div key={post.post_id}>
          <PostComponent username={post.name} pfp={post.profile_pic} text={post.post_text} likes={post.likes} date={post.timestamp} image={post.post_image} />
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