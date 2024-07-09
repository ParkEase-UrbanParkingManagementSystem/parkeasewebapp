"use client"

import Link from 'next/link';
import React from 'react';
import styles from './links.module.css';
import { usePathname } from 'next/navigation';
import { useAuth } from "../../../utils/authContext"
import { useRouter } from 'next/navigation';

const Links = () => {
  const pathname = usePathname();
  const { setAuth } = useAuth();
  const router = useRouter();

  const links = [
    { title: "View Profile", path: "/profile" },
    { title: "Dashboard", path: "/dashboard" },
    { title: "Parking Lots", path: "/parkingslot" },
    { title: "Wardens", path: "/warden" }
  ];

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    router.push('/login');
  };

  return (
    <div className="flex flex-col space-y-2">
      {links.map((link) => (
        <Link 
          href={link.path} 
          key={link.title} 
          className={`block px-4 py-2 rounded-lg hover:bg-gray-200 hover:text-black text-gray-800 text-justify ${pathname === link.path && styles.active}`}
        >
          {link.title}
        </Link>
      ))}
      <button 
        onClick={handleLogout} 
        className="block px-4 py-2 rounded-lg hover:bg-gray-200 hover:text-black text-gray-800 text-justify"
      >
        Log Out
      </button>
    </div>
  );
};

export default Links;
