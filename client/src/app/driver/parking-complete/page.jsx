"use client";

import React, { useState, useEffect } from 'react';
import styles from './parked-details.module.css';
import Navbar from '../../../ui/homenavbar/homenavbar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ParkedComplete = () => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

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

  const handleParkingSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/reviews/parking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token')
        },
        body: JSON.stringify({
          driver_id: details.driver_id,
          lot_id: details.lot_id,
          rating: parkingRating,
          review: parkingReview
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit parking review');
      }

      alert('Parking review submitted successfully');
    } catch (err) {
      console.error(err);
      alert('Error submitting parking review');
    }
  };

  const handleWardenSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/reviews/warden`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token')
        },
        body: JSON.stringify({
          driver_id: details.driver_id,
          warden_id: details.warden_id,
          rating: wardenRating,
          review: wardenReview
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit warden review');
      }

      alert('Warden review submitted successfully');
    } catch (err) {
      console.error(err);
      alert('Error submitting warden review');
    }
  };

  const handleButtonClick = () => {
    router.push('/driver');
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/parking/parked-details`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token: token
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
  if (error) return <p>Error loading details</p>;

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
          <h1 className={styles.heading}>{details.vehicle_name} - Parking Complete!</h1>
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
                <p>{details.vehicle_number}</p>
              </div>
              <div className={styles.infoBlock}>
                <h3>Vehicle Type</h3>
                <p>{details.type_id === 1
                  ? "Car"
                  : details.type_id === 2
                    ? "Motorcycle"
                    : details.type_id === 3
                      ? "Three-Wheeler"
                      : details.type_id === 4
                        ? "Large Vehicle"
                        : "Unknown Vehicle Type"}</p>
              </div>
              {/* <div className={styles.infoBlock}>
                <h3>Total Parked Time</h3>
                <p>{details.out_time}</p>
              </div> */}
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
            <h2 className={styles.subHeading}>{details.lot_name}</h2>
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
            <h2 className={styles.subHeading}>{details.warden_fname} {details.warden_lname}</h2>
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
