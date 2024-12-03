"use client"

import React, { useState, useEffect } from 'react';
import Navbar from '@/ui/homenavbar/homenavbar';

const Activity = () => {
    const [instances, setInstances] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const instancesPerPage = 4;

    useEffect(() => {
        const fetchInstances = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/parking/get-recent-parking-instances`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        token: token
                    }
                });

                const parseRes = await response.json();

                if (response.ok) {
                    setInstances(parseRes.data);
                    console.log("Instances", parseRes.data);
                } else {
                    console.error("Error:", parseRes.message);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchInstances();
    }, []);

    // Function to format date and time
    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return { formattedDate, formattedTime };
    };

    // Function to calculate days ago
    const calculateDaysAgo = (isoString) => {
        const date = new Date(isoString);
        const diffInMs = new Date() - date;
        const daysAgo = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        return daysAgo;
    };

    // Pagination Logic
    const indexOfLastInstance = currentPage * instancesPerPage;
    const indexOfFirstInstance = indexOfLastInstance - instancesPerPage;
    const currentInstances = instances.slice(indexOfFirstInstance, indexOfLastInstance);

    // Function to change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Fetch the most recent instance
    const mostRecentInstance = instances.length > 0 ? instances[0] : null;

    // Default image
    const defaultImage = "/images/parking.jpg";

    // Get the image source for the most recent activity card
    const activityImageSrc =
        mostRecentInstance && mostRecentInstance.images && mostRecentInstance.images.length > 0
            ? `${process.env.NEXT_PUBLIC_API_KEY}/uploads/${mostRecentInstance.images[0].replace(/\\/g, "/").split("/").pop()}`
            : defaultImage;

    return (
        <div className='min-h-screen bg-gradient-to-b from-[#FFD981] to-[#D1D2D5]'>
            <Navbar />
            <div className='p-6 grid grid-cols-1 md:grid-cols-2 gap-3'>
                {/* Most Recent Activity Card */}
                <div className='col-span-1 relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-[576px] mx-auto p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none'>
                    {mostRecentInstance ? (
                        <div className="bg-white p-3 rounded-xl">
                            <div className="text-[20px] font-bold text-navy-700 dark:text-white mb-2">Most Recent Activity</div>
                            <div className="image overflow-hidden">
                                <img className="h-auto w-full mx-auto rounded-xl" 
                                     src={activityImageSrc} 
                                     alt="Last Parked" />
                            </div>
                            <h1 className="text-gray-900 font-bold text-lg leading-8 my-1 mt-4">{mostRecentInstance.lot_name}</h1>
                            <p className="text-md text-gray-500 leading-6 font-semibold">
                                {formatDateTime(mostRecentInstance.in_time).formattedDate} | {formatDateTime(mostRecentInstance.in_time).formattedTime} - {formatDateTime(mostRecentInstance.out_time).formattedTime} | {mostRecentInstance.cost} LKR
                            </p>
                            
                        </div>
                    ) : (
                        <p className="text-gray-500">No recent activity found.</p>
                    )}
                </div>

                {/* History List */}
                <div className="col-span-1 relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-[576px] mx-auto p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                    <div className="flex items-center justify-between rounded-t-3xl p-3 w-full">
                        <div className="text-[20px] font-bold text-navy-700 dark:text-white">
                            History
                        </div>
                    </div>

                    {currentInstances && currentInstances.length > 0 ? (
                        currentInstances.map((instance, index) => {
                            const { formattedDate: inDate, formattedTime: inTime } = formatDateTime(instance.in_time);
                            const { formattedDate: outDate, formattedTime: outTime } = formatDateTime(instance.out_time);
                            const daysAgo = calculateDaysAgo(instance.in_time);

                            return (
                                <div key={index} className="flex h-full w-full items-start justify-between rounded-md border-[1px] border-gray-400 dark:hover:border-white/20 bg-white px-3 py-[10px] transition-all duration-150 hover:border-gray-200 dark:!bg-navy-800 dark:hover:!bg-navy-700 m-1">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center">
                                            <img className="h-full w-full rounded-xl"
                                                 src={`/images/${instance.type_id === 1 ? 'car' : instance.type_id === 2 ? 'motorcycle' : instance.type_id === 3 ? 'tw' : 'truck'}.png`}
                                                 alt="Vehicle" />
                                        </div>
                                        <div className="flex flex-col">
                                            <h5 className="text-base font-bold text-navy-700 dark:text-white">
                                                {instance.lot_name}
                                            </h5>
                                            <p className="mt-1 text-sm font-normal text-gray-600">
                                                {instance.vehicle_name} | {instance.licenseplate}
                                            </p>
                                            <p className="mt-1 text-sm font-normal text-gray-600">
                                                {inDate} | {inTime} - {outTime}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-1 flex items-center justify-center text-navy-700 dark:text-white">
                                        <div>
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path>
                                            </svg>
                                        </div>
                                        <div className="ml-1 flex items-center text-sm font-bold text-navy-700 dark:text-white">
                                            {instance.cost}<p className="ml-1">LKR</p>
                                        </div>
                                        <div className="ml-2 flex items-center text-sm font-normal text-gray-600 dark:text-white">
                                            <p>{daysAgo}</p>
                                            <p className="ml-1">days ago</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-gray-500">No parking instances found.</p>
                    )}

                    {/* Pagination Controls */}
                    <div className="mt-4 flex justify-center">
                        <button
                            className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <button
                            className="bg-yellow-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
                            onClick={() => paginate(currentPage + 1)}
                            disabled={indexOfLastInstance >= instances.length}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Activity;
