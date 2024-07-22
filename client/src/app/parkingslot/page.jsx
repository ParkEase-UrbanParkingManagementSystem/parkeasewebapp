"use client";

import React, { useEffect, useState } from "react";
import styles from "./parkingSlot.module.css";
import Button from "../../ui/button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  faCar,
  faMotorcycle,
  faSquareParking,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import Card from "../../ui/card/horizontalcard/card";

library.add(faSquarePlus, faCar, faMotorcycle, faSquareParking, faTruck);

const ParkingLot = () => {
  const [parkingLots, setparkingLots] = useState([]);

  useEffect(() => {
    async function fetchParkingLots() {
      const token = localStorage.getItem("token");

      if (!token) {
        Router.push("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/parkingslot", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            token: token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch Parking Lots");
        }

        const data = await response.json();

        if (Array.isArray(data.data)) {
          setparkingLots(data.data);
        } else {
          throw new Error("Data received is not in expected format");
        }
      } catch (error) {
        console.error("Error fetching Parking Lots:", error);
        // Handle error (e.g., show error message)
      }
    }

    fetchParkingLots();
  }, []);

  // Render loading state or handle empty wardens array case
  // if (parkingLots.length === 0) {
  //   return <p>Loading...</p>; // or any other loading indicator
  // }
  const title = ["Occupied Slots", "Remaining Slots"];
  const amount = ["10%", "30%"];

  return (
    <div className={styles.container}>
      <div className={styles.title}>Registered Parking Lots</div>
      <div className={styles.cardcontainer}>
        <div className="w-1/5">
          <Card title={title[0]} amount={amount[0]} />
        </div>
        <div className="w-1/5">
          <Card title={title[1]} amount={amount[1]} />
        </div>
      </div>
      <div>
        <Link href="/parkinglot-add">
          <Button label="Add New Parking Lots" icon={faSquarePlus} />
        </Link>
      </div>
      <div className={styles.tablecontent}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.empidhead}>Name</th>
              <th className={styles.empnamehead}>Assigned Warden</th>
              <th className={styles.empgenderhead}>Number of Slots</th>
              <th className={styles.empagehead}>Status</th>
            </tr>
          </thead>
          <tbody>
            {parkingLots.map((lot) => (
              <tr key={lot.lot_id}>
                <td className={styles.empiddata}>
                  <Link href={`/parkingslot/${lot.lot_id}`}>
                    <div className={styles.link}>{lot.name}</div>
                  </Link>
                </td>
                <td className={styles.empnamedata}>{lot.assignedWarden}</td>
                <td className={styles.empgenderdata}>
                  <FontAwesomeIcon icon={faCar} className={styles.icon} />{" "}
                  {lot.car_capacity} &nbsp;
                  <FontAwesomeIcon
                    icon={faMotorcycle}
                    className={styles.icon}
                  />{" "}
                  {lot.bike_capacity} &nbsp;
                  <FontAwesomeIcon
                    icon={faTruck}
                    className={styles.icon}
                  />{" "}
                  {lot.xlvehicle_capacity}
                </td>
                <td
                  className={
                    lot.status === "Active"
                      ? styles.statusActive
                      : styles.statusInactive
                  }
                >
                  {lot.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParkingLot;
