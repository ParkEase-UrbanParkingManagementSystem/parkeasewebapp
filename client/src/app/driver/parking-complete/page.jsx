"use client"

import React from 'react';
import styles from './parked-details.module.css';
import Navbar from '../../../ui/homenavbar/homenavbar';
import Image from 'next/image';
import QRCode from 'qrcode.react';
import Button from '../../../ui/button/button'
import { useRouter } from 'next/navigation';

const ParkedComplete = () => {
  const handleButtonClick = () => {
    router.push('/driver');
  };

  const router = useRouter();

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.maincont}>
        <div className={styles.vehicleDetails}>
          <h1 className={styles.heading}>Parking Complete!</h1>
          <h1 className={styles.heading}>Enjoy your day!</h1>
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
            <p>KN - 5410</p>
          </div>
          
          <div className={styles.infoBlock}>
            <h3>Vehicle Type</h3>
            <p>Car</p>
          </div>

          <div className={styles.infoBlock}>
            <h3>Total Parked Time</h3>
            <p>52 Minutes</p>
          </div>

          <div className={styles.infoBlock}>
            <h3>Price</h3>
            <p>Rs.70/=</p>
          </div>
     </div>

     <div className={styles.qr}>

<div className={styles.qrpara}>

    
    <button className={styles.button} onClick={handleButtonClick}>Proceed to payment</button>
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
              <p>Nugegoda Parking Lot</p>
            </div>
            <div className={styles.infoBlock}>
              <h3>Location</h3>
              <p>123, Nugegoda Rd, Nugegoda</p>
            </div>
          </div>

          <Image
              src="/images/parking-lot.jpg" // Add image for warden
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
              <p>Saman Perera</p>
            </div>
            <div className={styles.infoBlock}>
              <h3>Contact</h3>
              <p>077 107 0123</p>
            </div>
            <div className={styles.infoBlock}>
              <h3>Hometown</h3>
              <p>Kandy</p>
            </div>
            </div>

            <Image
              src="/images/profile-pic.jpg" // Add image for warden
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

export default ParkedComplete;
