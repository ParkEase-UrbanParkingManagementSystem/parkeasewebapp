'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/ui/homenavbar/homenavbar';
import { Search, MapPin, Clock, Shield } from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [parkingLots, setParkingLots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery) return;
  
    setLoading(true);
    setError(null);
    setHasSearched(true);
  
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/parking/get-parking-lots-map-web?search=${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      const data = await response.json();
  
      if (response.ok) {
        setParkingLots(data);
      } else {
        setError('No parking lots found.');
        setParkingLots([]);
      }
    } catch (err) {
      setError('Error fetching parking lots.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFD981] to-[#D1D2D5] font-sans">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <Image
            src="/images/Group 178.png"
            alt="ParkEase Logo"
            width={150}
            height={50}
            className="w-auto h-12 md:h-16"
          />
        </div>

        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Where to park?"
              className="w-full px-4 py-2 pr-10 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:border-yellow-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              onClick={handleSearch}
              className="absolute right-0 top-0 mt-2 mr-3 text-yellow-500 hover:text-yellow-600"
            >
              <Search className="w-6 h-6" />
            </button>
          </div>
        </div>

        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!hasSearched && (
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to ParkEase</h2>
            <p className="text-xl text-gray-600 mb-8">Find the perfect parking spot in seconds. Enter your destination above to get started.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <MapPin className="w-12 h-12 text-yellow-500 mb-2" />
                <h3 className="text-lg font-semibold mb-2">Convenient Locations</h3>
                <p className="text-gray-600">Find parking spots near your destination</p>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="w-12 h-12 text-yellow-500 mb-2" />
                <h3 className="text-lg font-semibold mb-2">Real-time Availability</h3>
                <p className="text-gray-600">See up-to-date parking space information</p>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="w-12 h-12 text-yellow-500 mb-2" />
                <h3 className="text-lg font-semibold mb-2">Secure Parking</h3>
                <p className="text-gray-600">Park with peace of mind in safe locations</p>
              </div>
            </div>
          </div>
        )}

        {parkingLots.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {parkingLots.map((lot) => (
              <div key={lot.lot_id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                <img
                  src={`${process.env.NEXT_PUBLIC_API_KEY}/${lot.images[0]}`}
                  alt={`${lot.name}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{lot.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {lot.addressno}, {lot.street1}, {lot.street2}, {lot.city}, {lot.district}
                  </p>
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium text-gray-700">Bike Capacity</p>
                      <p className="text-green-600">{lot.bike_capacity_available}/{lot.bike_capacity}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Car Capacity</p>
                      <p className="text-green-600">{lot.car_capacity_available}/{lot.car_capacity}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

