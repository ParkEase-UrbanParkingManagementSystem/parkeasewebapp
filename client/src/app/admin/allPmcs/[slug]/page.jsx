'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const PmcPage = () => {
    const params = useParams(); // useParams returns an object with route params
    const slug = params.slug; // Access the slug from params object
    const [pmcDetails, setPmcDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchPMCDetails = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/admin/get-pmc-ats?slug=${slug}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const parseRes = await response.json();

            if (response.ok) {
                setPmcDetails(parseRes.data|| null);
            } else {
                setError(parseRes.msg || "Failed to fetch PMC details.");
                setPmcDetails(null);
            }
        } catch (error) {
            console.error(error.message);
            setError("An unexpected error occurred while fetching PMC details.");
        } finally {
            setLoading(false);
        }
    };

    console.log(pmcDetails);

    useEffect(() => {
        fetchPMCDetails();
    }, [slug]);

    if (loading) {
        return <div className="text-center py-8 text-yellow-500">Loading PMC details...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center text-yellow-600 mb-8">PMC Details</h1>

            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{pmcDetails.name}</h2>
                <p className="text-gray-600 mb-2">
                    <strong>Registration Number:</strong> {pmcDetails.regno}
                </p>
                <p className="text-gray-600 mb-2">
                    <strong>Email:</strong> {pmcDetails.email}
                </p>
                <p className="text-gray-600 mb-2">
                    <strong>Address:</strong> {`${pmcDetails.addressno}, ${pmcDetails.street_1}, ${pmcDetails.street_2}, ${pmcDetails.city}, ${pmcDetails.province}`}
                </p>

                <h3 className="text-xl font-semibold text-yellow-600 mt-6 mb-4">Statistics</h3>
                <p className="text-gray-600 mb-2">
                    <strong>Number of Parking Lots:</strong> {pmcDetails.parking_lot_count}
                </p>


                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <div className="bg-yellow-100 rounded-lg p-4 text-center">
        <p className="text-gray-800 font-semibold">Wallet Revenue</p>
        <p className="text-yellow-600 font-bold text-lg">
            LKR {Number(pmcDetails?.wallet_revenue || 0).toFixed(2)}
        </p>
    </div>
    <div className="bg-yellow-100 rounded-lg p-4 text-center">
        <p className="text-gray-800 font-semibold">Cash Revenue</p>
        <p className="text-yellow-600 font-bold text-lg">
            LKR {Number(pmcDetails?.cash_revenue || 0).toFixed(2)}
        </p>
    </div>
    <div className="bg-yellow-100 rounded-lg p-4 text-center">
        <p className="text-gray-800 font-semibold">Park Points Revenue</p>
        <p className="text-yellow-600 font-bold text-lg">
            LKR {Number(pmcDetails?.parkpoints_revenue || 0).toFixed(2)}
        </p>
    </div>
</div>

            </div>
        </div>
    );
};

export default PmcPage;
