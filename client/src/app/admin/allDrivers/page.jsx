'use client'
import React, { useState, useEffect } from 'react';
import DriverTable from '@/ui/admin/drivertable/drivertable';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const AllDrivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [analytics, setAnalytics] = useState(null);

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

    const fetchAnalytics = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/driver/analytics`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token: token
                }
            });

            const parseRes = await response.json();

            if (response.ok) {
                setAnalytics(parseRes.data);
            } else {
                console.error("Can't get driver analytics");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchDrivers();
        fetchAnalytics();
    }, []);

    const handleRemove = async (driverId) => {
        try {
            const response = await fetch(`/api/drivers/${driverId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setDrivers(drivers.filter(driver => driver.driver_id !== driverId));
            } else {
                console.error('Failed to remove driver');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const genderChartData = {
        labels: analytics?.genderDistribution.map(item => item.gender) || [],
        datasets: [
            {
                data: analytics?.genderDistribution.map(item => item.count) || [],
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
            },
        ],
    };

    const ageChartData = {
        labels: analytics?.ageDistribution.map(item => item.age_group) || [],
        datasets: [
            {
                label: 'Age Distribution',
                data: analytics?.ageDistribution.map(item => item.count) || [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const cityChartData = {
        labels: analytics?.topCities.map(item => item.city) || [],
        datasets: [
            {
                label: 'Top Cities',
                data: analytics?.topCities.map(item => item.count) || [],
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
        ],
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center text-yellow-500 mb-6">ParkEase Driver Users</h1>

            {analytics && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Drivers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{analytics.totalDrivers}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Gender Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Pie data={genderChartData} />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Age Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Bar data={ageChartData} />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Top 5 Cities</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Bar data={cityChartData} />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Verification Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Doughnut
                                data={{
                                    labels: ['Verified', 'Not Verified'],
                                    datasets: [{
                                        data: [
                                            analytics.verificationStatus.find(item => item.isverified)?.count || 0,
                                            analytics.verificationStatus.find(item => !item.isverified)?.count || 0
                                        ],
                                        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                                    }]
                                }}
                            />
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* <h2 className="text-xl font-bold mb-4">All Drivers</h2> */}
            <DriverTable drivers={drivers} onRemove={handleRemove} />
        </div>
    );
}

export default AllDrivers;

