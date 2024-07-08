"use client"

import {useRef, useEffect} from "react"
import {Chart} from "chart.js/auto"
import React from 'react'

const ChartPMC = () => {

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
                    labels: ["January", "February", "March", "April", "May",
                                "June", "July", "August", "September", "October",
                                "November", "December"
                    ],

                    datasets: [{
                        label: "Revenue",
                        data: [34,54,65],
                        backgroundColor: "#1A2131",
                        borderColor: "#1A2131",
                        borderWidth: 1,
                    },
                ],
                },
                    options: {
                        // responsive: true,
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
    <div style={{position: "relative", width:"50vw", height:"23vw"}}>
        <canvas ref={chartRef}/>
    </div>
  )
}

export default ChartPMC