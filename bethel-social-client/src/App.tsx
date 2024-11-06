import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage'; //import our components so we can route to them
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Error from './components/Modals/Error';
import Settings from './components/Modals/Settings';
function App() {
  return (
    <GoogleOAuthProvider clientId='951995672515-9vhq40k5s6f41485aodjtiki00cncqn0.apps.googleusercontent.com'>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/error" element={<Error />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
    </GoogleOAuthProvider>
  )
}

export default App
