// Import necessary modules and components
"use client"

import React, { useState, useEffect } from "react";
import styles from "./warden.module.css";
import Button from "../../ui/button/button";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import Card from "../../ui/card/horizontalcard/card";

library.add(faSquarePlus);

const WardenPage = () => {
  const [wardens, setWardens] = useState([]);

  useEffect(() => {
    async function fetchWardens() {
      const token = localStorage.getItem("token");

      if (!token) {
        Router.push("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/wardens", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            token: token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch wardens");
        }

        const data = await response.json();

        if (Array.isArray(data.data)) {
          setWardens(data.data);
        } else {
          throw new Error("Data received is not in expected format");
        }
      } catch (error) {
        console.error("Error fetching wardens:", error);
        // Handle error (e.g., show error message)
      }
    }

    fetchWardens();
  }, []);

  // Render loading state or handle empty wardens array case
  // if (wardens.length === 0) {
  //   return <p>Loading...</p>; // or any other loading indicator
  // }

  const title = ["Assigned Wardens", "Not Assigned Wardens"];
  const amount = ["10%", "30%"];

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>Registered Parking Warden List</p>
      </div>
      <div className={styles.cardcontainer}>
        <div className="w-1/5">
          <Card title={title[0]} amount={amount[0]} />
        </div>
        <div className="w-1/5">
          <Card title={title[1]} amount={amount[1]} />
        </div>
      </div>
      <Link href="/register-warden">
        <Button label="Register New Wardens" icon={faSquarePlus} />
      </Link>

      <div className={styles.tablecontent}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.empnamehead}>Name</th>
              <th className={styles.empgenderhead}>Gender</th>
              <th className={styles.empagehead}>Age</th>
              <th className={styles.empcontacthead}>Contact Number</th>
              <th className={styles.empslothead}>Assigned Parking Slot</th>
            </tr>
          </thead>
          <tbody>
          {wardens.length > 0 ? (
  wardens.map((warden) => (
    <tr key={warden.warden_id}>
      <td className={styles.empnamedata}>
        <Link href={`/warden/${warden.warden_id}`}>
          <div className={styles.link}>{`${warden.fname} ${warden.lname}`}</div>
        </Link>
      </td>
      <td className={styles.empgenderdata}>{warden.gender}</td>
      <td className={styles.empagedata}>{warden.age}</td>
      <td className={styles.empcontactdata}>{warden.contact}</td>
      <td
        className={
          warden.parking_lot_name
            ? styles.empslotdatafree
            : styles.empslotdata
        }
      >
        {warden.isassigned === false ? "Not Assigned" : warden.parking_lot_name}
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="5" className={styles.noData}>
      No wardens registered under this PMC
    </td>
  </tr>
)}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WardenPage;
