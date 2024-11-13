import Layout from '../Layout/Layout';
import { Link } from 'react-router-dom';
import './Landing.css'; // Import the CSS file for custom animations

const Landing = () => {
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
        <button className="mt-8 px-6 py-4 bg-red-950 text-white font-semibold rounded-lg hover:bg-red-700 animate-pulse">
          Login/Register
        </button>
        <h2 className="mt-8 text-6xl font-bold">Why use Bethel Social? </h2>  
        <div className="mt-8 flex flex-col items-center space-y-8">
          <div className="flex space-x-16">
            <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center text-red-950 text-center text-lg p-4 shadow-lg float-animation">
              <span className="font-semibold">One-Stop Hub
              </span>
            </div>
            <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center text-red-950 text-center text-lg p-4 shadow-lg float-animation">
              <span className="font-semibold">Stay In the Loop
              </span>
            </div>
            <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center text-red-950 text-center text-lg p-4 shadow-lg float-animation">
              <span className="font-semibold">Meet Fellow Threshers
              </span>
            </div>
            <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center text-red-950 text-center text-lg p-4 shadow-lg float-animation">
              <span className="font-semibold">Get Involved
              </span>
            </div>
            <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center text-red-950 text-center text-lg p-4 shadow-lg float-animation">
              <span className="font-semibold">Share your Journey
              </span>
            </div>
          </div>
          <div className="flex space-x-16 text-center text-gray-400">
            <div className="w-48">
              <p>Access all your campus news, events, and social updates in one convenient app.</p>
            </div>
            <div className="w-48">
              <p>Never miss out on campus events, club meetings, or important announcements.</p>
            </div>
            <div className="w-48">
              <p>Connect with classmates, join study groups, and make new friends.</p>
            </div>
            <div className="w-48">
              <p> Discover clubs, organizations, and activities that match your interests.</p>
            </div>
            <div className="w-48">
              <p>Post updates, photos, and experiences to engage with the Bethel community.</p>
            </div> 
          </div>
        </div>
      </div>

      <Link to="/test">Home</Link>
    </Layout>
  );
};

export default Landing;
