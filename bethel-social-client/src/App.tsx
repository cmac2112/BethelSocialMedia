import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage'; //import our components so we can route to them
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import Error from './components/Modals/Error';
import Settings from './components/Modals/Settings';
import { AuthProvider } from './context/Loggedin';
function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile:username" element={<ProfilePage />} />
        <Route path="/error" element={<Error />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
    </AuthProvider>
  )
}

export default App
