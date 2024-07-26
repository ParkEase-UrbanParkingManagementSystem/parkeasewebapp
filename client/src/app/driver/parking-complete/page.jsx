"use client";

import React, { useState } from 'react';
import styles from './parked-details.module.css';
import Navbar from '../../../ui/homenavbar/homenavbar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ParkedComplete = () => {
  const [parkingRating, setParkingRating] = useState(0);
  const [parkingReview, setParkingReview] = useState("");
  const [wardenRating, setWardenRating] = useState(0);
  const [wardenReview, setWardenReview] = useState("");

  const handleParkingRating = (newRating) => {
    setParkingRating(newRating);
  };

  const handleParkingReviewChange = (e) => {
    setParkingReview(e.target.value);
  };

  const handleWardenRating = (newRating) => {
    setWardenRating(newRating);
  };

  const handleWardenReviewChange = (e) => {
    setWardenReview(e.target.value);
  };

  const handleParkingSubmit = (e) => {
    e.preventDefault();
    // Handle parking review form submission logic here
  };

  const handleWardenSubmit = (e) => {
    e.preventDefault();
    // Handle warden review form submission logic here
  };

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
          <Image
            src="/images/Parking-rafiki 1.png"
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
                <Image
                  src="/images/pickpayment.png"
                  alt="Profile Picture"
                  className={styles.profilePic}
                  width={100}
                  height={100}
                />
                <button className={styles.button} onClick={handleButtonClick}>Proceed to payment</button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.parkingLotDetails}>
            <h2 className={styles.subHeading}>Nugegoda Parking Lot</h2>
            <p>You can add a rating and a review based on your experience</p>
            <form onSubmit={handleParkingSubmit} className={styles.reviewForm}>
              <div className={styles.starRating}>
                {[...Array(5)].map((star, index) => {
                  index += 1;
                  return (
                    <button
                      type="button"
                      key={index}
                      className={index <= parkingRating ? styles.on : styles.off}
                      onClick={() => handleParkingRating(index)}
                    >
                      <span className="star">&#9733;</span>
                    </button>
                  );
                })}
              </div>
              <textarea
                className={styles.reviewInput}
                placeholder="Add your review here..."
                value={parkingReview}
                onChange={handleParkingReviewChange}
              />
              <button type="submit" className={styles.submitButton}>
                Submit Review
              </button>
            </form>
          </div>
          <div className={styles.wardenDetails}>
            <h2 className={styles.subHeading}>Saman Perera</h2>
            <p>You can add a rating and a review for the warden based on your experience</p>
            <form onSubmit={handleWardenSubmit} className={styles.reviewForm}>
              <div className={styles.starRating}>
                {[...Array(5)].map((star, index) => {
                  index += 1;
                  return (
                    <button
                      type="button"
                      key={index}
                      className={index <= wardenRating ? styles.on : styles.off}
                      onClick={() => handleWardenRating(index)}
                    >
                      <span className="star">&#9733;</span>
                    </button>
                  );
                })}
              </div>
              <textarea
                className={styles.reviewInput}
                placeholder="Add your review here..."
                value={wardenReview}
                onChange={handleWardenReviewChange}
              />
              <button type="submit" className={styles.submitButton}>
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkedComplete;
