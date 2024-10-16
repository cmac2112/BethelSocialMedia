import React, { useState } from 'react'
import Layout from '../Layout'
import pfp from "../../assets/testimage.jpg"

const ProfilePage = () => {
  const [user, setUser] = useState('test user')
  //obviously change images later
  return (
    <Layout>
      <div className="container max-w-full flex justify-evenly bg-gray-50 relative" id="pfp-title-container">
        <div className="p-10">
          <img src={pfp} className="rounded-full h-28 w-28" />
        </div>
        <div className="p-10">
        <h2 className="text-3xl font-semibold">Welcome,</h2>
        <h2 className="text-end text-xl font-semibold">{user}</h2>
        </div>
        <div className="justify-self-end"id="settings">
          <img src={pfp} className="rounded-full h-5 w-5 absolute top-2 right-2" />
        </div>
      </div>
    </Layout>
  )
}

export default ProfilePage