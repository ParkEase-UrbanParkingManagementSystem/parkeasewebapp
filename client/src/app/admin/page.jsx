'use client'
import React, { useState, useEffect } from 'react';
import StatCards from "@/ui/admin/statcards/statcards";

const Admin = () => {

    const [driverCount, setDriverCount] = useState(0);
    const [pmcCount, setPmcCount] = useState(0);
    const [count, setCount] = useState(0);



    const fetchCount = async () => {

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/admin/count`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    
                }
            });

            

            const parseRes = await response.json();

            if (response.ok) {
                setCount(parseRes.data);
                console.log("Hellllllllllllllllllllllllloooooooooooooo",parseRes.data);
            } else {
                console.error("Can't get driver details");
            }
        } catch (error) {
            console.log(error.message);
        }
    };



    const fetchDriverCount = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/driver/total-drivers`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token: token
                }
            });

            const parseRes = await response.json();

            if (response.ok) {
                setDriverCount(parseRes.data);
            } else {
                console.error("Can't get driver details");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const fetchPMCCount = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/pmc/total-pmcs`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token: token
                }
            });

            const parseRes = await response.json();

            if (response.ok) {
                setPmcCount(parseRes.data);
            } else {
                console.error("Can't get pmc details");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchDriverCount();
        fetchPMCCount();
        fetchCount();
    }, []);

    // console.log(driverCount, pmcCount);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            <StatCards
                imgSrc="https://img.freepik.com/free-photo/young-man-driving-his-car-night-time_1303-17089.jpg?t=st=1733229082~exp=1733232682~hmac=a267a37dc5d5ac30381f1515de8e09e788d121bb63a95c9c020ec49f013507b5&w=360"
                title="Drivers"
                number={count.driverCount}
                registeredInDb="5"
                pendingInDb="9"
                flaggedInDb="8"
            />
            <StatCards
                imgSrc="https://img.freepik.com/free-photo/top-view-electric-cars-parking-lot_23-2148972403.jpg?t=st=1725537746~exp=1725541346~hmac=da5ce3815a1167bf6a8777a5b3649d2a4215bbf3b507bd90c438fa7e110f9f54&w=1060"
                title="Parking Management Companies"
                number={count.pmcCount}
                registeredInDb="5"
                pendingInDb="9"
                flaggedInDb="8"
            />
            <StatCards
                imgSrc="https://img.freepik.com/premium-photo/aerial-view-busy-intersection-with-traffic-warden-middle-crosswalk_885831-120550.jpg?w=740"
                title="Parking Wardens"
                number={count.wardenCount}
                registeredInDb="5"
                pendingInDb="9"
                flaggedInDb="8"
            />
            <StatCards
                imgSrc="https://img.freepik.com/free-photo/empty-parking-lot-parking-lane-outdoor-public-park_1127-3375.jpg?t=st=1725592174~exp=1725595774~hmac=5b41e275c9af82775edcc6e0a2f1a6faa5203fe48b5ab3a3725f3b8d303dc5e4&w=996"
                title="Parking Instances Ongoing"
                number={count.parkingInstanceCount}
                registeredInDb="5"
                pendingInDb="9"
                flaggedInDb="8"
            />
            <StatCards
                imgSrc="https://img.freepik.com/premium-photo/professional-parking-lot-with-neatly-parked-cars-autumn-landscaping-corporate-office-parks_416256-82789.jpg?w=360"
                title="Parking Lots"
                number={count.parkingLotCount}
                registeredInDb="5"
                pendingInDb="9"
                flaggedInDb="8"
            />
        </div>
    );
};

export default Admin;