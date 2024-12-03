'use client'
import React, { useState, useEffect } from 'react';
import TransactionsTable from '@/ui/admin/transactionstable/transactionstable'; // Adjust the path as needed

const AllTransactions = () => {
    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = async () => {
        console.log("Fetching transactions...................................");
        const token = localStorage.getItem("token");
        console.log("Token:", token);
        const currentDate = new Date().toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        console.log("Current Date:", currentDate);
    
        try {
            console.log("Fetching transactions...................................");
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/pmc/total-toll?date=${currentDate}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Use Authorization header for security
                },
            });
    
            const parseRes = await response.json();
    
            if (response.ok) {
                setTransactions(parseRes.data); // Set fetched data to state
                console.log("Transactions fetched successfully:", parseRes.data);
            } else {
                console.error("Can't get transaction details:", parseRes.message);
            }
        } catch (error) {
            console.error("Error fetching transactions:", error.message);
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
