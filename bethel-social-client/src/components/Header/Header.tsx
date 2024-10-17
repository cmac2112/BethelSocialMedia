import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg"
//if a user is logged in, show logout button

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn);
  return (
    <div className="max-w-full bg-maroon flex justify-between p-5">
      <div className="flex">
        <img src={Logo} className="h-24 w-24 border rounded-full border-red-900" />
        <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
          set login true
        </button>
      </div>
      <div className="flex items-center justify-end">
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
          {!isLoggedIn ? `Login/Register` : `Logout`
           /* logged in status will be stored in some sort of context provider*/}
        </button>
      </div>
    </div>
  );
};

export default Header;
