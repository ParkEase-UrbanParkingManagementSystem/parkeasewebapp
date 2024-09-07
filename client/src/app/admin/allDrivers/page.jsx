'use client'
import React, { useState, useEffect } from 'react';
import DriverTable from '@/ui/admin/drivertable/drivertable';

const AllDrivers = () => {
    const [drivers, setDrivers] = useState([]);

    const fetchDrivers = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/driver/all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token: token
                }
            });

            const parseRes = await response.json();

            if (response.ok) {
                setDrivers(parseRes.data);
            } else {
                console.error("Can't get driver details");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchDrivers();
    }, []);

    const handleRemove = async (driverId) => {
        try {
            const response = await fetch(`/api/drivers/${driverId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Remove driver from state
                setDrivers(drivers.filter(driver => driver.driver_id !== driverId));
            } else {
                console.error('Failed to remove driver');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div>
            <div style={{ textAlign: 'center', color: 'rgb(255, 180, 3)', marginTop: '20px', fontSize:'24px', fontWeight:'bold' }}>
            All Drivers</div>
            <DriverTable drivers={drivers} onRemove={handleRemove} />
        </div>
        
        
    );
}

export default AllDrivers;
