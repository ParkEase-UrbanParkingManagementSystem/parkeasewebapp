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

library.add(faCar, faMotorcycle, faClock, faTruck);

const ParkingSlotDetail = () => {
  const [parkingLotDetails, setParkingLotDetails] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchParkingLotDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login"); // Redirect to login if no token found
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/parkinglots/details",
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
  }, [router]);

  if (!parkingLotDetails) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Parking Lot Details</div>
      {parkingLotDetails.map((parkinglot, index) => (
        <div key={index} className={styles.profile}>
          <div className={styles.profiledetail}>
            <div className={styles.header}>
              <div className={styles.headerContent}>
                <img
                  src="/images/parking-lot.jpg"
                  alt="Parking Lot"
                  className={styles.headerImage}
                />
                <div className={styles.headerText}>
                  <h2>{`L${parkinglot.lot.lot_id} - ${parkinglot.lot.name}`}</h2>
                  <p>
                    Status:{" "}
                    <span
                      className={
                        parkinglot.lot.status === "Active"
                          ? styles.statusActive
                          : styles.statusInactive
                      }
                    >
                      {parkinglot.lot.status}
                    </span>
                  </p>
                </div>
              </div>
              <div className={styles.headerDescription}>
                <p>{parkinglot.lot.description}</p>
              </div>
            </div>
            <div className={styles.details}>
              <div className={styles.detailColumns}>
                <div className={styles.detailColumn}>
                  <div className={styles.detail}>
                    <label>Assigned Warden</label>
                    {parkinglot.warden ? (
                      <p>{`${parkinglot.warden.fname} ${parkinglot.warden.lname}`}</p>
                    ) : (
                      <p>No Warden Assigned</p>
                    )}
                  </div>
                  <div className={styles.detail}>
                    <label>Number of Slots</label>
                    <p>Total : {parkinglot.lot.full_capacity}</p>
                    <p>
                      <FontAwesomeIcon icon={faCar} />{" "}
                      {parkinglot.lot.car_capacity}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faMotorcycle} />{" "}
                      {parkinglot.lot.bike_capacity}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faTruck} />{" "}
                      {parkinglot.lot.xlvehicle_capacity}
                    </p>
                  </div>
                  <div className={styles.detail}>
                    <label>Prices per Hour</label>
                    {parkinglot.slotPrices.map((slot, i) => (
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
                          <>
                            <img
                              src="/images/tuk-tuk.png"
                              className="w-6 h-5 mr-1 opacity-70"
                            />
                            {slot.amount_per_slot}
                          </>
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
                    <p>{`${parkinglot.lot.addressno}, ${parkinglot.lot.street_1}, ${parkinglot.lot.street_2}, ${parkinglot.lot.city}, ${parkinglot.lot.district}`}.</p>
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
                    {parkinglot.lot.car_capacity}
                  </span>
                </div>
                <div className={styles.card}>
                  <FontAwesomeIcon
                    icon={faMotorcycle}
                    className={styles.icon}
                  />
                  &nbsp; <strong>6</strong>:
                  <span className={styles.totalSlots}>
                    {parkinglot.lot.bike_capacity}
                  </span>
                </div>
                <div className={styles.card}>
                  <FontAwesomeIcon icon={faTruck} className={styles.icon} />
                  &nbsp; <strong>7</strong>:
                  <span className={styles.totalSlots}>
                    {parkinglot.lot.xlvehicle_capacity}
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
      ))}
    </div>
  );
};

export default ParkingSlotDetail;
