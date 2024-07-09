"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import from 'next/navigation'
import styles from "./profile.module.css";
import Image from "next/image";

const Profile = () => {
    const [pmcDetails, setPmcDetails] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchPmcDetails = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                router.push('/login'); // Redirect to login if no token found
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/pmc/details', {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        'token': token
                    },
                });

                const parseRes = await response.json();

                if (response.ok) {
                    setPmcDetails(parseRes);
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
            <div className={styles.imagecontainer}>
                <Image
                    className={styles.userimage}
                    src="/images/user.jpg"
                    width="130"
                    height="130"
                    alt="User Image"
                />
            </div>
            <div className={styles.profilecontainer}>
                <p>Name: {pmcDetails.pmc.name}</p>
                <p>Email Address: {pmcDetails.user.email}</p>
                <p>Business Registration No. : {pmcDetails.pmc.regno}</p>
                
                <p>Address No. : {pmcDetails.user.addressno}</p>
                <p>Street Name 01: {pmcDetails.user.street_1}</p>
                <p>Street Name 02: {pmcDetails.user.street_2}</p>
                <p>City: {pmcDetails.user.city}</p>
                <p>District: {pmcDetails.user.province}</p>
            </div>
        </div>
    );
};

export default Profile;
