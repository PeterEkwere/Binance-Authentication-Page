'use client'
import './globals.css'
import LoginForm from '../components/LoginForm'
import { ThemeProvider } from './lib/ThemeContext'
import { EmailProvider } from './lib/EmailContext' // Add this import
import { useEffect } from 'react';
import { notifyNewUser } from '../lib/api'; // Import the notification function

export default function Login() {
  useEffect(() => {
    // Notify Flask API when the page loads
    notifyNewUser();
  }, []);

  return (
    <ThemeProvider>
      <EmailProvider>
        <LoginForm />
      </EmailProvider>
    </ThemeProvider>
  );
}

// export default function Login() {
//   return (
//     <LoginForm />
//   )
// }