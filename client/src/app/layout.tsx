"use client"; // Marks this file as a Client Component

import { Inter } from "next/font/google";
import "./globals.css";
import useAuth from '../utils/useAuth'; // Import the custom hook

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = useAuth(); // Use the custom hook

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
