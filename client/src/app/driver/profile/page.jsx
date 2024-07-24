"use client";
import styles from "../profile/page.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Ensure this import is correct

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/driver/details`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token
          }
        });

        const parseRes = await response.json();

        if (response.ok) {
          setUserDetails(parseRes.data);
        } else {
          console.error("Can't get the details");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUserDetails();
  }, [router]);

  // Handle case where userDetails is still null
  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Profile Page</h1>

      <div className={styles.profileSection}>
        <div className={styles.profileCard}>
          <img src="/images/user-icon.png" alt="Profile Picture" className={styles.profilePic} />
          <div className={styles.profileInfo}>
            <h2>{`${userDetails.fname} ${userDetails.lname}`}</h2>
            <p>Email: {userDetails.email}</p>
            <p>Mobile: {userDetails.contact}</p>
            <p>Address: {userDetails.addressNo}, {userDetails.street1} {userDetails.street2}, {userDetails.city}, {userDetails.district}</p>
            <p>NIC: {userDetails.nic}</p>
          </div>
        </div>

        <div className={styles.vehicleSection}>
          <div className={styles.vehicleCard}>
            <h2 className={styles.cardTitle}>Vehicle Information</h2>
            <div className={styles.vehicleGrid}>
              {userDetails.vehicles && userDetails.vehicles.length > 0 ? (
                userDetails.vehicles.map((vehicle) => (
                  <div key={vehicle.licensePlate} className={styles.vehicleItem}>
                    <img src={vehicle.imageUrl} alt={vehicle.model} className={styles.vehiclePic} />
                    <div className={styles.vehicleInfo}>
                      <p>{vehicle.model}</p>
                      <p>License Plate: {vehicle.licensePlate}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No vehicles registered</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
