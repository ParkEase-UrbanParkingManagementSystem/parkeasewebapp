"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faMotorcycle,
  faClock,
  faTruck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation"; // Import useParams
import ToggleSwitch from "@/ui/toggleSwitch/ToggleSwitch"

library.add(faCar, faMotorcycle, faClock, faTruck);

const ParkingSlotDetail = () => {

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? styles.starOn : styles.starOff}>
          &#9733;
        </span>
      );
    }
    return stars;
  };
  
  const [parkingLotDetails, setParkingLotDetails] = useState(null);
  const router = useRouter();

  const { slug } = useParams(); // Extract slug from route parameters

  useEffect(() => {
    if (!slug) return; // Do nothing if slug is not available

    const fetchParkingLotDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login"); // Redirect to login if no token found
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_KEY}/parkinglots/${slug}`, // Use the slug in the URL

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
          setParkingLotDetails(parseRes.data);
        } else {
          console.error("Can't get the details");
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchParkingLotDetails();
  }, [slug, router]);

  

  if (!parkingLotDetails) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }


  return (
    <div className={styles.container}>
      <div className={styles.heading}>Parking Lot Details</div>
      <div className={styles.profile}>
        <div className={styles.profiledetail}>
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <img
                src="/images/parking-lot.jpg"
                alt="Parking Lot"
                className={styles.headerImage}
              />
              <div className={styles.headerText}>
                <h2 className="font-semibold">{`${parkingLotDetails.lot.name}`}</h2>
                <h3 className="mb-2">{`L-${parkingLotDetails.lot.lot_id}`}</h3>
                <p>
                  <span>Status: </span>
                  <span
                    className={
                      parkingLotDetails.lot.status === "Inactive"
                        ? styles.statusInactive
                        : styles.statusActive
                    }
                  >
                    {parkingLotDetails.lot.status === "Inactive"
                      ? "Inactive"
                      : "Active"}
                  </span>
                </p>
              </div>
            </div>
            <div className={styles.headerDescription}>
              <p>{parkingLotDetails.lot.description}</p>
            </div>
          </div>
          <div className={styles.details}>
            <div className={styles.detailColumns}>
              <div className={styles.detailColumn}>
                <div className={styles.detail}>
                  <label>Assigned Warden</label>
                  {parkingLotDetails.warden &&
                  parkingLotDetails.warden.fname &&
                  parkingLotDetails.warden.lname ? (
                    <p>{`${parkingLotDetails.warden.fname} ${parkingLotDetails.warden.lname}`}</p>
                  ) : (
                    <p>No Warden Assigned</p>
                  )}
                </div>
                <div className={styles.detail}>
                  <label>Number of Slots</label>
                  <p>Total : {parkingLotDetails.lot.full_capacity}</p>
                  <p>
                    <FontAwesomeIcon icon={faCar} />{" "}
                    {parkingLotDetails.lot.car_capacity}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faMotorcycle} />{" "}
                    {parkingLotDetails.lot.bike_capacity}
                  </p>
                  <div className="flex items-center opacity-70">
                    <img
                      src="/images/tuk-tuk.png"
                      className="w-6 h-5 mr-1"
                      alt="Tuk Tuk"
                    />
                    <span>{parkingLotDetails.lot.tw_capacity}</span>
                  </div>
                  <p>
                    <FontAwesomeIcon icon={faTruck} />{" "}
                    {parkingLotDetails.lot.xlvehicle_capacity}
                  </p>
                </div>
                <div className={styles.detail}>
                  <label>Prices per Hour</label>
                  {parkingLotDetails.slotPrices.map((slot, i) => (
                    <p key={i}>
                      {slot.type === "bike" && (
                        <>
                          <FontAwesomeIcon icon={faMotorcycle} />{" "}
                          {slot.amount_per_slot}
                        </>
                      )}
                      {slot.type === "car" && (
                        <>
                          <FontAwesomeIcon icon={faCar} />{" "}
                          {slot.amount_per_slot}
                        </>
                      )}
                      {slot.type === "lorry" && (
                        <>
                          <FontAwesomeIcon icon={faTruck} />{" "}
                          {slot.amount_per_slot}
                        </>
                      )}
                      {slot.type === "tw" && (
                        <div className="flex items-center">
                          <img
                            src="/images/tuk-tuk.png"
                            className="w-6 h-5 mr-1 opacity-70"
                          />
                          {slot.amount_per_slot}
                        </div>
                      )}
                    </p>
                  ))}
                </div>
              </div>
              <div className={styles.detailColumn}>
                <div className={styles.detail}>
                  <label>Active Time</label>
                  <p>
                    <FontAwesomeIcon icon={faClock} /> 8.00AM to 8.00PM
                  </p>
                </div>
                <div className={styles.detail}>
                  <label>Address</label>

                  <p>
                    {`${parkingLotDetails.lot.addressno}, ${parkingLotDetails.lot.street1}, ${parkingLotDetails.lot.street2}, ${parkingLotDetails.lot.city}, ${parkingLotDetails.lot.district}`}
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.lotpics}>
          <div className={styles.slotcardcontainer}>
            <p>Occupied Slots: (right now)</p>
            <div className={styles.slotcard}>
              <div className={styles.card}>
                <FontAwesomeIcon icon={faCar} className={styles.icon} />
                &nbsp; <strong>5</strong>:
                <span className={styles.totalSlots}>
                  {parkingLotDetails.lot.car_capacity}
                </span>
              </div>
              <div className={styles.card}>
                <FontAwesomeIcon icon={faMotorcycle} className={styles.icon} />
                &nbsp; <strong>6</strong>:
                <span className={styles.totalSlots}>
                  {parkingLotDetails.lot.bike_capacity}
                </span>
              </div>
              <div className={styles.card}>
                <FontAwesomeIcon icon={faTruck} className={styles.icon} />
                &nbsp; <strong>1</strong>:
                <span className={styles.totalSlots}>
                  {parkingLotDetails.lot.xlvehicle_capacity}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.picscard}>
            <p>Add More Location Pictures:</p>
            <div className={styles.galleryContainer}>
              <div className={styles.gallery}>
                <img src="/images/parking-lot.jpg" />
                <img src="/images/parking-lot.jpg" />
                <img src="/images/parking-lot.jpg" />
              </div>
              <div className={styles.gallerysquare}>
                <FontAwesomeIcon
                  icon={faPlus}
                  className="w-16 h-16 opacity-10"
                />
              </div>
            </div>
            <p>Parking Lot Location Sketch:</p>
            <img src="/images/lot.png" className="w-72" />
          </div>
          
        </div>

       




      </div>

      
{/* <div className=" mt-3">
        <div className="flex items-center mb-2 ">
        <svg
          className="w-8 h-8 text-yellow-300 me-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <svg
          className="w-8 h-8 text-yellow-300 me-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <svg
          className="w-8 h-8 text-yellow-300 me-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <svg
          className="w-8 h-8 text-yellow-300 me-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <svg
          className="w-8 h-8 text-gray-300 me-1 dark:text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">4.95</p>
        <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
        <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
      </div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">19 ratings</p>
      <div className="flex items-center mt-4">
        <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">
          5 star
        </a>
        <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
          <div className="h-5 bg-yellow-300 rounded" style={{ width: "70%" }}></div>
        </div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">70%</span>
      </div>
      <div className="flex items-center mt-4">
        <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">
          4 star
        </a>
        <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
          <div className="h-5 bg-yellow-300 rounded" style={{ width: "17%" }}></div>
        </div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">17%</span>
      </div>
      <div className="flex items-center mt-4">
        <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">
          3 star
        </a>
        <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
          <div className="h-5 bg-yellow-300 rounded" style={{ width: "8%" }}></div>
        </div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">8%</span>
      </div>
      <div className="flex items-center mt-4">
        <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">
          2 star
        </a>
        <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
          <div className="h-5 bg-yellow-300 rounded" style={{ width: "4%" }}></div>
        </div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">4%</span>
      </div>
      <div className="flex items-center mt-4">
        <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">
          1 star
        </a>
        <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
          <div className="h-5 bg-yellow-300 rounded" style={{ width: "1%" }}></div>
        </div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">1%</span>
      </div>

      </div> */}

<div className={styles.reviewsOuterCont}>
      {parkingLotDetails.reviews && parkingLotDetails.reviews.length > 0 && (
        <div className={styles.reviewsContainer}>
          <h1 className="text-[20px] font-semibold">Reviews and Ratings for {parkingLotDetails.lot.name}</h1>
          {parkingLotDetails.reviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <h4 className={styles.reviewRating}>Rating: {renderStars(review.rating)}</h4>
              <p className={styles.reviewText}>{review.review}</p>
              <p className={styles.reviewDate}>Reviewed on: {new Date(review.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>




    </div>
  );
};

export default ParkingSlotDetail;
