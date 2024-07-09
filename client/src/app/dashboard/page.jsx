import React from "react";
import Card from "../../ui/dashboard/card/card";
import Chart from "../../ui/dashboard/chartPmcRevenue/Chart";

export const metadata = {
  title: "Dashboard",
  description: "This is the dashboard",
};

const Dashboard = ({ setAuth }) => {
  return (
    <div className="">
      <h1 className="text-2xl mt-6 mb-3">Dashboard</h1>

      <div className="flex">
        <div className="w-1/3">
          <Card title="Total Parking Areas" content="7" />
          {/* Other components or elements */}
        </div>

        <div className="w-1/3">
          <Card title="Total Parking Slots" content="518 Slots" />
          {/* Other components or elements */}
        </div>

        <div className="w-1/3">
          <Card title="Total Wardens" content="11" />
          {/* Other components or elements */}
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
