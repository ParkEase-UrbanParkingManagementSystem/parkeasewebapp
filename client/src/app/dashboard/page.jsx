'use client';

import React, { useState, useEffect } from "react";
import Card from "../../ui/dashboard/card/card";
import BarChart from "../../ui/dashboard/chartPmcRevenue/barchart";
import LineChart from "../../ui/dashboard/chartPmcRevenue/linechart";
import { faSquareParking, faPerson, faCar, faPercent, faHandHoldingDollar, faBicycle } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import styles from "./dashboard.module.css";

library.add(faSquareParking);
library.add(faPerson);
library.add(faCar);
library.add(faBicycle);
library.add(faPercent);
library.add(faHandHoldingDollar);

const Dashboard = ({ setAuth }) => {
  const [cardData, setCardData] = useState({
    wardensCount: 0,
    parkingAreas: 0,
    totalCarCapacity: 0,
    totalBikeCapacity: 0,
    avgParkingDuration: "0 hours",
    totalRevenue: 0,
  });

  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        console.error("Token is missing from localStorage");
        return;
      }
  
      setLoading(true);
  
      try {
        // Fetch wardens count without timeframe
        const wardenResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_KEY}/wardens/warden-count`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json", token },
          }
        );
        const wardenData = wardenResponse.ok ? await wardenResponse.json() : {};
  
        // Fetch parking lot count
        const parkingLotResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_KEY}/parkinglots/parking-lot-count`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json", token },
          }
        );
        const parkingLotData = await parkingLotResponse.json();

        // Fetch total car and bike capacities
        const capacityResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_KEY}/parkinglots/parking-capacity`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json", token },
          }
        );
        const capacityData = capacityResponse.ok ? await capacityResponse.json() : {};

        // Fetch average duration
        const fetchAverageDuration = await fetch(
          `${process.env.NEXT_PUBLIC_API_KEY}/parking/average-parking`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json", token },
          }
        );
        const averageduration = fetchAverageDuration.ok ? await fetchAverageDuration.json() : {};
        // console.log(averageduration);

        const revenueResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_KEY}/parkinglots/total-revenue`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json", token },
          }
        );
        const revenueData = revenueResponse.ok ? await revenueResponse.json() : {};
  
        // Update card data state
        setCardData((prevData) => ({
          ...prevData,
          wardensCount: wardenData?.data?.totalWardens || 0,
          parkingAreas: parkingLotData?.data?.totalParkingLots || 0,
          totalCarCapacity: capacityData?.data?.totalCarCapacity || 0,
          totalBikeCapacity: capacityData?.data?.totalBikeCapacity || 0,
          avgParkingDuration: averageduration?.data?.avgParkingDuration || 0,
          totalRevenue: revenueData?.data?.totalRevenue || 0,
        }));
      } catch (error) {
        console.error("Error fetching dashboard data:", error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }

  const data = {
    cardItemswarden: {
      title: "Total Registered Wardens",
      content: cardData.wardensCount,
    },
    cardItemsparking: {
      title: "Total Parking Areas",
      content: cardData.parkingAreas,
    },
    cardItemsCarCapacity: {
      title: "Total Car Slots Available",
      content: cardData.totalCarCapacity,
    },
    cardItemsBikeCapacity: {
      title: "Total Bike Slots Available",
      content: cardData.totalBikeCapacity,
    },
    cardItemsrate: {
      title: "Average Parking Duration",
      content: cardData.avgParkingDuration,
    },
    cardItemsrevenue: {
      title: "Total Revenue",
      content: `${parseFloat(cardData.totalRevenue).toLocaleString()}`,
    },
    chart1: <BarChart />,
    chart2: <LineChart />,
  };

  return (
    <div>
      <div className={styles.card}>
        {/* <div className="w-1/5">
          <Card item={data.cardItemsslot} icon={faCar} />
        </div> */}

        <div className="w-1/6">
          <Card item={data.cardItemsCarCapacity} icon={faCar} />
        </div>

        <div className="w-1/6">
          <Card item={data.cardItemsBikeCapacity} icon={faBicycle} />
        </div>

        <div className="w-1/6">
          <Card item={data.cardItemsparking} icon={faSquareParking} />
        </div>

        <div className="w-1/6">
          <Card item={data.cardItemswarden} icon={faPerson} />
        </div>

        <div className="w-1/6">
          <Card item={data.cardItemsrate} icon={faPercent} />
        </div>

        <div className="w-1/6">
          <Card item={data.cardItemsrevenue} icon={faHandHoldingDollar} />
        </div>
      </div>

      <div className={styles.chart}>
        <div>{data.chart1}</div>
        <div>{data.chart2}</div>
      </div>
    </div>
  );
};

export default Dashboard;
