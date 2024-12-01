"use client";

import React, { useState, useEffect } from "react";
import Card from "../../ui/dashboard/card/card";
import BarChart from "../../ui/dashboard/chartPmcRevenue/barchart";
import LineChart from "../../ui/dashboard/chartPmcRevenue/linechart";
import Dropdown from "../../ui/dashboard/dropdown/dropdown";
import {
  faSquareParking,
  faPerson,
  faCar,
  faPercent,
  faHandHoldingDollar,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import styles from "./dashboard.module.css";

library.add(faSquareParking);
library.add(faPerson);
library.add(faCar);
library.add(faPercent);
library.add(faHandHoldingDollar);

const Dashboard = ({ setAuth }) => {
  const [timeFrame, setTimeFrame] = useState("Daily");
  const [cardData, setCardData] = useState({
    wardensCount: 0,
    parkingAreas: 0,
    slotsAvailable: 0,
    avgParkingDuration: "0 hours",
    totalRevenue: "0",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_KEY}/wardens/warden-count?timeframe=${timeFrame}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your token logic
            },
          }
        );

        const parseRes = await response.json();

        if (response.ok) {
          setCardData((prevData) => ({
            ...prevData,
            wardensCount: parseRes.data.totalWardens,
          }));
          console.log("Wardens Count Data:", parseRes.data);
        } else {
          console.error(
            "Failed to fetch wardens count:",
            parseRes.message || "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error fetching wardens count:", error.message);
      }
    };

    fetchData();
  }, [timeFrame]);

  const data = {
    Daily: {
      cardItemswarden: {
        title: "Total Registered Wardens",
        content: cardData.wardensCount,
      },
      cardItemsparking: {
        title: "Total Parking Areas",
        content: cardData.parkingAreas,
      },
      cardItemsslot: {
        title: "Total Slots Available",
        content: cardData.slotsAvailable,
      },
      cardItemsrate: {
        title: "Average Parking Duration",
        content: cardData.avgParkingDuration,
      },
      cardItemsrevenue: {
        title: "Total Revenue",
        content: cardData.totalRevenue,
      },
      chart1: <BarChart />,
      chart2: <LineChart />,
    },
    Weekly: {
      cardItemswarden: {
        title: "Total Registered Wardens",
        content: cardData.wardensCount,
      },
      cardItemsparking: {
        title: "Total Parking Areas",
        content: cardData.parkingAreas,
      },
      cardItemsslot: {
        title: "Total Slots Available",
        content: cardData.slotsAvailable,
      },
      cardItemsrate: {
        title: "Average Parking Duration",
        content: cardData.avgParkingDuration,
      },
      cardItemsrevenue: {
        title: "Total Revenue",
        content: cardData.totalRevenue,
      },
      chart1: <BarChart />,
      chart2: <LineChart />,
    },
    Monthly: {
      cardItemswarden: {
        title: "Total Registered Wardens",
        content: cardData.wardensCount,
      },
      cardItemsparking: {
        title: "Total Parking Areas",
        content: cardData.parkingAreas,
      },
      cardItemsslot: {
        title: "Total Slots Available",
        content: cardData.slotsAvailable,
      },
      cardItemsrate: {
        title: "Average Parking Duration",
        content: cardData.avgParkingDuration,
      },
      cardItemsrevenue: {
        title: "Total Revenue",
        content: cardData.totalRevenue,
      },
      chart1: <BarChart />,
      chart2: <LineChart />,
    },
    Yearly: {
      cardItemswarden: {
        title: "Total Registered Wardens",
        content: cardData.wardensCount,
      },
      cardItemsparking: {
        title: "Total Parking Areas",
        content: cardData.parkingAreas,
      },
      cardItemsslot: {
        title: "Total Slots Available",
        content: cardData.slotsAvailable,
      },
      cardItemsrate: {
        title: "Average Parking Duration",
        content: cardData.avgParkingDuration,
      },
      cardItemsrevenue: {
        title: "Total Revenue",
        content: cardData.totalRevenue,
      },
      chart1: <BarChart />,
      chart2: <LineChart />,
    },
  };

  const handleTimeFrameChange = (selectedTimeFrame) => {
    setTimeFrame(selectedTimeFrame);
  };

  return (
    <div>
      <div>
        <Dropdown
          options={["Daily", "Weekly", "Monthly", "Yearly"]}
          selectedOption={timeFrame}
          onChange={handleTimeFrameChange}
        />
      </div>

      <div className={styles.card}>
        <div className="w-1/5">
          <Card item={data[timeFrame].cardItemsslot} icon={faCar} />
        </div>

        <div className="w-1/5">
          <Card
            item={data[timeFrame].cardItemsparking}
            icon={faSquareParking}
          />
        </div>

        <div className="w-1/5">
          <Card item={data[timeFrame].cardItemswarden} icon={faPerson} />
        </div>

        <div className="w-1/5">
          <Card item={data[timeFrame].cardItemsrate} icon={faPercent} />
        </div>

        <div className="w-1/5">
          <Card
            item={data[timeFrame].cardItemsrevenue}
            icon={faHandHoldingDollar}
          />
        </div>
      </div>

      <div className={styles.chart}>
        <div>{data[timeFrame].chart1}</div>
        <div>{data[timeFrame].chart2}</div>
      </div>
    </div>
  );
};

export default Dashboard;
