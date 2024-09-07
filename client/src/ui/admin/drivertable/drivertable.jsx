'use client'
import React, { useState, useEffect } from 'react';

const DriverTable = ({ drivers, onRemove }) => {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 mt-10 ml-5 mr-5">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr style={{ backgroundColor: 'rgb(255, 180, 3)' }}>
                        {/* <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Driver ID</th> */}
                        <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">Name</th> 
                        <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">NIC</th>
                        <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">Email</th>
                        <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">Location</th>
                        <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">Action</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                {drivers.map(driver => (
                        <tr key={driver.driver_id}>
                            {/* <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{driver.driver_id}</td> */}
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{`${driver.fname} ${driver.lname}`}</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{driver.nic}</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{driver.email}</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                {`${driver.city}, ${driver.province}`}
                            </td>
                            
                            <td className="whitespace-nowrap px-4 py-2">
                                <button
                                    onClick={() => onRemove(driver.driver_id)}
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
    )
}


export default DriverTable;



