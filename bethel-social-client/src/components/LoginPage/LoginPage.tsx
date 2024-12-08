
import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';
//import './Landing.css'; // Import the CSS file for custom animations

const LoginPage = () => {
  // the floating balls were not formatted for mobile, due to time crunch they have been removed
  return (
    <Layout>
      <div className="bg-red-950 text-white min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-6xl font-bold">Bethel College Social</h1>
        <svg className="animate-bounce w-6 h-6 mt-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
        <p className="mt-8 text-gray-400">
        Bethel College Social is a dynamic app designed to connect Bethel College students and enhance 
        their campus experience. Stay updated with the latest news, events, and social activities happening
         around campus. Whether you’re looking to join a club, attend a campus event, or simply stay informed 
         about what’s happening at Bethel, this app makes it easy and fun to stay connected with your college 
         community.
        </p>
        <Link className="mt-8 px-6 py-4 bg-red-950 text-white font-semibold rounded-lg hover:bg-red-700 animate-pulse" to={'/home'}>
          Login/Register
        </Link>
        <h2 className="mt-8 text-6xl font-bold">Bethel College Software Club </h2>  
        <div className="mt-8 flex flex-col items-center space-y-8">
          </div>
      </div>
    </Layout>
  );
};
export default LoginPage