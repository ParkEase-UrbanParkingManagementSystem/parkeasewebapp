"use client";

import { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import React from "react";

const BarChartPMC = () => {
  const chartRef = useRef(null);
  const [revenueData, setRevenueData] = useState({
    labels: [],
    data: [],
  });

  useEffect(() => {
    const fetchRevenueData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing from localStorage");
        return;
      }
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_KEY}/parkinglots/revenue`,
          {
            headers: { "Content-Type": "application/json", token },
          }
        );
        const data = await response.json();

        if (response.ok) {
          const labels = data.data.map((item) => item.parking_lot_name);
          const revenues = data.data.map(
            (item) => parseFloat(item.total_revenue) / 1000 
          );
          setRevenueData({ labels, data: revenues });
        } else {
          console.error("Failed to fetch revenue data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchRevenueData();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const context = chartRef.current.getContext("2d");

      const newChart = new Chart(context, {
        type: "bar",
        data: {
          labels: revenueData.labels,
          datasets: [
            {
              label: "Total Revenue By Parking Areas (thousands)",
              data: revenueData.data,
              backgroundColor: "#ffb403",
              borderColor: "#ffb403",
              borderWidth: 1,
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
  }, [revenueData]);

  return (
    <div style={{ position: "relative", width: "45vw", height: "25vw" }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default BarChartPMC;
