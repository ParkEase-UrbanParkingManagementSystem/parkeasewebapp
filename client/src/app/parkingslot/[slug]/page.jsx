"use client";

import React from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faBicycle, faClock } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faCar, faBicycle, faClock);

const parkingLot = {
  id: "1",
  name: "Kollupitiya Parking Lot",
  assignedWarden: "Saman Kumara",
  carSlots: 50,
  bikeSlots: 20,
  occupiedCarSlots: 15, // Example: Currently occupied slots
  occupiedBikeSlots: 5, // Example: Currently occupied slots
  carPricePerHour: "100 LKR",
  bikePricePerHour: "50 LKR",
  activeTime: "8:00 AM - 8:00 PM", // Example: Active time
  status: "Active",
  address: "123 Kollupitiya Road, Colombo",
  contact: "0123456789",
  description: "A well-maintained parking lot in Kollupitiya area.",
  image: "/images/parking-lot.jpg",
};

const ParkingSlotDetail = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <img src={parkingLot.image} alt={parkingLot.name} className={styles.headerImage} />
          <div className={styles.headerText}>
            <h1>{parkingLot.name}</h1>
            <p>
              Status:{" "}
              <span
                className={
                  parkingLot.status === "Active"
                    ? styles.statusActive
                    : styles.statusInactive
                }
              >
                {parkingLot.status}
              </span>
            </p>
          </div>
        </div>
        <div className={styles.headerDescription}>
          <p>{parkingLot.description}</p>
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.detail}>
          <h2>Assigned Warden</h2>
          <p>{parkingLot.assignedWarden}</p>
        </div>
        <div className={styles.detail}>
          <h2>Number of Slots</h2>
          <p>
            <FontAwesomeIcon icon={faCar} /> {parkingLot.carSlots} &nbsp;
            <FontAwesomeIcon icon={faBicycle} /> {parkingLot.bikeSlots}
          </p>
        </div>
        <div className={styles.detail}>
          <h2>Currently Occupied Slots</h2>
          <p>
            <FontAwesomeIcon icon={faCar} /> {parkingLot.occupiedCarSlots} &nbsp;
            <FontAwesomeIcon icon={faBicycle} /> {parkingLot.occupiedBikeSlots}
          </p>
        </div>
        <div className={styles.detail}>
          <h2>Prices per Hour</h2>
          <p>
            <FontAwesomeIcon icon={faCar} /> {parkingLot.carPricePerHour} &nbsp;
            <FontAwesomeIcon icon={faBicycle} /> {parkingLot.bikePricePerHour}
          </p>
        </div>
        <div className={styles.detail}>
          <h2>Active Time</h2>
          <p>
            <FontAwesomeIcon icon={faClock} /> {parkingLot.activeTime}
          </p>
        </div>
        <div className={styles.detail}>
          <h2>Address</h2>
          <p>{parkingLot.address}</p>
        </div>
        <div className={styles.detail}>
          <h2>Contact</h2>
          <p>{parkingLot.contact}</p>
        </div>
        <div className={styles.detail}>
          <h2>Description</h2>
          <p>{parkingLot.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ParkingSlotDetail;