"use client";

import React, { useState, useEffect } from "react";
// import Image from "next/image";
import Navbar from "@/ui/homenavbar/homenavbar";
import { Search, MapPin, Clock, Shield } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [parkingLots, setParkingLots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

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
        setError("No parking lots found.");
        setParkingLots([]);
      }
    } catch (err) {
      setError("Error fetching parking lots.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/driver/details`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      const parseRes = await response.json();

      if (response.ok) {
        setUserDetails(parseRes.data);
      } else {
        console.error("Can't get the details");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    handleSearch();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFD981] to-[#D1D2D5] font-sans">
      <Navbar />
      <div className="container mx-auto px-4 py-8 justify-content items-center">
        {!hasSearched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Hello{" "}
                <span className="text-green-700">
                  {userDetails?.fname || "Guest"}!
                </span>
              </h2>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Welcome to ParkEase!
              </h2>
              <p className="text-2xl text-gray-600">
                Find the perfect parking spot in seconds.
              </p>
              <p className="text-xl text-gray-600 mb-8">
                Enter your destination below to get started.
              </p>
            </div>
          </motion.div>
        )}

        <div className="flex justify-center mt-8 mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="relative w-full max-w-2xl">
              <input
                type="text"
                placeholder="Where to park?"
                className="w-full px-4 py-3 pr-10 text-base text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:border-yellow-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="absolute right-0 top-0 mt-3 mr-6 text-yellow-500 hover:text-yellow-600"
              >
                <Search className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        </div>

        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!hasSearched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center bg-white py-4 px-2 rounded-lg shadow-lg">
                <MapPin className="w-12 h-12 text-yellow-500 mb-2" />
                <h3 className="text-lg font-semibold mb-2">
                  Convenient Locations
                </h3>
                <p className="text-gray-700">
                  Find parking spots near your destination
                </p>
              </div>
              <div className="flex flex-col items-center bg-white py-4 px-2 rounded-lg shadow-lg">
                <Clock className="w-12 h-12 text-yellow-500 mb-2" />
                <h3 className="text-lg font-semibold mb-2">
                  Real-time Availability
                </h3>
                <p className="text-gray-700">
                  See up-to-date parking space information
                </p>
              </div>
              <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
                <Shield className="w-12 h-12 text-yellow-500 mb-2" />
                <h3 className="text-lg font-semibold mb-2">Secure Parking</h3>
                <p className="text-gray-700">
                  Park with peace of mind in safe locations
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {parkingLots.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {parkingLots.map((lot) => (
              <Link key={lot.lot_id} href={`/driver/${lot.lot_id}`} passHref>
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_KEY}/${lot.images[0]}`}
                    alt={`${lot.name}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {lot.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {lot.addressno}, {lot.street1}, {lot.street2}, {lot.city},{" "}
                      {lot.district}
                    </p>
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="font-medium text-gray-700">
                          Bike Capacity
                        </p>
                        <p className="text-green-600">
                          {lot.bike_capacity_available}/{lot.bike_capacity}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">
                          Car Capacity
                        </p>
                        <p className="text-green-600">
                          {lot.car_capacity_available}/{lot.car_capacity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
