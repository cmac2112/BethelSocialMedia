import React from 'react';
import './HomePage.css'; // Import the custom CSS file
import 

const HomePage: React.FC = () => {
  return (
    <div className="homepage-container">
      <div className="content">
        <h1 className="text-4xl font-bold text-white">Welcome to BC-Social</h1>
        <p className="text-lg text-white mt-4">Connecting people, one click at a time.</p>
      </div>
    </div>
  );
};

export default HomePage;
