'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Next.js Link component

const AllPmcs = () => {
    const [pmcs, setPMCS] = useState([]);
    const [loading, setLoading] = useState(true);
    const [analytics, setAnalytics] = useState(null);

    const fetchPMCS = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/admin/get-pmc-details`, {
                method: 'GET',
                headers: {

                    "Content-Type": "application/json",
                    
                }

            });
            const parseRes = await response.json();
            if (response.ok) {
                setPMCS(parseRes.data || []);
            } else {
                console.error("Can't get PMCs details");
                setPMCS([]);
            }
        } catch (error) {
            console.log(error.message);
            setPMCS([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchAnalytics = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/pmc/analytics`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setAnalytics(data.data);
        } catch (error) {
            console.error('Error fetching analytics:', error);
            setAnalytics(null);
        }
    };

    useEffect(() => {
        console.log('Fetching PMCs, analytics, and distribution...');
        fetchPMCS();
        fetchAnalytics();
    }, []);

    const handleInactivePMC = async (pmcId) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/admin/inactive-pmc`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pmc_id: pmcId }),
            });

            if (response.ok) {
                setPMCS(pmcs.map((pmc) => (pmc.pmc_id === pmcId ? { ...pmc, status: 'inactive' } : pmc)));
            } else {
                console.error('Failed to mark PMC as inactive');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleActivatePMC = async (pmcId) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/admin/active-pmc`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pmc_id: pmcId }),
            });

            if (response.ok) {
                setPMCS(pmcs.map((pmc) => (pmc.pmc_id === pmcId ? { ...pmc, status: 'active' } : pmc)));
            } else {
                console.error('Failed to mark PMC as active');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-yellow-600 mb-8">
                ParkEase Parking Management Companies
            </h1>

            {analytics ? (
                <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                            <p className="text-gray-600">Total PMCs</p>
                            <p className="text-2xl font-bold">{analytics.total_pmcs || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Total Wardens</p>
                            <p className="text-2xl font-bold">{analytics.total_wardens || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Total Parking Lots</p>
                            <p className="text-2xl font-bold">{analytics.total_parking_lots || 'N/A'}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-600">Analytics data not available</div>
            )}

            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-yellow-500">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Company Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Business Registration No.
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Company Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Location
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {pmcs.map((pmc) => (
                                <tr key={pmc.pmc_id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
    <Link href={`/admin/allPmcs/${pmc.pmc_id}`} className="text-blue-600 hover:underline">
        {pmc.name}
    </Link>
</td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pmc.regno}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pmc.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{`${pmc.city}, ${pmc.province}`}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {pmc.status === 'inactive' ? (
                                            <button
                                                onClick={() => handleActivatePMC(pmc.pmc_id)}
                                                className="text-slate-100 hover:text-yellow-900 bg-green-500 hover:bg-red-300 px-2 py-1 rounded-md"
                                            >
                                                Activate
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleInactivePMC(pmc.pmc_id)}
                                                className="text-slate-100 hover:text-yellow-900 bg-red-500 hover:bg-green-300 px-2 py-1 rounded-md"
                                            >
                                                Inactivate
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllPmcs;
