"use client";

import React, { useState } from "react";
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

  const data = {
    Daily: {
      cardItemswarden: { title: "Total Registered Wardens", content: "60" },
      cardItemsparking: { title: "Total Parking Areas", content: "10" },
      cardItemsslot: { title: "Total Slots Available", content: "400" },
      cardItemsrate: { title: "Average Parking Duration", content: "1 hour" },
      cardItemsrevenue: { title: "Total Revenue", content: "300,000" },
      chart1: <BarChart />,
      chart2: <LineChart />,
    },
    Weekly: {
      cardItemswarden: { title: "Total Registered Wardens", content: "60" },
      cardItemsparking: { title: "Total Parking Areas", content: "10" },
      cardItemsslot: { title: "Total Slots Available", content: "400" },
      cardItemsrate: { title: "Average Parking Duration", content: "1.5 hours" },
      cardItemsrevenue: { title: "Total Revenue", content: "900,000" },
      chart1: <BarChart />,
      chart2: <LineChart />,
    },
    Monthly: {
      cardItemswarden: { title: "Total Registered Wardens", content: "60" },
      cardItemsparking: { title: "Total Parking Areas", content: "10" },
      cardItemsslot: { title: "Total Slots Available", content: "400" },
      cardItemsrate: { title: "Average Parking Duration", content: "2 hours" },
      cardItemsrevenue: { title: "Total Revenue", content: "12,000,000" },
      chart1: <BarChart />,
      chart2: <LineChart />,
    },
    Yearly: {
      cardItemswarden: { title: "Total Registered Wardens", content: "60" },
      cardItemsparking: { title: "Total Parking Areas", content: "10" },
      cardItemsslot: { title: "Total Slots Available", content: "400" },
      cardItemsrate: { title: "Average Parking Duration", content: "3 hours" },
      cardItemsrevenue: { title: "Total Revenue", content: "87,000,000" },
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
          <Card item={data[timeFrame].cardItemsparking} icon={faSquareParking} />
        </div>

        <div className="w-1/5">
          <Card item={data[timeFrame].cardItemswarden} icon={faPerson} />
        </div>

        <div className="w-1/5">
          <Card item={data[timeFrame].cardItemsrate} icon={faPercent} />
        </div>

        <div className="w-1/5">
          <Card item={data[timeFrame].cardItemsrevenue} icon={faHandHoldingDollar} />
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
