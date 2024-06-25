"use client";
import React, { useState } from 'react';
import Links from '@/ui/pmcNavbar/links/Links'; // Adjust the path based on your project structure
import "./pmcnavbar.module.css";
import { useAuth } from '../../utils/authContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';



const Navbar = () => {
  const router = useRouter();
  const { isAuthenticated, setAuth } = useAuth();  
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    router.push('/login');
  }


  return (
    <div className="p-4 flex justify-between items-center bg-yellow-400 rounded-lg">
      <div className="">
        <Image src="/images/logo.png" alt="Logo" width={60} height={80} />
      </div>
      <div className="flex items-center">
        
        <div className="relative">
          <button 
            onClick={toggleDropdown} 
            className="text-white ml-4 focus:outline-none"
          >
            ☰ {/* This is a simple icon; you can use a more stylish icon as needed */}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-lg">
              <a 
                href="/profile" 
                className="block px-4 py-2 text-gray-800 hover:bg-yellow-400 hover:text-white"
              >
                View Profile
              </a>
              <a onClick={e=>handleLogout(e)}
                
                className="block px-4 py-2 text-gray-800 hover:bg-yellow-400 hover:text-white"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
