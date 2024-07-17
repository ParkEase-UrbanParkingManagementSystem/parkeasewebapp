"use client"

import {useRef, useEffect} from "react"
import {Chart} from "chart.js/auto"
import React from 'react'

const BarChartPMC = () => {

    const chartRef = useRef(null)

    useEffect(()=>{
        if(chartRef.current){
            if(chartRef.current.chart){
                chartRef.current.chart.destroy()
            }

            const context = chartRef.current.getContext("2d");

            const newChart = new Chart(context, {
                type: "bar",
                data: {
                    labels: ["Area_1", "Area_2", "Area_3", "Area_4", "Area_5",
                                "Area_6", "Area_7", "Area_8", "Area_9", "Area_10",
                                "Area_11", "Area_12"
                    ],

                    datasets: [{
                        label: "Total Revenue By Parking Areas (thousands)",
                        data: [34,54,65,34,54,65,34,54,65,34,54,65],
                        backgroundColor: "#ffb403",
                        borderColor: "#ffb403",
                        borderWidth: 1,
                    },
                ],
                },
                    options: {
                        responsive: true,
                        scales:{
                            x: {
                                type: "category"
                            },
                            y: {
                                beginAtZero: true
                            }
                        }
                    }

            })

            chartRef.current.chart = newChart

        }
    })

  return (
    <div style={{ position: "relative", width: "45vw", height: "25vw" }}>
  <canvas ref={chartRef} />
</div>

  )
}

export default BarChartPMC