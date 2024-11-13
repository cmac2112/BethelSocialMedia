import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';

const Footer: React.FC = () => {
  return (
    <footer className="max-w-full bg-gray-100 p-8">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div id="col1" className="flex flex-col items-center mb-6">
          <img src={Logo} alt="BC-Social Logo" className="h-16 w-16 mb-2" />
          <p className="text-center text-lg font-bold">BC-Social</p>
        </div>
        <div className="flex flex-col items-start mb-6" id="col2">
          <h2 className="text-gray-600 font-semibold text-2xl text-center border-b-2 mb-4">Contact Us</h2>
          {["cadenamcarthur@bethelks.edu", "angeldhernandez@bethelks.edu", "meriemdhouibi@bethelks.edu", "micahdquinlin@bethelks.edu", "sethabalzer@bethelks.edu", "williamawalker@bethelks.edu", "ethanpkennedy@bethelks.edu"].map(email => (
            <p key={email} className="text-gray-600 text-sm py-1 text-center">{email}</p>
          ))}
        </div>
        <nav className="flex flex-col items-start mb-6" id="col3">
          <h2 className="text-gray-600 font-semibold text-2xl text-center border-b-2 mb-4">Navigation</h2>
          {[
            { to: "/", label: "Landing Page" },
            { to: "/login", label: "Login/Register" },
            { to: "/home", label: "Home" },
            { to: "/profile", label: "Profile" },
            { to: "/admin", label: "Administrative Login" },
            { to: "/tos", label: "Terms of Service" }
          ].map(link => (
            <Link key={link.to} to={link.to} className="text-gray-600 text-sm py-1 hover:underline">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="text-center text-gray-500 text-xs mt-4">
        © {new Date().getFullYear()} BC-Social. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
