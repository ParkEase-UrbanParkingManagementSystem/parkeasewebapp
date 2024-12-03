"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faMotorcycle,
  faClock,
  faPlus,
  faTruck,
  faEdit, // Import the edit icon
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import ActionButton from "../../../ui/button/newButton";

library.add(faCar, faMotorcycle, faClock, faPlus, faEdit, faTruck);

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
  const [parkingLotRevenue, setParkingLotRevenue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("daily"); // Default period
 


  const router = useRouter();
  const { slug } = useParams();

  useEffect(() => {
    if (!slug) return;

    const fetchParkingLotDetails = async () => {
      const token = localStorage.getItem("token");

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



    const fetchParkingLotRevenue = async () => {
      setLoading(true);
      setError("");
    
      const token = localStorage.getItem("token");
    
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_KEY}/parkinglots/revenue/${slug}`,
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
          setParkingLotRevenue(parseRes.data);
        } else {
          setError("Can't fetch the revenue details.");
          console.error("Error:", parseRes.message || "Unknown error");
        }
      } catch (err) {
        setError("Failed to fetch revenue. Please try again.");
        console.error("Error:", err.message);
      } finally {
        setLoading(false);
      }
    };
    






    fetchParkingLotRevenue();
    fetchParkingLotDetails();
  }, [slug, router]);

  const handleStatus = async () => {
    const token = localStorage.getItem("token");

    // Check if the parking lot has assigned wardens
    const hasAssignedWardens =
      parkingLotDetails.warden &&
      parkingLotDetails.warden.fname &&
      parkingLotDetails.warden.lname;

    if (hasAssignedWardens) {
      // Show an error message and abort the function
      alert(
        "You cannot set this parking lot status to Inactive because there are assigned wardens."
      );
      return;
    }

    // Ask for confirmation before proceeding
    const confirmed = window.confirm(
      "Are you sure you want to set this parking lot status to Inactive? Click OK to proceed or Cancel to abort."
    );

    if (!confirmed) {
      return; // Abort the function if the user clicks Cancel
    }
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

      // // Fetch the updated parking lot details
      // await fetchParkingLotDetails();

      // // Update the state to reflect the new status
      // setParkingLotDetails((prevDetails) => ({
      //   ...prevDetails,
      //   lot: {
      //     ...prevDetails.lot,
      //     status: "Inactive",
      //   },
      // }));
      // Notify the user and reload the page
      alert(
        "Parking lot status set to Inactive successfully. Click OK to refresh the page."
      );
      window.location.reload();
    } catch (error) {
      console.error("Error setting parking lot status to inactive:", error);
      // setError("Failed to set parking lot status to inactive");
    }
  };

  const handleActivate = async () => {
    const token = localStorage.getItem("token");
    // Ask for confirmation before proceeding
    const confirmed = window.confirm(
      "Are you sure you want to set this parking lot status to Active? Click OK to proceed or Cancel to abort."
    );

    if (!confirmed) {
      return; // Abort the function if the user clicks Cancel
    }
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

      // // Fetch the updated parking lot details
      // await fetchParkingLotDetails();

      // // Update the state to reflect the new status
      // setParkingLotDetails((prevDetails) => ({
      //   ...prevDetails,
      //   lot: {
      //     ...prevDetails.lot,
      //     status: "active",
      //   },
      // }));
      // Notify the user and reload the page
      alert(
        "Parking lot status set to Active successfully. Click OK to refresh the page."
      );
      window.location.reload();
    } catch (error) {
      console.error("Error setting parking lot status to active:", error);
      // setError("Failed to set parking lot status to active");
    }
  };

  const defaultImage = "/images/parking-lot.jpg";

  const headerImageSrc =
    parkingLotDetails && parkingLotDetails.lot.images.length > 0
      ? `${
          process.env.NEXT_PUBLIC_API_KEY
        }/uploads/${parkingLotDetails.lot.images[0]
          .replace(/\\/g, "/")
          .split("/")
          .pop()}`
      : defaultImage;

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
              <div className={styles.initials}>
                {parkingLotDetails.lot.name.slice(0, 2).toUpperCase()}
              </div>
              <div className={styles.headerText}>
                <h2 className="font-semibold">{parkingLotDetails.lot.name}</h2>
                <h3 className="mb-2">
                  Parking Lot ID -{" "}
                  <span className="font-bold">
                    L
                    {`${parkingLotDetails.lot.lot_id
                      .substring(0, 4)
                      .toUpperCase()}`}
                  </span>
                </h3>
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
                      ? "Active" :
                      parkingLotDetails.lot.status === "banned"? "Banned"
                      :
                      parkingLotDetails.lot.status === "not_approved"? "Not Approved"
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
                  <p className="font-semibold">
                    Total: {parkingLotDetails.lot.full_capacity}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faCar} />{" "}
                    {parkingLotDetails.lot.car_capacity}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faMotorcycle} />{" "}
                    {parkingLotDetails.lot.bike_capacity}
                  </p>
                </div>
              </div>


             




              <div className={styles.detailColumn}>
                <div className={styles.detail}>
                  <label>Prices per Hour</label>
                  {parkingLotDetails.slotPrices.map((slot, i) => (
                    <p key={i}>
                      {slot.type_name === "Bike" && (
                        <>
                          <FontAwesomeIcon icon={faMotorcycle} />{" "}
                          {slot.amount_per_vehicle}
                        </>
                      )}
                      {slot.type_name === "ThreeWheeler" && (
                        <div className="flex items-center">
                          <img
                            src="/images/tuk-tuk.png"
                            className="w-6 h-5 mr-1 opacity-70"
                          />
                          {slot.amount_per_vehicle}
                        </div>
                      )}
                      {slot.type_name === "Car" && (
                        <>
                          <FontAwesomeIcon icon={faCar} />{" "}
                          {slot.amount_per_vehicle}
                        </>
                      )}
                      {slot.type_name === "Large Vehicle" && (
                        <>
                          <FontAwesomeIcon icon={faTruck} />{" "}
                          {slot.amount_per_vehicle}
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
                {/* change the slot availablity */}
                &nbsp; <strong>{parkingLotDetails.lot.bike_capacity_available || 0}</strong>/
                <span className={styles.totalSlots}>
                  {parkingLotDetails.lot.bike_capacity}
                </span>
              </div>
              <div className={styles.card}>
                <FontAwesomeIcon icon={faCar} className={styles.icon} />
                {/* change the slot availablity */}
                &nbsp; <strong>{parkingLotDetails.lot.car_capacity_available || 0}</strong> / 
                <span className={styles.totalSlots}>
                  {parkingLotDetails.lot.car_capacity}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.picscard}>
            <p>
              {parkingLotDetails.lot.images.length >= 10
                ? "Parking Lot Location Images:"
                : "Add More Location Pictures:"}
            </p>
            <div className={styles.galleryContainer}>
              <div className={styles.gallery}>
                {parkingLotDetails.lot.images.map((image, index) => (
                  <div key={index} className={styles.galleryItem}>
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_KEY}/uploads/${image
                        .replace(/\\/g, "/")
                        .split("/")
                        .pop()}`} // Corrected path
                      alt={`Parking Lot Image ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.galleryContainer}>
              {/* <div className={styles.gallery}> */}
              <p>Parking Lot Sketch:</p>
              {parkingLotDetails.lot.sketch && (
                <div className={styles.galleryItem}>
                  <img
                    src={`${
                      process.env.NEXT_PUBLIC_API_KEY
                    }/uploads/${parkingLotDetails.lot.sketch
                      .replace(/\\/g, "/")
                      .split("/")
                      .pop()}`} // Corrected path
                    alt="Parking Lot Sketch"
                  />
                </div>
              )}
              {/* </div> */}
            </div>
          </div>
        </div>

        <div className={styles.reviewsOuterCont}>
          {parkingLotDetails.reviews &&
            parkingLotDetails.reviews.length > 0 && (
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

<div className="flex flex-col self-center justify-center text-center gap-5 border-2 border-slate-300 rounded-xl py-6">
        <div className="revenue-section flex flex-col custom-box">
  <h2 className={styles.titleh2}>Revenue Overview</h2>
  <div className="revenue-buttons flex flex-row text-center justify-center gap-3">
    <button
      onClick={() => setSelectedPeriod("daily")}
      disabled={loading}
      className={styles.button}
    >
      Daily
    </button>
    <button
      onClick={() => setSelectedPeriod("monthly")}
      disabled={loading}
      className={styles.button}
    >
      Monthly
    </button>
    <button
      onClick={() => setSelectedPeriod("yearly")}
      disabled={loading}
      className={styles.button}
    >
      Yearly
    </button>
  </div>
  </div>

  <div className="revenue-display">
    {loading && <p>Loading...</p>}
    {error && <p className="error-message">{error}</p>}
    {parkingLotRevenue && (
      <p className="revenue-value text-2xl">
        Revenue: <strong>Rs. {parkingLotRevenue[`${selectedPeriod}_revenue`]?.toLocaleString()}/=</strong>
      </p>
    )}
  </div>
</div>


      </div>
    </div>
  );
};
export default ParkingSlotDetail;
