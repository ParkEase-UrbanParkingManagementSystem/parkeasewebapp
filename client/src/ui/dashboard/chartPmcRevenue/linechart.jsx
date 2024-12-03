"use client";

import { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import React from "react";

const LineChartPMC = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    labels: [],
    data: [],
  });

  useEffect(() => {
    const fetchPeakHoursData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing from localStorage");
        return;
      }
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_KEY}/parkinglots/peak-hours`, // Update API path
          {
            headers: { "Content-Type": "application/json", token },
          }
        );

        const data = await response.json();

        if (response.ok) {
          const labels = data.data.map((item) => `${item.hour}:00`);
          const vehicleCounts = data.data.map((item) => item.vehicle_count);
          setChartData({ labels, data: vehicleCounts });
        } else {
          console.error("Failed to fetch peak hours data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching peak hours data:", error);
      }
    };

    fetchPeakHoursData();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const context = chartRef.current.getContext("2d");

      const newChart = new Chart(context, {
        type: "line",
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: "Peak Parking Hours (# of Vehicles)",
              data: chartData.data,
              backgroundColor: "#ffb403",
              borderColor: "#ffb403",
              borderWidth: 1,
              fill: false,
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 16,
                  weight: "300",
                },
              },
            },
          },
          scales: {
            x: {
              type: "category",
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      chartRef.current.chart = newChart;
    }
  }, [chartData]);

  return (
    <div style={{ position: "relative", width: "45vw", height: "25vw" }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineChartPMC;
