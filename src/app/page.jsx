'use client'
import './globals.css'
import LoginForm from './components/LoginForm'
import { ThemeProvider } from './lib/ThemeContext'
import { EmailProvider } from './lib/EmailContext' // Add this import

export default function Login() {
  return (
    <LoginForm />
  )
}