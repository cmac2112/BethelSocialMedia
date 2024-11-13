import React from 'react'
import { useAuth } from '../../context/Loggedin'
const CreatePost = () => {
    const { isLoggedIn, userInfo } = useAuth();
    const [wordCount, setWordCount] = React.useState(0);
    const [postText, setPostText] = React.useState('');
 

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
        setWordCount(e.target.value.length);
        setPostText(e.target.value);
      }}></textarea>
      </div>
      <div className="flex justify-between p-2">
        <button className="">img here</button>
      <button className="p-2 bg-maroon text-white rounded-xl" onClick={() => console.log('post', wordCount, postText)}>Post</button>
      </div>
    </div>
  )
}

export default CreatePost