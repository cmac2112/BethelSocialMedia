import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
    //colors set to change
  return (
    <div className="max-w-full flex justify-evenly bg-gray-400">
        <div id="col1">
            <p>"logo here"</p>
        </div>
        <div className="flex flex-col items-start" id="col2">
            <h2 className="text-white font-semibold text-2xl text-center border-b-2">Contact Us</h2>
            <p className="text-white text-xs py-1 text-center">cadenamcarthur@bethelks.edu</p>
            <p className="text-white text-xs py-1 text-center">angeldhernandez@bethelks.edu</p>
            <p className="text-white text-xs py-1 text-center">meriemdhouibi@bethelks.edu</p>
            <p className="text-white text-xs py-1 text-center">micahdquinlin@bethelks.edu</p>
            <p className="text-white text-xs py-1 text-center">sethabalzer@bethelks.edu</p>
            <p className="text-white text-xs py-1 text-center">williamawalker@bethelks.edu</p>
            <p className="text-white text-xs py-1 text-center">ethanpkennedy@bethelks.edu</p>
        </div>
        <div className="flex flex-col items-start" id="col3">
            <h2 className="text-white font-semibold text-2xl text-center border-b-2">Navigation</h2>
            <Link to="/" className="text-white text-xs py-1">Landing Page</Link>
            <Link to="/login" className="text-white text-xs py-1">Login/Register</Link>
            <Link to="/home" className="text-white text-xs py-1">Home</Link>
            <Link to="/profile" className="text-white text-xs py-1">Profile</Link>
            <Link to="/admin" className="text-white text-xs py-1">Administrative Login</Link>
        </div>
    </div>
  )
}

export default Footer