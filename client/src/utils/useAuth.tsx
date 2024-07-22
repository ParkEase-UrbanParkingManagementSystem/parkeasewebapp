import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  const setAuth = (isAuth: boolean) => {
    setIsAuthenticated(isAuth);
  };

  async function isAuth() {
    try {
      console.log("Is auth eka ayewef diwwa")
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token }
      });

      const parseRes = await response.json();
      setIsAuthenticated(parseRes === true);
    } catch (err) {
      console.error(err);
      setIsAuthenticated(false);
    }
  }

  useEffect(() => {
    isAuth();
  }, [localStorage.token]); // Add token as a dependency

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return { isAuthenticated, setAuth };
};

export default useAuth;
