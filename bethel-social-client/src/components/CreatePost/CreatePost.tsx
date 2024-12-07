import React, { FC } from "react";
import { useAuth } from "../../context/Loggedin";

interface CreatePostProps {
  getposts: () => void;
}
const CreatePost: FC<CreatePostProps> = ({ getposts }) => {
  const { isLoggedIn } = useAuth();
  const [charCount, setCharCount] = React.useState(0);
  const [postText, setPostText] = React.useState("");
  const [image, setImage] = React.useState<File | null>(null); //use this to store image data

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const sendPost = async () => {
    const token = localStorage.getItem("authToken");
    const formData = new FormData();
    formData.append("postText", postText);
    if (image) {
      formData.append("image", image);
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/createpost`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, //this will need to be validated on the server through middleware `validateToken`
        },
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      getposts();
      console.log('get posts should have ran')
    } catch (err) {
      console.log(err);
      //display error message that seth has made
    }
  };

  //send to api, userid sub, postText, image
  if (!isLoggedIn) {
    return (
      <div>
        <h1>You must be logged in to create a post</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white rounded-xl border-b-8 border-gray-300">
      <h1 className="p-2 flex justify-center">Create a post</h1>
      <div className="flex justify-center p-2">
        <textarea
          className="w-3/4 p-2 bg-gray-100 rounded-xl"
          placeholder="What's on your mind?"
          onChange={(e) => {
            setCharCount(1000 - e.target.value.length);
            setPostText(e.target.value);
          }}
        ></textarea>
      </div>
      <p>{charCount}</p>
      {charCount < 0 && <p className="text-maroon">Character limit reached</p>}
      <div className="flex justify-between p-2">
        <input type="file" onChange={handleImageChange} />
        <p>{image?.name}</p>
        <p>Image</p>
        <button
          className="p-2 bg-maroon text-white rounded-xl"
          onClick={sendPost}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
