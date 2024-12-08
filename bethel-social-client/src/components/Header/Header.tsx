import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg"
import { useAuth } from "../../context/Loggedin";

const Header = () => {
  const { isLoggedIn, userInfo, logout, login, updateUserProfile } = useAuth();
  console.log(isLoggedIn, userInfo)
  return (
    <div className="max-w-full bg-maroon flex justify-between p-5">
      <div className="flex">
        <img src={Logo} className="md:h-24 md:w-24 border rounded-full border-red-900 h-12 w-12" />
        <h1 className="text-white font-semibold md:text-4xl md:py-6 md:px-2 text-xl py-2">BcSocial</h1>
      </div>
      <div className="flex items-center justify-end">
        {isLoggedIn && (
          <Link to="/home" className="p-2 text-white font-semibold md:text-2xl text-xl">
            Home
          </Link>
        )}
        {isLoggedIn && (
          <Link to={`/profile/${userInfo.sub}/${userInfo.name}`} className="p-2 text-white font-semibold text-xl md:text-2xl">
            Profile
          </Link>
        )}
        <button className="p-2 text-white font-semibold text-xl md:text-2xl"
        onClick={isLoggedIn ? logout : login}>
          {!isLoggedIn ? `Login` : `Logout`
           /* logged in status will be stored in some sort of context provider*/}
        </button>
        <button hidden onClick={()=>updateUserProfile && updateUserProfile()}>update test again</button>
      </div>
    </div>
  );
};

export default Header;
