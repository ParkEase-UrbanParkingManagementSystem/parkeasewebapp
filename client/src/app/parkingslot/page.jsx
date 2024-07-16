"use client";

import React from "react";
import styles from "./parkingSlot.module.css";
import Button from "../../ui/button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faCar, faBicycle } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";

library.add(faSquarePlus, faCar, faBicycle);

const ParkingLot = () => {
  const parkingLots = [
    {
      name: "Kollupitiya Parking Slot",
      assignedWarden: "Saman Kumara",
      carSlots: 50,
      bikeSlots: 20,
      status: "Active",
    },
    {
      name: "Bambalapitiya Parking Slot",
      assignedWarden: "Nimal Perera",
      carSlots: 30,
      bikeSlots: 10,
      status: "Active",
    },
    {
      name: "Wellawatte Parking Slot",
      assignedWarden: "Ruwan Silva",
      carSlots: 40,
      bikeSlots: 15,
      status: "Inactive",
    },
    {
      name: "Mount-Lavinia Parking Slot",
      assignedWarden: "Dinal Silva",
      carSlots: 46,
      bikeSlots: 32,
      status: "Maintaining",
    },
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

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>Parking Lots</p>
      </div>
      
      <Link href="/parkinglot-add">
          <Button label="Add Parking Lot" icon={faSquarePlus} />
        </Link>

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
                <td className={lot.status === "Active" ? styles.statusActive : styles.statusInactive}>
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
