"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Button from "../../../ui/button/button";
import Dropdown from "../../../ui/dashboard/dropdown/dropdown";
import { useParams } from "next/navigation";

const WardenDetailsPage = () => {
    const { slug } = useParams();
    const [warden, setWarden] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [parkingLots, setParkingLots] = useState([]); 

    useEffect(() => {
        if (!slug) return; // Do nothing if id is not available

        const fetchWardenDetails = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch(`http://localhost:5000/wardens/${slug}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        token: token // Use Authorization header for the token
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch warden details');
                }

                const data = await response.json();
                setWarden(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching warden details:', error);
                setError('Failed to load warden details');
                setLoading(false);
            }
        };

        const fetchParkingLots = async () => {
          const token = localStorage.getItem("token");
          try {
              const response = await fetch('http://localhost:5000/parkinglots', {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      token: token
                  }
              });
  
              if (!response.ok) {
                  throw new Error('Failed to fetch parking lots');
              }
  
              const data = await response.json();
              // Extract the 'name' property from each parking lot object
              const parkingLotNames = data.map(lot => lot.name);
              setParkingLots(parkingLotNames);
              console.log(parkingLotNames);
          } catch (error) {
              console.error('Error fetching parking lots:', error);
              setError('Failed to load parking lots');
          }
      };
        fetchParkingLots();
        fetchWardenDetails();

    }, [slug]);

  //   const parkingLotOptions = parkingLots.map(lot => ({
  //     label: lot.name,
  //     value: lot.id // Assuming 'id' is a unique identifier if required
  // }));

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    // const parkingLots = [
    //     "Kollupitiya Parking Lot",
    //     "Bambalapitiya Parking Lot",
    //     "Galle Face Parking Lot",
    //     "Dehiwala Parking Lot",
    // ];

    return (
        <div className={styles.container}>
            <div className={styles.heading}>Warden Details</div>
            <div className={styles.wardendetail}>
                <div className={styles.profile}>
                    <div className={styles.profileCard}>
                        <img
                            src={"/images/profile-pic.jpg"}
                            alt={warden.name}
                            className={styles.profilePic}
                        />
                        <div className={styles.profileDetails}>
                            <h3>{`W-${warden.warden_id}`}</h3>
                            <h2 className="font-bold">{`${warden.fname} ${warden.lname}`}</h2>
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
                                    <p>{warden.province}</p>
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
                                    <p>{warden.isassigned || "Unassigned"}</p>
                                </div>
                                <div className={styles.detail}>
                                    <label>Address:</label>
                                    <p>{`${warden.addressno}, ${warden.street_1}, ${warden.street_2}, ${warden.city}`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.assign}>
                    <div className={styles.assigncard}>
                        {warden.status === "Assigned" ? (
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
                        <Button label="View" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WardenDetailsPage;
