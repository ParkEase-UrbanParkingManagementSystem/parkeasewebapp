'use client'
import React, { useState, useEffect } from 'react';
import TransactionsTable from '@/ui/admin/transactionstable/transactionstable'; // Adjust the path as needed

const AllTransactions = () => {
    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = async () => {
        const token = localStorage.getItem("token");
        const currentDate = new Date().toISOString().split('T')[0]; // Format date as YYYY-MM-DD

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/pmc/total-toll?date=${currentDate}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token: token
                }
            });

            const parseRes = await response.json();

            if (response.ok) {
                setTransactions(parseRes.data);
            } else {
                console.error("Can't get transaction details");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);


    return (
        <div>
            <div style={{ textAlign: 'center', color: 'rgb(255, 180, 3)', marginTop: '20px', fontSize: '24px', fontWeight: 'bold' }}>
                Transactions
            </div>
            <TransactionsTable transactions={transactions} />
        </div>
    );
}

export default AllTransactions;
