//import { useState } from "react";
import Layout from "../Layout";
import pfp from "../../assets/profilepic.jpg";
import settingspic from "../../assets/settings.png";
import PostComponent from "../PostComponent";

const ProfilePage = () => {
  const user = ("test user");
  const bio =
    (`Senior student majoring in Software Development and minoring in Mathematics.

Driven by curiosity of how the world works naturally and through technology. I love building practical projects to solve real world problems.

Interested in anything science related, you name it I’m interested:
Software
Math
Physics
Meteorology
Geology
Astronomy
Etc…


Technical Skills:
Languages; Python, Javascript/TS, C, HTML/CSS, SQL, C#
Frameworks and libraries: React, Angular, flask
`);
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
          <h2 className="text-end text-xl font-semibold">{user}</h2>
        </div>
        <div className="justify-self-end" id="settings">
          <img
            src={settingspic}
            id="settings"
            className="rounded-full h-5 w-5 absolute top-2 right-2 hover:cursor-pointer"
          />
        </div>
      </div>
      <div id="bio-area" className="flex justify-evenly border-b-2">
        <div id="bio-container" className="container md:w-2/4 p-2">
        <div className="text-pretty bg-slate-50 p-5 rounded-xl">
        {bio}
        </div>
        </div>

      </div>

      <div id="posts-container" className="bg-gray-300 p-4 md:px-36">
        <PostComponent username={"user 1"} text={"this is a post about something first"} likes={51} />
        <PostComponent username={"user 2"} text={"this is another post about something else later"} likes={523} />
        {/* will need props for pfp, date posted, image if it contains an image... */}
      </div>
    </Layout>
  );
};

export default ProfilePage;
