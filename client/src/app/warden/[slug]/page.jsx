"use client";

import React from "react";
import styles from "./page.module.css";
import Button from "../../../ui/button/button";
import Dropdown from "../../../ui/dashboard/dropdown/dropdown"

const WardenDetailsPage = ({ warden }) => {
  // Dummy data for demonstration
  const dummyWarden = {
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

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Warden Details</div>

      <div className={styles.wardendetail}>
        <div className={styles.profile}>
          <div className={styles.profileCard}>
            <img
              src={warden.profilePic}
              alt={warden.name}
              className={styles.profilePic}
            />
            <div className={styles.profileDetails}>
              <h2>{warden.name}</h2>
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
        <div className={styles.assign}>
          <div className={styles.assignlist}>
            <div className="text-xl ml-6">Assign to a Parking Slot :</div>
            <Dropdown options={["Area_1", "Area_2", "Area_3", "Area_4"]} className="ml-6"/>
            <Button label="Assign" />
          </div>
          <div>rest</div>
        </div>
      </div>
    </div>
  );
};

export default WardenDetailsPage;
