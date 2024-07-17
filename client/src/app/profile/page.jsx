"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import from 'next/navigation'
import styles from "./profile.module.css";
import Image from "next/image";
import Card from "../../ui/card/verticalcard/card";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Button from "../../ui/button/button"

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

  const cardItems1 = [
    
    { title: "Company Name:", content: `${pmcDetails.pmc.name}` },
    { title: "Email Address:", content: `${pmcDetails.user.email}` },
    { title: "Last Accessed Time:", content: "12.30pm 0n 12th July 2024" },
  ];

  const cardItems2 = [
    { title: "Business Registration Number:", content: `${pmcDetails.pmc.regno}` },
    // { title: "Contact Number:", content: "071 466 7655" },
    {
      title: "Company Address:",
      content: `${pmcDetails.user.addressno}, ${pmcDetails.user.street_1}, ${pmcDetails.user.street_2}, ${pmcDetails.user.city}`
    },
    { title: "District:", content: `${pmcDetails.user.province}` }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.imagecontainer}>
      <div className={styles.imgcnt}>
        <Image
          className={styles.userimage}
          src="/images/user.jpg"
          width="130"
          height="130"
        />
        </div>
        <p>{pmcDetails.pmc.name} Parking Management Company</p>
      </div>
      <Button label="Edit Profile" icon={faPen}/>
      <div className="flex">
        <div className="w-1/2">
          <Card items={cardItems1} />
        </div>

        <div className="w-1/2">
          <Card items={cardItems2} />
        </div>
      </div>
      
    </div>
  );
};

export default Profile;
