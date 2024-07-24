"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import from 'next/navigation'
import styles from "./profile.module.css";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faPen);

const Profile = () => {
  const [pmcDetails, setPmcDetails] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPmcDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login"); // Redirect to login if no token found
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/pmc/details", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        const parseRes = await response.json();

        if (response.ok) {
          setPmcDetails(parseRes.data);
        } else {
          console.error("Can't get the details");
          // router.push('/login'); // Redirect to login on error
        }
      } catch (err) {
        console.error(err.message);
        // router.push('/login'); // Redirect to login on error
      }
    };

    fetchPmcDetails();
  }, [router]);

  if (!pmcDetails) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.profileCard}>
          <img className={styles.profilePic} src="/images/user.jpg" />
          <div className={styles.profileDetails}>
            <h2>{pmcDetails.pmc.name} Parking Management Company</h2>
          </div>
        </div>

        <div className={styles.detailsCard}>
          <div className={styles.detailColumns}>
            <div className={styles.detailColumn}>
              <div className={styles.detail}>
                <label>Company Name:</label>
                <p>{pmcDetails.pmc.name}</p>
              </div>
              <div className={styles.detail}>
                <label>Email Address:</label>
                <p>{pmcDetails.user.email}</p>
              </div>
              <div className={styles.detail}>
                <label>Last Accessed Time:</label>
                <p>12.30pm 0n 12th July 2024</p>
              </div>
            </div>
            <div className={styles.detailColumn}>
              <div className={styles.detail}>
                <label>Business Registration Number:</label>
                <p>{pmcDetails.pmc.regno}</p>
              </div>
              <div className={styles.detail}>
                <label>Company Address:</label>
                <p>{`${pmcDetails.user.addressno}, ${pmcDetails.user.street_1}, ${pmcDetails.user.street_2}, ${pmcDetails.user.city}, ${pmcDetails.user.province}`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;


