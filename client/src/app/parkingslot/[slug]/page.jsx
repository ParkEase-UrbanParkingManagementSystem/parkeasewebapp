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
  faEdit, // Import the edit icon
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import ActionButton from "../../../ui/button/newButton";

library.add(faCar, faMotorcycle, faClock, faTruck, faPlus, faEdit);

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
  const { slug } = useParams();

  useEffect(() => {
    if (!slug) return;

    const fetchParkingLotDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_KEY}/parkinglots/${slug}`,
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

  const handleStatus = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/parkinglots/inactive/${slug}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to set parking lot status to inactive");
      }

      // Fetch the updated parking lot details
      await fetchParkingLotDetails();

      // Update the state to reflect the new status
      setParkingLotDetails((prevDetails) => ({
        ...prevDetails,
        lot: {
          ...prevDetails.lot,
          status: "Inactive",
        },
      }));
      alert("Parking lot status set to Inactive successfully");
    } catch (error) {
      console.error("Error setting parking lot status to inactive:", error);
      // setError("Failed to set parking lot status to inactive");
    }
  };

  const handleActivate = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/parkinglots/active/${slug}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to set parking lot status to active");
      }

      // Fetch the updated parking lot details
      await fetchParkingLotDetails();

      // Update the state to reflect the new status
      setParkingLotDetails((prevDetails) => ({
        ...prevDetails,
        lot: {
          ...prevDetails.lot,
          status: "active",
        },
      }));
      alert("Parking lot status set to Active successfully");
    } catch (error) {
      console.error("Error setting parking lot status to active:", error);
      // setError("Failed to set parking lot status to active");
    }
  };

  if (!parkingLotDetails) {
    return <div>Loading...</div>;
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
                <h2 className="font-semibold">{parkingLotDetails.lot.name}</h2>
                <h3 className="mb-2">Parking Lot ID - <span className="font-bold">L{`${parkingLotDetails.lot.lot_id.substring(0,4).toUpperCase()}`}</span></h3>
                <p>
                  <span>Status: </span>
                  <span
                    className={
                      parkingLotDetails.lot.status === "active"
                        ? styles.statusActive
                        : styles.statusInactive
                    }
                  >
                    {parkingLotDetails.lot.status === "active"
                      ? "Active"
                      : "Inactive"}
                  </span>
                </p>
              </div>
            </div>
            <div className={styles.headerDescription}>
              <p>{parkingLotDetails.lot.description}</p>
              {parkingLotDetails.lot.status === "active" && (
                <ActionButton label="Inactive" onClick={handleStatus} />
              )}
              {parkingLotDetails.lot.status === "Inactive" && (
                <ActionButton label="Activate" onClick={handleActivate} />
              )}
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
                  <label>Active Time</label>
                  <p>
                    <FontAwesomeIcon icon={faClock} /> 8.00AM to 8.00PM
                  </p>
                </div>
              </div>
              <div className={styles.detailColumn}>
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
                      {slot.type === "tw" && (
                        <div className="flex items-center">
                          <img
                            src="/images/tuk-tuk.png"
                            className="w-6 h-5 mr-1 opacity-70"
                          />
                          {slot.amount_per_slot}
                        </div>
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
                    </p>
                  ))}
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
                <FontAwesomeIcon icon={faMotorcycle} className={styles.icon} />
                &nbsp; <strong>6</strong>:
                <span className={styles.totalSlots}>
                  {parkingLotDetails.lot.bike_capacity}
                </span>
              </div>
              <div className={styles.card}>
                <img src="/images/tuk-tuk.png" className={styles.icon} />
                &nbsp; <strong>6</strong>:
                <span className={styles.totalSlots}>
                  {parkingLotDetails.lot.tw_capacity}
                </span>
              </div>
              <div className={styles.card}>
                <FontAwesomeIcon icon={faCar} className={styles.icon} />
                &nbsp; <strong>5</strong>:
                <span className={styles.totalSlots}>
                  {parkingLotDetails.lot.car_capacity}
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

      <div className={styles.reviewsOuterCont}>
        {parkingLotDetails.reviews && parkingLotDetails.reviews.length > 0 && (
          <div className={styles.reviewsContainer}>
            <h1 className="text-[20px] font-semibold">
              Reviews and Ratings for {parkingLotDetails.lot.name}
            </h1>
            {parkingLotDetails.reviews.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <h4 className={styles.reviewRating}>
                  Rating: {renderStars(review.rating)}
                </h4>
                <p className={styles.reviewText}>{review.review}</p>
                <p className={styles.reviewDate}>
                  Reviewed on:{" "}
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ParkingSlotDetail;
