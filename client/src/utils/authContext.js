// utils/AuthContext.js
"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Loading from '../ui/loading/loading'; // Import the Loading component

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state to handle the async check
  const router = useRouter();
  const pathname = usePathname();

  const setAuth = (isAuth) => {
    setIsAuthenticated(isAuth);
  };

  async function isAuth() {
    try {
      
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/auth/is-verify`, {
        method: "GET",
        headers: {token: token }
      });

      const parseRes = await response.json();
      setIsAuthenticated(parseRes === true);
    } catch (err) {
      console.error(err);
      setIsAuthenticated(false);
    } finally {
      setLoading(false); // Mark loading as complete
    }
  }

  useEffect(() => {
    isAuth();
  },[]);

 
  useEffect(() => {
    if (!loading && 
      !isAuthenticated && 
      pathname !== '/' && 
      pathname !== '/admin' &&
      pathname !== '/admin/allDrivers' &&
      pathname !== '/admin/allPmcs' &&
      pathname !== '/admin/transactions' &&
      pathname !== '/admin/allTransactions' &&
      pathname !== '/admin/parkingLocations/tileview' &&
      pathname !== '/select-user' && 
      pathname !== '/register-pmc' &&
      pathname !== '/contact' && 
      pathname !== '/adminc' &&  
      pathname!== '/register' && 
      !pathname.startsWith('/admin/')) {

      router.push('/login'); // Redirect to login if not authenticated and loading is complete
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <Loading />; // You can add a better loading UI here
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
