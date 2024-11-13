import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="max-w-full bg-maroon flex justify-between p-5">
      <div className="flex items-center">
        <img src={Logo} className="h-24 w-24 border rounded-full border-red-900" alt="Logo" />
        <button 
          onClick={handleLoginToggle} 
          className="ml-4 p-2 bg-white text-maroon font-semibold rounded hover:bg-gray-200"
          aria-label={isLoggedIn ? "Logout" : "Login/Register"}
        >
          {isLoggedIn ? "Logout" : "Login/Register"}
        </button>
      </div>
      <div className="flex items-center justify-end space-x-4">
        {isLoggedIn && (
          <>
            <Link to="/home" className="p-2 text-white font-semibold text-2xl hover:underline">
              Home
            </Link>
            <Link to="/profile" className="p-2 text-white font-semibold text-2xl hover:underline">
              Profile
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
