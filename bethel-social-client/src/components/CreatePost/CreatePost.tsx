import React from 'react'
import { useAuth } from '../../context/Loggedin'
const CreatePost = () => {
    const { isLoggedIn } = useAuth();
    const [charCount, setCharCount] = React.useState(0);
    const [postText, setPostText] = React.useState('');
    const [error, setError] = React.useState(''); //use this to trigger error state to render error component
 
    const sendPost = async () =>{
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:3000/api/createpost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` //this will need to be validated on the server through middleware `validateToken`
        },
        body: JSON.stringify({
          postText: postText,
          image: 'testimage.jpg'
        })
      });
      const data = await response.json();
      console.log(data)
    }
    

    //send to api, userid sub, postText, image
    if(!isLoggedIn){
      return (
        <div>
          <h1>You must be logged in to create a post</h1>
        </div>
      )
    }

  return (
    <div className="flex flex-col bg-white rounded-xl border-b-8 border-gray-300">
      <h1 className="p-2 flex justify-center">Create a post</h1>
      <div className='flex justify-center p-2'>
      <textarea className="w-3/4 p-2 bg-gray-100 rounded-xl" placeholder="What's on your mind?" onChange={(e) => {
        setCharCount(e.target.value.length);
        setPostText(e.target.value);
      }}></textarea>
      </div>
      <p>{charCount}</p>
      <div className="flex justify-between p-2">
        <button className="">img here</button>
      <button className="p-2 bg-maroon text-white rounded-xl" onClick={() => sendPost()}>Post</button>
      </div>
    </div>
  )
}

export default CreatePost