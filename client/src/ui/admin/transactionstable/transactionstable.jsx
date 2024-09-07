'use client'
import React from 'react';

const TransactionsTable = ({ transactions }) => {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 mt-10 ml-5 mr-5">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr style={{ backgroundColor: 'rgb(255, 180, 3)' }}>
                        <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">PMC Name</th>
                        <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">Date</th>
                        <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">Total Toll Collected</th>
                        <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">Status</th>
                        <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">Action</th>
                    </tr>
                </thead>
                
                <tbody className="divide-y divide-gray-200">
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{transaction.pmc_name}</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{transaction.transaction_date}</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{transaction.total_collected.toFixed(2)}</td>
                            <td className="whitespace-nowrap px-4 py-2">
                                <button
                                    // onClick={() => onRemove(driver.driver_id)}
                                    className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                                >
                                    Make Payment
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TransactionsTable;
