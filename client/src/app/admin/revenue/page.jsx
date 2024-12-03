'use client';
import React, { useState, useEffect } from 'react';

const AdminRevenue = () => {
    const [revenueDetails, setRevenueDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRevenueDetails = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/admin/get-admin-revenue`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                setRevenueDetails(data || []);
            } else {
                console.error('Failed to fetch revenue details');
                setRevenueDetails([]);
            }
        } catch (error) {
            console.error('Error fetching revenue details:', error);
            setRevenueDetails([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRevenueDetails();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-yellow-600 mb-8">
                PMC Revenue Details
            </h1>

            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-yellow-500">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    PMC Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {revenueDetails.length > 0 ? (
                                revenueDetails.map((record, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {record.pmc_name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(record.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {`Rs. ${record.amount}/=`}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"
                                    >
                                        No revenue records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminRevenue;
