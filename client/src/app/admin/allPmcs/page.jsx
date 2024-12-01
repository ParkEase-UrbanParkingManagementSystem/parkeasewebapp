'use client'
import React, { useState, useEffect } from 'react';

const AllPmcs = () => {
    const [pmcs, setPMCS] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPMCS = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/admin/get-pmc-details`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    
                   
                }
            });

            const parseRes = await response.json();

            if (response.ok) {
                setPMCS(parseRes.data || []); // Default to empty array if no data
            } else {
                console.error("Can't get PMCs details");
                setPMCS([]); // Default to empty array on error
            }
        } catch (error) {
            console.log(error.message);
            setPMCS([]); // Default to empty array on error
        } finally {
            setLoading(false); // Set loading to false once the request is complete
        }
    };

    useEffect(() => {
        fetchPMCS();
    }, []);

    const handleRemovePMC = async (pmcId) => {
        try {
            const response = await fetch(`/api/pmcs/${pmcId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Remove PMC from state
                setPMCS(pmcs.filter(pmc => pmc.pmc_id !== pmcId));
            } else {
                console.error('Failed to remove PMC');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <div style={{ textAlign: 'center', color: 'rgb(255, 180, 3)', marginTop: '20px', fontSize: '24px', fontWeight: 'bold' }}>
                All Parking Management Companies
            </div>

            {loading ? (
                <div style={{ textAlign: 'center' }}>Loading...</div>
            ) : (
                <div className="overflow-x-auto rounded-lg border border-gray-200 mt-10 ml-5 mr-5">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="ltr:text-left rtl:text-right">
                            <tr style={{ backgroundColor: 'rgb(255, 180, 3)' }}>
                                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">Company Name</th>
                                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">Business Registration No.</th>
                                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">Company Email</th>
                                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">Location</th>
                                <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {pmcs.map(pmc => (
                                <tr key={pmc.pmc_id}>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{pmc.name}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{pmc.regno}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{pmc.email}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        {`${pmc.city}, ${pmc.province}`}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2">
                                        <button
                                            onClick={() => handleRemovePMC(pmc.pmc_id)}
                                            className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AllPmcs;
