"use client"

import { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";
import React from 'react';

const LineChartPMC = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            if (chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }

            const context = chartRef.current.getContext("2d");

            const newChart = new Chart(context, {
                type: "line", 
                data: {
                    labels: ["8.00", "9.00", "10.00", "11.00", "12.00",
                                "13.00", "14.00", "15.00", "16.00", "17.00", "18.00", "19.00", "20.00"
                    ],
                    datasets: [{
                        label: "Peak parking hours (#ofVehicles)",
                        data: [34, 54, 65, 76, 83, 52, 43, 56, 21, 32, 9, 7,8],
                        backgroundColor: "#ffb403",
                        borderColor: "#ffb403",
                        borderWidth: 1,
                        fill: false, 
                        tension: 0.1 
                    }],
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            type: "category"
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            chartRef.current.chart = newChart;
        }
    }, []); 

    return (
        <div style={{ position: "relative", width: "45vw", height: "25vw" }}>
            <canvas ref={chartRef} />
        </div>
    );
}

export default LineChartPMC;
