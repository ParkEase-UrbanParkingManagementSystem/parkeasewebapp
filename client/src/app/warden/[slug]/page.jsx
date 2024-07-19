"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Button from "../../../ui/button/button";
import Dropdown from "../../../ui/dashboard/dropdown/dropdown";

const WardenDetailsPage = ({ warden }) => {
  // Dummy data for demonstration
  const dummyWarden = {
    id: "103",
    name: "Saman Perera",
    age: 45,
    location: "Badulla",
    contact: "077-4531243",
    email: "saman.perera@gmail.com",
    assignedParkingLot: "Kollupitiya Parking Lot",
    nic: "1987654321V",
    gender: "Male",
    profilePic: "/images/profile-pic.jpg",
    status: "Assigned",
    address: "32/B, Kalupahana, Badulla",
  };

  // Use dummy data if warden prop is not provided
  warden = warden || dummyWarden;

  const wardenAssigned = warden.status;

  const parkingLots = [
    "Kollupitiya Parking Lot",
    "Bambalapitiya Parking Lot",
    "Galle Face Parking Lot",
    "Dehiwala Parking Lot",
  ];

  return (
    <div className={styles.container}>
      {/* 10 */}
      <div className={styles.heading}>Warden Details</div>
      {/* 90 */}
      <div className={styles.wardendetail}>
        {/* 50 */}
        <div className={styles.profile}>
          <div className={styles.profileCard}>
            <img
              src={warden.profilePic}
              alt={warden.name}
              className={styles.profilePic}
            />
            <div className={styles.profileDetails}>
              <h2>{`W${warden.id} - ${warden.name}`}</h2>
              <p>
                Status:{" "}
                <span
                  className={
                    warden.status === "Assigned"
                      ? styles.statusActive
                      : styles.statusInactive
                  }
                >
                  {warden.status}
                </span>
              </p>
            </div>
          </div>
          <div className={styles.detailsCard}>
            <div className={styles.detailColumns}>
              <div className={styles.detailColumn}>
                <div className={styles.detail}>
                  <label>NIC:</label>
                  <p>{warden.nic}</p>
                </div>
                <div className={styles.detail}>
                  <label>Gender:</label>
                  <p>{warden.gender}</p>
                </div>
                <div className={styles.detail}>
                  <label>Hometown:</label>
                  <p>{warden.location}</p>
                </div>
                <div className={styles.detail}>
                  <label>Age:</label>
                  <p>{warden.age}</p>
                </div>
              </div>
              <div className={styles.detailColumn}>
                <div className={styles.detail}>
                  <label>Contact:</label>
                  <p>{warden.contact}</p>
                </div>
                <div className={styles.detail}>
                  <label>Email:</label>
                  <p>{warden.email}</p>
                </div>
                <div className={styles.detail}>
                  <label>Assigned Parking Lot:</label>
                  <p>{warden.assignedParkingLot}</p>
                </div>
                <div className={styles.detail}>
                  <label>Address:</label>
                  <p>{warden.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 50 */}
        <div className={styles.assign}>
          <div className={styles.assigncard}>
            {wardenAssigned === "Assigned" ? (
              <div className={styles.assignoption}>
                <p>Change the current parking lot:</p>
                <Dropdown options={parkingLots} />
                <Button label="Change" />
              </div>
            ) : (
              <div className={styles.assignoption}>
                <p>Assign to a parking slot:</p>
                <Dropdown options={parkingLots} />
                <Button label="Assign" />
              </div>
            )}
          </div>

          <div className={styles.salarycard}>
            <div className={styles.row}>
              <label>Daily Covered Target: </label>
              <p>45 vehicles</p>
            </div>
            <div className={styles.row}>
              <label>Daily Earning: </label>
              <p>900 Rupees</p>
            </div>
            <div className={styles.row}>
              <label>Monthly salary: </label>
              <p>8000 Rupees</p>
            </div>
            <div className={styles.row}>
              <label>Monthly Total Wage: </label>
              <p>26,000 Rupees</p>
            </div>
          </div>

          <div className={styles.logcard}>
              <p className="font-bold">Check Warden History: </p>
              <Button label="View"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardenDetailsPage;
