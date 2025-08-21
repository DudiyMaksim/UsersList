import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {GoogleOAuthProvider} from "@react-oauth/google";

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={"688315354046-isd3q5qkjaj88uaj9oudrldsf18bm592.apps.googleusercontent.com"}>
    <App />
  </GoogleOAuthProvider>,
)
