'use client'
import '../globals.css'
import PasswordLogin from '../../components/PasswordLogin'
import { ThemeProvider } from '../lib/ThemeContext'
import { EmailProvider } from '../lib/EmailContext'

export default function PasswordPage() {
    return (
        <PasswordLogin />
    )
}