"use client"

import Link from 'next/link';
import React from 'react';
import styles from './links.module.css'
import { usePathname } from 'next/navigation';

const Links = () => {

    const pathname = usePathname()



  const links = [
    { title: "My Profile", path: "/profile" },
    { title: "Dashboard", path: "/dashboard" },
    { title: "Parking Slots", path: "/parkingslot" },
    { title: "Wardens", path: "/warden" }
  ];

  return (
    <div className="flex flex-col space-y-10 py-10">
      {links.map((link) => (
        <Link 
          href={link.path} 
          key={link.title} 
          className={`block px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white text-gray-800 text-justify ${pathname === link.path && styles.active}`}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
  
};

export default Links;
