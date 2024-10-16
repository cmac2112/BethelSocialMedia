import { useState } from "react";
import { Link } from "react-router-dom";
//if a user is logged in, show logout button

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn);
  return (
    <div className="max-w-full bg-maroon flex justify-between p-5">
      <div>
        <h1>"logo here"</h1>
        <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
          set login true
        </button>
      </div>
      <div className="flex justify-end">
        {isLoggedIn && (
          <Link to="/home" className="p-2 text-white font-semibold text-2xl">
            Home
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/profile" className="p-2 text-white font-semibold text-2xl">
            Profile
          </Link>
        )}
        <button className="p-2 text-white font-semibold text-2xl">
          {!isLoggedIn ? `Login/Register` : `Logout` /* logged in status will be stored in some sort of context provider*/}
        </button>
      </div>
    </div>
  );
};

export default Header;
