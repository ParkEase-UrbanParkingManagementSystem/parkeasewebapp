"use client";

import React from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faBicycle, faClock } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faCar, faBicycle, faClock);

const ParkingSlotDetail = ({parkinglot}) => {

  const parkingLot = {
    id: "8",
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

  parkinglot = parkinglot || parkingLot;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <img src={parkinglot.image} alt={parkinglot.name} className={styles.headerImage} />
          <div className={styles.headerText}>
            <h1>{`L${parkinglot.id} - ${parkinglot.name}`}</h1>
            <p>
              Status:{" "}
              <span
                className={
                  parkinglot.status === "Active"
                    ? styles.statusActive
                    : styles.statusInactive
                }
              >
                {parkinglot.status}
              </span>
            </p>
          </div>
        </div>
        <div className={styles.headerDescription}>
          <p>{parkinglot.description}</p>
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.detail}>
          <h2>Assigned Warden</h2>
          <p>{parkinglot.assignedWarden}</p>
        </div>
        <div className={styles.detail}>
          <h2>Number of Slots</h2>
          <p>
            <FontAwesomeIcon icon={faCar} /> {parkinglot.carSlots} &nbsp;
            <FontAwesomeIcon icon={faBicycle} /> {parkinglot.bikeSlots}
          </p>
        </div>
        <div className={styles.detail}>
          <h2>Currently Occupied Slots</h2>
          <p>
            <FontAwesomeIcon icon={faCar} /> {parkinglot.occupiedCarSlots} &nbsp;
            <FontAwesomeIcon icon={faBicycle} /> {parkinglot.occupiedBikeSlots}
          </p>
        </div>
        <div className={styles.detail}>
          <h2>Prices per Hour</h2>
          <p>
            <FontAwesomeIcon icon={faCar} /> {parkinglot.carPricePerHour} &nbsp;
            <FontAwesomeIcon icon={faBicycle} /> {parkinglot.bikePricePerHour}
          </p>
        </div>
        <div className={styles.detail}>
          <h2>Active Time</h2>
          <p>
            <FontAwesomeIcon icon={faClock} /> {parkinglot.activeTime}
          </p>
        </div>
        <div className={styles.detail}>
          <h2>Address</h2>
          <p>{parkinglot.address}</p>
        </div>
        <div className={styles.detail}>
          <h2>Contact</h2>
          <p>{parkinglot.contact}</p>
        </div>
        <div className={styles.detail}>
          <h2>Description</h2>
          <p>{parkinglot.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ParkingSlotDetail;