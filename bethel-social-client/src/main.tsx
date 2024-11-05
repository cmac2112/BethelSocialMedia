import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { LoggedInProvider } from './context/Loggedin.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId='951995672515-9vhq40k5s6f41485aodjtiki00cncqn0.apps.googleusercontent.com'>
  <LoggedInProvider>
  <StrictMode>
    <App />
  </StrictMode>,
  </LoggedInProvider>
  </GoogleOAuthProvider>
)
