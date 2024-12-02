'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './testt.module.css';

import Navbar from '@/ui/homenavbar/homenavbar';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [parkingLots, setParkingLots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle the search action
  const handleSearch = async () => {
    if (!searchQuery) return;
  
    setLoading(true);
    setError(null);
  
    try {
      const token = localStorage.getItem("token"); // Ensure the token is fetched
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/parking/get-parking-lots-map-web?search=${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token, // Pass token if required for authentication
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
    <div>
        <Navbar />
    <div className={styles.homePage}>
      <div className={styles.logoWrapper}>
        <Image
          src="/images/Group 178.png" // Add your logo here
          alt="ParkEase Logo"
          width={150}
          height={50}
          className={styles.logo}
        />
      </div>

      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Where to park?"
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}

      <div className={styles.parkingList}>
        {parkingLots.length > 0 && (
          <ul>
            {parkingLots.map((lot) => (
              <li key={lot.lot_id} className={styles.parkingLot}>
                <h3>{lot.name}</h3>
                <p>{lot.addressno}, {lot.street1}, {lot.city}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </div>
  );
}
