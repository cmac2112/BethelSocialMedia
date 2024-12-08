import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage'; //import our components so we can route to them
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import Settings from './components/Modals/Settings';
import { HomePageProvider } from './context/homepagecontext';
//import { AuthProvider } from './context/Loggedin';
function App() {
  return (
    <HomePageProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile/:userid/:username" element={<ProfilePage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
    </HomePageProvider>
  )
}

export default App
