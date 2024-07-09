"use client";

import React from "react";
import Card from "../../ui/dashboard/card/card";
import Chart from "../../ui/dashboard/chartPmcRevenue/Chart";
import Dropdown from "../../ui/dashboard/dropdown/dropdown"
import { faSquareParking, faPerson, faCar, faPercent } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useState } from "react";

library.add(faSquareParking);
library.add(faPerson);
library.add(faCar);
library.add(faPercent);

const Dashboard = ({ setAuth }) => {

  const [timeFrame, setTimeFrame] = useState('Daily');

  const data = {
    Daily: {
      cardItemswarden: [
        { title: 'Total Registered Wardens', content: '60' },
        { title: 'Active Wardens', content: '54' },
        { title: 'New Registered Wardens', content: '2' }
      ],
      cardItemsparking: [
        { title: 'Total Parking Areas', content: '10' },
        { title: 'New Parking Areas', content: '1' }
      ],
      cardItemsslot: [
        { title: 'Total Slots Available', content: '400' },
        { title: 'Occupied Slots', content: '100' },
        { title: 'Remaining Slots', content: '300' }
      ],
      cardItemsrate: [
        { title: 'Average Parking Duration', content: '1 hour' },
        { title: 'Turnover Rate', content: '10%' }
      ],
    },
    Weekly: {
      cardItemswarden: [
        { title: 'Total Registered Wardens', content: '60' },
        { title: 'Active Wardens', content: '54' },
        { title: 'New Registered Wardens', content: '6' }
      ],
      cardItemsparking: [
        { title: 'Total Parking Areas', content: '10' },
        { title: 'New Parking Areas', content: '2' }
      ],
      cardItemsslot: [
        { title: 'Total Slots Available', content: '400' },
        { title: 'Occupied Slots', content: '200' },
        { title: 'Remaining Slots', content: '200' }
      ],
      cardItemsrate: [
        { title: 'Average Parking Duration', content: '1.5 hours' },
        { title: 'Turnover Rate', content: '15%' }
      ],
    },
    Monthly: {
      cardItemswarden: [
        { title: 'Total Registered Wardens', content: '60' },
        { title: 'Active Wardens', content: '50' },
        { title: 'New Registered Wardens', content: '10' }
      ],
      cardItemsparking: [
        { title: 'Total Parking Areas', content: '10' },
        { title: 'New Parking Areas', content: '3' }
      ],
      cardItemsslot: [
        { title: 'Total Slots Available', content: '400' },
        { title: 'Occupied Slots', content: '250' },
        { title: 'Remaining Slots', content: '150' }
      ],
      cardItemsrate: [
        { title: 'Average Parking Duration', content: '2 hours' },
        { title: 'Turnover Rate', content: '20%' }
      ],
    },
    Yearly: {
      cardItemswarden: [
        { title: 'Total Registered Wardens', content: '60' },
        { title: 'Active Wardens', content: '40' },
        { title: 'New Registered Wardens', content: '20' }
      ],
      cardItemsparking: [
        { title: 'Total Parking Areas', content: '10' },
        { title: 'New Parking Areas', content: '4' }
      ],
      cardItemsslot: [
        { title: 'Total Slots Available', content: '400' },
        { title: 'Occupied Slots', content: '300' },
        { title: 'Remaining Slots', content: '100' }
      ],
      cardItemsrate: [
        { title: 'Average Parking Duration', content: '3 hours' },
        { title: 'Turnover Rate', content: '25%' }
      ],
    }
  };

  return (
    <div>
      <h1 className="text-2xl">Dashboard</h1>

      <div className="my-2">
        <Dropdown 
          options={['Daily', 'Weekly', 'Monthly', 'Yearly']} 
          selectedOption={timeFrame} 
          onChange={setTimeFrame} 
        />
      </div>

      <div className="flex flex-row mb-4">
        <div className="w-1/4">
          <Card items={data[timeFrame].cardItemsslot} icon={faCar} />
        </div>

        <div className="w-1/4">
          <Card items={data[timeFrame].cardItemsparking} icon={faSquareParking} />
        </div>

        <div className="w-1/4">
          <Card items={data[timeFrame].cardItemswarden} icon={faPerson} />
        </div>

        <div className="w-1/4">
          <Card items={data[timeFrame].cardItemsrate} icon={faPercent} />
        </div>
      </div>

      <div className="flex mt-8 w-1/2">
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
