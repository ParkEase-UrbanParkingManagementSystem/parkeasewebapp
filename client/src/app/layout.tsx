"use client"; // Marks this file as a Client Component

import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import {AuthProvider} from '../utils/authContext'


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  
  children,
}: Readonly<
{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
            {children}
        </AuthProvider>
      </body>
    </html>
  );
}
