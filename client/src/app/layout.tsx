"use client"; // Marks this file as a Client Component

import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { AuthProvider, useAuth } from "../utils/authContext"; // Ensure useAuth is exported from authContext
import Footer from "../ui/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <LayoutWithAuth>{children}</LayoutWithAuth>
        </AuthProvider>
      </body>
    </html>
  );
}

function LayoutWithAuth({ children }: { children: React.ReactNode }) {
  // const { isAuthenticated } = useAuth(); // Accessing the auth state

  return (
    <>
      {children}
      {/* <Footer /> */}
    </>
  );
}
