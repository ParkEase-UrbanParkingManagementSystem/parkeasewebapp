"use client";

import React, { useEffect, useState } from "react";
import styles from "./parkingSlot.module.css";
import Button from "../../ui/button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  faCar,
  faMotorcycle,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import Card from "../../ui/card/horizontalcard/card";
import Router from "next/router"; // Import Router

library.add(faSquarePlus, faCar, faMotorcycle);

const ParkingLot = () => {
  const [parkingLots, setParkingLots] = useState([]);
  const [totalParkingLots, setTotalParkingLots] = useState(0);
  const [activeParkingLots, setActiveParkingLots] = useState(0);
  const [inactiveParkingLots, setInactiveParkingLots] = useState(0);

  const [assignedWardenPercentage, setAssignedWardenPercentage] = useState(0);
  const [notAssignedWardenPercentage, setNotAssignedWardenPercentage] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");

      if (!token) {
        Router.push("/login");
        return;
      }

      try {
        // Fetch parking lots
        const responseParkingLots = await fetch(
          `${process.env.NEXT_PUBLIC_API_KEY}/parkinglots`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              token: token,
            },
          }
        );

        if (!responseParkingLots.ok) {
          throw new Error("Failed to fetch Parking Lots");
        }

        const dataParkingLots = await responseParkingLots.json();

        if (Array.isArray(dataParkingLots)) {
          setParkingLots(dataParkingLots);

          // Calculate total and categorize parking lots
          let total = dataParkingLots.length;
          let active = 0;
          let inactive = 0;

          dataParkingLots.forEach((lot) => {
            if (lot.status === "active") {
              active++;
            } else if (lot.status === "Inactive") {
              inactive++;
            }
          });

          setTotalParkingLots(total);
          setActiveParkingLots(active);
          setInactiveParkingLots(inactive);
        } else {
          throw new Error("Data received is not in expected format for parking lots");
        }

        // Fetch wardens
        const responseWardens = await fetch(
          `${process.env.NEXT_PUBLIC_API_KEY}/wardens`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              token: token,
            },
          }
        );

        if (!responseWardens.ok) {
          throw new Error("Failed to fetch Wardens");
        }

        const wardensData = await responseWardens.json();
        const wardens = wardensData.data || []; // Access the data property
        console.log("Fetched wardens data:", wardens); // Log wardens data for debugging

        if (Array.isArray(wardens)) {
          let totalWardens = wardens.length;
          let assignedWardens = wardens.filter(warden => warden.isassigned).length;
          let notAssignedWardens = totalWardens - assignedWardens;

          setAssignedWardenPercentage(totalWardens > 0 ? ((assignedWardens / totalWardens) * 100).toFixed(2) : 0);
          setNotAssignedWardenPercentage(totalWardens > 0 ? ((notAssignedWardens / totalWardens) * 100).toFixed(2) : 0);
        } else {
          throw new Error("Data received is not in expected format for wardens");
        }

      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error (e.g., show error message)
      }
    }

    fetchData();
  }, []);

  // Render loading state or handle empty parking lots array case
  

  return (
    <div className={styles.container}>
      <div className={styles.title}>Registered Parking Lots</div>
      <div className={styles.cardcontainer}>
        <div className="w-1/5">
          <Card title="Assigned Wardens" amount={`${assignedWardenPercentage}%`} />
        </div>
        <div className="w-1/5">
          <Card title="Not Yet Assigned" amount={`${notAssignedWardenPercentage}%`} />
        </div>
        <div className="w-1/5">
          <Card
            title="Active Slots"
            amount={`${
              totalParkingLots > 0
                ? ((activeParkingLots / totalParkingLots) * 100).toFixed(2)
                : 0
            }%`}
          />
        </div>
        <div className="w-1/5">
          <Card
            title="Inactive Slots"
            amount={`${
              totalParkingLots > 0
                ? ((inactiveParkingLots / totalParkingLots) * 100).toFixed(2)
                : 0
            }%`}
          />
        </div>
      </div>
      <div>
        <Button
          path="/parkinglot-add"
          label="Add New Parking Lot"
          icon={faSquarePlus}
        />
      </div>
      <div className={styles.tablecontent}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.empidhead}>Name</th>
              <th className={styles.empnamehead}>Assigned Wardens</th>
              <th className={styles.empgenderhead}>Number of Slots</th>
              <th className={styles.empagehead}>Status</th>
            </tr>
          </thead>
          <tbody>
            {parkingLots.length > 0 ? (
              parkingLots.map((lot) => (
                <tr key={lot.lot_id}>
                  <td className={styles.empiddata}>
                    <Link href={`/parkingslot/${lot.lot_id}`}>
                      <div className={styles.link}>{lot.name}</div>
                    </Link>
                  </td>
                  <td
                    className={
                      lot.wardens && lot.wardens.trim()
                        ? styles.assigned
                        : styles.notAssigned
                    }
                  >
                    {lot.wardens && lot.wardens.trim()
                      ? lot.wardens
                      : "Not yet assigned"}
                  </td>
                  <td className={styles.empgenderdata}>
                    <div className={styles.iconContainer}>
                      <FontAwesomeIcon icon={faCar} className={styles.icon} />
                      {lot.car_capacity} &nbsp;&nbsp;
                      <FontAwesomeIcon
                        icon={faMotorcycle}
                        className={styles.icon}
                      />
                      {lot.bike_capacity}
                    </div>
                  </td>
                  <td
                    className={
                      lot.status === "active"
                        ? styles.statusActive
                        : styles.statusInactive
                    }
                  >
                    {lot.status === "active"
                      ? "Active" :
                      lot.status === "banned"? "Banned"
                      : "Inactive"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className={styles.noData}>
                  No Parking Lots are registered under this PMC
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParkingLot;
