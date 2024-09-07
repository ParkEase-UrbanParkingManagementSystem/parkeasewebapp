'use client'
import React, { useState, useEffect } from 'react';
import PmcTable from '@/ui/admin/pmctable/pmctable';

const AllPmcs = () => {
    const [pmcs, setPMCS] = useState([]);

    const fetchPMCS = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/pmc/all-pmcs`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token: token
                }
            });

            const parseRes = await response.json();

            if (response.ok) {
                setPMCS(parseRes.data);
            } else {
                console.error("Can't get driver details");
            }
        } catch (error) {
            console.log(error.message);
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
                setPMCs(pmcs.filter(pmc => pmc.pmc_id !== pmcId));
            } else {
                console.error('Failed to remove PMC');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <div style={{ textAlign: 'center', color: 'rgb(255, 180, 3)', marginTop: '20px', fontSize:'24px', fontWeight:'bold' }}>
            All Parking Management Companies</div>
            <PmcTable pmc={pmcs} onRemove={handleRemovePMC} />
        </div>
        
        
    );
}

export default AllPmcs;
