"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import ActionButton from "../../../ui/button/newButton"; // Adjust the path as necessary
import Dropdown from "../../../ui/dashboard/dropdown/dropdown";
import { useParams } from "next/navigation";

const WardenDetailsPage = () => {
  const { slug } = useParams();
  const [warden, setWarden] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [parkingLots, setParkingLots] = useState([]);
  const [selectedParkingLot, setSelectedParkingLot] = useState(null);

  const fetchWardenDetails = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/wardens/${slug}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch warden details");
      }

      const data = await response.json();
      setWarden(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching warden details:", error);
      setError("Failed to load warden details");
      setLoading(false);
    }
  };

  const fetchParkingLots = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/parkinglots`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch parking lots");
      }

      const data = await response.json();
      const parkingLotNames = data.map((lot) => lot.name);
      setParkingLots(parkingLotNames);
      setSelectedParkingLot(parkingLotNames[0]);
      console.log(parkingLotNames);
    } catch (error) {
      console.error("Error fetching parking lots:", error);
      setError("Failed to load parking lots");
    }
  };

  useEffect(() => {
    if (!slug) return;
    fetchParkingLots();
    fetchWardenDetails();
  }, [slug]);

  const handleAssign = async () => {
    console.log(selectedParkingLot); // Debug log
    if (!selectedParkingLot) {
      setError("Please select a parking lot");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/wardens/assign/${slug}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({ parkingLot: selectedParkingLot }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to assign parking lot");
      }

      await fetchWardenDetails();

      const data = await response.json();
      setWarden((prevWarden) => ({
        ...prevWarden,
        isassigned: selectedParkingLot,
      }));

      alert("Parking lot assigned successfully");
    } catch (error) {
      console.error("Error assigning parking lot:", error);
      setError("Failed to assign parking lot");
    }
  };

  const handleUnassign = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/wardens/unassign/${slug}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to unassign parking lot");
      }

      await fetchWardenDetails();

      setWarden((prevWarden) => ({
        ...prevWarden,
        isassigned: null,
        parking_lot_name: null,
      }));

      alert("Parking lot unassigned successfully");
    } catch (error) {
      console.error("Error unassigning parking lot:", error);
      setError("Failed to unassign parking lot");
    }
  };

  const handleDropdownChange = (value) => {
    console.log("Dropdown change:", value); // Debug log
    setSelectedParkingLot(value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
              <h2 className="font-semibold">{`${warden.fname} ${warden.lname}`}</h2>
              <h3 className="mb-2">{`W-${warden.warden_id}`}</h3>
              <p>
                <span>Status:</span>
                <span
                  className={
                    warden.parking_lot_name === null
                      ? styles.statusInactive
                      : styles.statusActive
                  }
                >
                  {warden.parking_lot_name === null
                    ? "Not Assigned"
                    : "Assigned"}
                </span>
              </p>
              {warden.parking_lot_name !== null && (
                <ActionButton label="Unassign" onClick={handleUnassign} />
              )}
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
                  <p>
                    {warden.parking_lot_name === null
                      ? "Not Assigned"
                      : warden.parking_lot_name}
                  </p>
                </div>
                <div className={styles.detail}>
                  <label>Address:</label>
                  <p>{`${warden.addressno}, ${warden.street_1}, ${warden.street_2}, ${warden.city}.`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.assign}>
          <div className={styles.assigncard}>
            {warden.parking_lot_name === null ? (
              <div className={styles.assignoption}>
                <p>Assign to a parking slot:</p>
                <Dropdown
                  options={parkingLots}
                  selectedOption={selectedParkingLot}
                  onChange={handleDropdownChange}
                />
                <ActionButton label="Assign" onClick={handleAssign} />
              </div>
            ) : (
              <div className={styles.assignoption}>
                <p>Change the current parking lot:</p>
                <Dropdown
                  options={parkingLots}
                  selectedOption={selectedParkingLot}
                  onChange={handleDropdownChange}
                />
                <ActionButton label="Change" onClick={handleAssign} />
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
            <ActionButton
              label="View"
              onClick={() => console.log("View history clicked")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardenDetailsPage;
