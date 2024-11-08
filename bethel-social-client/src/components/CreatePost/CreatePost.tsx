import React from 'react'
import { useAuth } from '../../context/Loggedin'
const CreatePost = () => {
    const { isLoggedIn, userInfo } = useAuth();
    console.log(isLoggedIn, userInfo)
  return (
    {}
  )
}

export default CreatePost