"use client";

import React, { useState, useEffect } from 'react';
import styles from './parked-details.module.css';
import Navbar from '../../../ui/homenavbar/homenavbar';
import Image from 'next/image';
import QRCode from 'qrcode.react';
import Button from '../../../ui/button/button';
import { useRouter } from 'next/navigation';
import {image1} from '../../../../public/images/home.png'
import {image2} from '../../../../public/images/question-mark.png'

const ParkedDetails = () => {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const router = useRouter();

    const handleButtonClick = () => {
        router.push('/driver/parking-complete');
    };

    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/parking/parking-details`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    token:token
                  }
                }); 

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setDetails(data.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, []);

    if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error loading details</p>;

    if (!details) {
      return (
          <div className={styles.container}>
              <Navbar />
              <div className={styles.message}>
                        <div className={styles.images}>
                            <img
                            src="/images/home.png"  // Replace with your image path
                            alt="First Illustration"
                            className={styles.image}
                            />
                            
                        </div>
                        <p>Your vehicle does not seem to be parked. Ask the parking warden to scan your vehicle QR.</p>
                        </div>
          </div>
      );
  }
  

    const formatTime = (dateString) => {
      const date = new Date(dateString);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.maincont}>
                <div className={styles.vehicleDetails}>
                    <h1 className={styles.heading}>Your {details.vehicle_name} is Parked</h1>
                    <h1 className={styles.heading}>In {details.lot_name}</h1>
                    <Image
                        src="/images/home.png"
                        alt="Profile Picture"
                        className={styles.profilePic}
                        width={300}
                        height={300}
                    />
                    <div className={styles.vehicleInfo}>
                        <div className={styles.vehicleBasicInfo}>
                            <div className={styles.infoBlock}>
                                <h3>Vehicle Number</h3>
                                <p>{details.vehicle_number}</p>
                            </div>
                            <div className={styles.infoBlock}>
                                <h3>Parked Time</h3>
                                <p>{formatTime(details.in_time)}</p>
                            </div>
                            <div className={styles.infoBlock}>
                                <h3>Vehicle Type</h3>
                                <p>
                                  {details.type_id === 1
                                    ? "Car"
                                    : details.type_id === 2
                                    ? "Motorcycle"
                                    : details.type_id === 3
                                    ? "Three-Wheeler"
                                    : details.type_id === 4
                                    ? "Large Vehicle"
                                    : "Unknown Vehicle Type"}
                                </p>
                            </div>
                            <div className={styles.infoBlock}>
                                <h3>Price per Hour</h3>
                                <p>Rs 70/=</p>
                            </div>
                        </div>
                        <div className={styles.qr}>
                            <QRCode
                                value={`Vehicle: ${details.vehicle_id}, User: ${details.driver_id}`}
                                size={200}
                                includeMargin={true}
                            />
                            <div className={styles.qrpara}>
                                <p>Finished Parking?</p>
                                <p>Get scanned this QR Code</p>
                                <button className={styles.button} onClick={handleButtonClick}>
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.rightSection}>
                    <div className={styles.parkingLotDetails}>
                        <div className={styles.parking_details}>
                            <h2 className={styles.subHeading}>Parking Lot Details</h2>
                            <div className={styles.infoBlock}>
                                <h3>Lot Name</h3>
                                <p>{details.lot_name}</p>
                            </div>
                            <div className={styles.infoBlock}>
                                <h3>Location</h3>
                                <p>{details.lot_city}</p>
                            </div>
                        </div>
                        <Image
                            src="/images/parking-lot.jpg"
                            alt="Parking Lot"
                            className={styles.LotImage}
                            width={300}
                            height={300}
                        />
                    </div>
                    <div className={styles.wardenDetails}>
                        <div className={styles.warden_details}>
                            <h2 className={styles.subHeading}>Warden Details</h2>
                            <div className={styles.infoBlock}>
                                <h3>Name</h3>
                                <p>{details.warden_fname} {details.warden_lname}</p>
                            </div>
                            <div className={styles.infoBlock}>
                                <h3>Contact</h3>
                                <p>{details.warden_contact}</p>
                            </div>
                            <div className={styles.infoBlock}>
                                <h3>Hometown</h3>
                                <p>{details.warden_city}</p>
                            </div>
                        </div>
                        <Image
                            src="/images/profile-pic.jpg"
                            alt="Warden"
                            className={styles.LotImage}
                            width={200}
                            height={200}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParkedDetails;
