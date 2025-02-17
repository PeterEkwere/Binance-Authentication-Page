"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./lib/ThemeContext";
import { EmailProvider } from "./lib/EmailContext";
import { CommandProvider } from './lib/CommandContext';



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <EmailProvider>
        <CommandProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </CommandProvider>
        </EmailProvider>
      </body>
    </html>
  );
}
