"use client";

import React from "react";
import styles from "./parkingSlot.module.css";
import Button from "../../ui/button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  faCar,
  faBicycle,
  faSquareParking,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import Card from "../../ui/card/horizontalcard/card";

library.add(faSquarePlus, faCar, faBicycle, faSquareParking);

const ParkingLot = () => {
  const parkingLots = [
    {
      name: "Koswatta Parking Slot",
      assignedWarden: "Nimal Athapattu",
      carSlots: 10,
      bikeSlots: 5,
      status: "Active",
    },
    {
      name: "Moratuwa Parking Slot",
      assignedWarden: "Kusal Mendis",
      carSlots: 55,
      bikeSlots: 15,
      status: "Active",
    },
    // Add more dummy data as needed
  ];
  const title = ["Occupied Slots", "Remaining Slots", "Total Slots"];
  const content = ["100", "300", "400"];

  return (
    <div className={styles.container}>
      <div className={styles.title}>Parking Lots</div>
      <div className={styles.cardcontainer}>
        <div className="w-1/3">
          <Card title={title[0]} content={content[0]} />
        </div>
        <div className="w-1/3">
          <Card title={title[1]} content={content[1]} />
        </div>
        <div className="w-1/3">
          <Card title={title[2]} content={content[2]} />
        </div>
      </div>
      <div>
        <Link href="/parkinglot-add">
          <Button label="Add Parking Lot" icon={faSquarePlus} />
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
            {parkingLots.map((lot, index) => (
              <tr key={index}>
                <td className={styles.empiddata}>{lot.name}</td>
                <td className={styles.empnamedata}>{lot.assignedWarden}</td>
                <td className={styles.empgenderdata}>
                  <FontAwesomeIcon icon={faCar} /> {lot.carSlots} &nbsp;
                  <FontAwesomeIcon icon={faBicycle} /> {lot.bikeSlots}
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
