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
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import Card from "../../ui/card/horizontalcard/card";

library.add(faSquarePlus, faCar, faBicycle, faSquareParking, faTruck);

const ParkingLot = () => {
  const parkingLots = [
    {
      name: "Koswatta Parking Slot",
      assignedWarden: "Nimal Athapattu",
      carSlots: 10,
      bikeSlots: 5,
      lorrySlots: 4,
      status: "Active",
    },
    {
      name: "Moratuwa Parking Slot",
      assignedWarden: "Kusal Mendis",
      carSlots: 55,
      bikeSlots: 15,
      lorrySlots: 5,
      status: "Inactive",
    },
    // Add more dummy data as needed
  ];
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
            {parkingLots.map((lot, index) => (
              <tr key={index}>
                <td className={styles.empiddata}>
                <Link href={`/parkingslot/${index}`}>
                    <div className={styles.link}>{`${lot.name}`}</div>
                  </Link>
                </td>               
                <td className={styles.empnamedata}>{lot.assignedWarden}</td>
                <td className={styles.empgenderdata}>
                  <FontAwesomeIcon icon={faCar} className={styles.icon} />{" "}
                  {lot.carSlots} &nbsp;
                  <FontAwesomeIcon
                    icon={faBicycle}
                    className={styles.icon}
                  />{" "}
                  {lot.bikeSlots} &nbsp;
                  <FontAwesomeIcon
                    icon={faTruck}
                    className={styles.icon}
                  />{" "}
                  {lot.lorrySlots}
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
