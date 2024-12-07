//import { StrictMode } from 'react' //removed strict mode because it causes useEffects to run twice in development
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './context/Loggedin';

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <AuthProvider>
    <App />
    </AuthProvider>
  </GoogleOAuthProvider>
)
