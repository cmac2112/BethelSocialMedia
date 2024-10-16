import React from 'react'
import { Link } from 'react-router-dom'
//import Layout

const LoginPage = () => {
  return (
    <div>Landing page, make changes here
        <Link to="/home" className="p-5 text-maroon">Go to Home Page</Link>
        <Link to="/profile" className="p-5 text-maroon">Go to Profile Page</Link>
    </div>
  )
}

export default LoginPage