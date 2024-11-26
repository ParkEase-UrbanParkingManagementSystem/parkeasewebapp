"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import from 'next/navigation'
import styles from "./pmcnavbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const Navbar = () => {
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
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_KEY}/pmc/details`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );

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

  return (
    <div className={styles.container}>
      <div></div>
      <div className={styles.searchcontainer}>
        <input type="text" placeholder="Search" />
        <FontAwesomeIcon icon={faSearch} className={styles.searchicon} />
      </div>
      <div className={styles.notification}>
        <FontAwesomeIcon icon={faBell} className={styles.notificationicon} />
      </div>
      <div className={styles.user}>
        <div className={styles.imagecontainer}>
          <Image
            className={styles.userimage}
            src="/images/user.jpg"
            width="30"
            height="30"
            alt="User"
          />
        </div>
        {/* <div className={styles.username}>{pmcDetails.pmc.name.slice(0, 2).toUpperCase()}</div> */}
        <div className={styles.username}>
          {pmcDetails && pmcDetails.pmc
            ? pmcDetails.pmc.name.slice(0, 2).toUpperCase()
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
