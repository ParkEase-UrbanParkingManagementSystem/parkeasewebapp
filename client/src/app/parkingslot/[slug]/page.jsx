"use client";

import React from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faMotorcycle,
  faClock,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faCar, faMotorcycle, faClock, faTruck);

const ParkingSlotDetail = ({ parkinglot }) => {
  const parkingLot = {
    id: "8",
    name: "Kollupitiya Parking Lot",
    assignedWarden: "Saman Kumara",
    carSlots: 50,
    bikeSlots: 20,
    lorrySlots: 10,
    occupiedCarSlots: 15, // Example: Currently occupied slots
    occupiedBikeSlots: 5, // Example: Currently occupied slots
    carPricePerHour: "70 LKR",
    bikePricePerHour: "30 LKR",
    lorryPricePerHour: "100 LKR",
    twPricePerHour: "60LKR",
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
      {/* 10 */}
      <div className={styles.heading}>Parking Lot Details</div>
      {/* 90 */}
      <div className={styles.profile}>
        {/* 50 */}
        <div className={styles.profiledetail}>
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <img
                src={parkinglot.image}
                alt={parkinglot.name}
                className={styles.headerImage}
              />
              <div className={styles.headerText}>
                <h2>{`L${parkinglot.id} - ${parkinglot.name}`}</h2>
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
            <div className={styles.detailColumns}>
              <div className={styles.detailColumn}>
                <div className={styles.detail}>
                  <label>Assigned Warden</label>
                  <p>W103 - {parkinglot.assignedWarden}</p>
                </div>
                <div className={styles.detail}>
                  <label>Number of Slots</label>
                  <p>Total : 80</p>
                  <p>
                    <FontAwesomeIcon icon={faCar} /> {parkinglot.carSlots}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faMotorcycle} />{" "}
                    {parkinglot.bikeSlots}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faTruck} /> {parkinglot.lorrySlots}
                  </p>
                </div>
                <div className={styles.detail}>
                  <label>Prices per Hour</label>

                  <p>
                    <FontAwesomeIcon icon={faMotorcycle} />{" "}
                    {parkinglot.bikePricePerHour}
                  </p>
                  <p className={styles.tw}>
                    <img
                      src="/images/tuk-tuk.png"
                      className="w-6 h-5 mr-1 opacity-70"
                    />
                    {parkinglot.twPricePerHour}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faCar} />{" "}
                    {parkinglot.carPricePerHour}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faTruck} />{" "}
                    {parkinglot.lorryPricePerHour}
                  </p>
                </div>
              </div>
              <div className={styles.detailColumn}>
                <div className={styles.detail}>
                  <label>Active Time</label>
                  <p>
                    <FontAwesomeIcon icon={faClock} /> {parkinglot.activeTime}
                  </p>
                </div>
                <div className={styles.detail}>
                  <label>Address</label>
                  <p>{parkinglot.address}</p>
                </div>
                <div className={styles.detail}>
                  <label>Contact</label>
                  <p>{parkinglot.contact}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 50 */}
        <div>rest</div>
      </div>
    </div>
  );
};

export default ParkingSlotDetail;
