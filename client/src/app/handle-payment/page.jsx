"use client";

import React, { useState } from "react";
import styles from "./payment.module.css";
import Dropdown from "@/ui/dashboard/dropdown/dropdown";

const WardenPage = () => {
  const allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  const currentMonthIndex = today.getMonth();
  const currentMonth = allMonths[currentMonthIndex];

  const pastAndCurrentMonths = allMonths.slice(0, currentMonthIndex + 1);

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const wardensData = {
    January: [
      {
        warden_id: "WF8GHJ",
        name: "Kavindu Perera",
        workingDays: 30,
        vehiclesScanned: 95,
        commissionGained: "200.00",
        totalWage: "5200.00",
        status: "Paid",
      },
      {
        warden_id: "WF8JLK",
        name: "Amaya Silva",
        workingDays: 25,
        vehiclesScanned: 88,
        commissionGained: "175.00",
        totalWage: "5175.00",
        status: "Paid",
      },
    ],
    February: [
      {
        warden_id: "WF8PLK",
        name: "Nimal Rajapakse",
        workingDays: 28,
        vehiclesScanned: 92,
        commissionGained: "180.00",
        totalWage: "5180.00",
        status: "Paid",
      },
      {
        warden_id: "WF8YUJ",
        name: "Saman Kumara",
        workingDays: 35,
        vehiclesScanned: 91,
        commissionGained: "160.00",
        totalWage: "5160.00",
        status: "Paid",
      },
      {
        warden_id: "WF8XYZ",
        name: "Tharindu Wickramasinghe",
        workingDays: 27,
        vehiclesScanned: 89,
        commissionGained: "170.00",
        totalWage: "5170.00",
        status: "Paid",
      },
      {
        warden_id: "WF8XYZ",
        name: "Tharindu Wickramasinghe",
        workingDays: 27,
        vehiclesScanned: 89,
        commissionGained: "170.00",
        totalWage: "5170.00",
        status: "Paid",
      },
    ],
    March: [
      {
        warden_id: "WF8MNJ",
        name: "Ruwan Fernando",
        workingDays: 31,
        vehiclesScanned: 100,
        commissionGained: "220.00",
        totalWage: "5220.00",
        status: "Paid",
      },
      {
        warden_id: "WF8XYZ",
        name: "Tharindu Wickramasinghe",
        workingDays: 27,
        vehiclesScanned: 89,
        commissionGained: "170.00",
        totalWage: "5170.00",
        status: "Paid",
      },
    ],
    April: [
      {
        warden_id: "WF8ABC",
        name: "Sajith Perera",
        workingDays: 30,
        vehiclesScanned: 97,
        commissionGained: "210.00",
        totalWage: "5210.00",
        status: "Paid",
      },
      {
        warden_id: "WF8ABC",
        name: "Sajith Perera",
        workingDays: 30,
        vehiclesScanned: 97,
        commissionGained: "210.00",
        totalWage: "5210.00",
        status: "Paid",
      },
      {
        warden_id: "WF8ABC",
        name: "Sajith Perera",
        workingDays: 30,
        vehiclesScanned: 97,
        commissionGained: "210.00",
        totalWage: "5210.00",
        status: "Paid",
      },
      {
        warden_id: "WF8ABC",
        name: "Sajith Perera",
        workingDays: 30,
        vehiclesScanned: 97,
        commissionGained: "210.00",
        totalWage: "5210.00",
        status: "Paid",
      },
      {
        warden_id: "WF8DEF",
        name: "Chathura Jayasinghe",
        workingDays: 26,
        vehiclesScanned: 85,
        commissionGained: "160.00",
        totalWage: "5160.00",
        status: "Paid",
      },
    ],
    May: [
      {
        warden_id: "WF8GHI",
        name: "Dinuka Senanayake",
        workingDays: 31,
        vehiclesScanned: 102,
        commissionGained: "230.00",
        totalWage: "5230.00",
        status: "Paid",
      },
      {
        warden_id: "WF8JKL",
        name: "Lakshan Weerasinghe",
        workingDays: 29,
        vehiclesScanned: 90,
        commissionGained: "180.00",
        totalWage: "5180.00",
        status: "Paid",
      },
    ],
    June: [
      {
        warden_id: "WF8MNO",
        name: "Kusal Perera",
        workingDays: 30,
        vehiclesScanned: 98,
        commissionGained: "220.00",
        totalWage: "5220.00",
        status: "Paid",
      },
      {
        warden_id: "WF8PQR",
        name: "Dulanga Jayawardena",
        workingDays: 28,
        vehiclesScanned: 87,
        commissionGained: "170.00",
        totalWage: "5170.00",
        status: "Paid",
      },
    ],
    July: [
      {
        warden_id: "WF8STU",
        name: "Kasun Rajapakse",
        workingDays: 31,
        vehiclesScanned: 101,
        commissionGained: "240.00",
        totalWage: "5240.00",
        status: "Unpaid",
      },
      {
        warden_id: "WF8VWX",
        name: "Nuwan Hettiarachchi",
        workingDays: 30,
        vehiclesScanned: 95,
        commissionGained: "200.00",
        totalWage: "5200.00",
        status: "Unpaid",
      },
      {
        warden_id: "WF8PQR",
        name: "Dulanga Jayawardena",
        workingDays: 28,
        vehiclesScanned: 87,
        commissionGained: "170.00",
        totalWage: "5170.00",
        status: "Unpaid",
      },
      {
        warden_id: "WF8MNO",
        name: "Kusal Perera",
        workingDays: 30,
        vehiclesScanned: 98,
        commissionGained: "220.00",
        totalWage: "5220.00",
        status: "Unpaid",
      },
    ],
  };

  const wardens = wardensData[selectedMonth] || [];

  const getCurrentDate = () => today.getDate();

  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();

  const getTimePeriod = () => {
    const currentYear = today.getFullYear();
    const selectedMonthIndex = allMonths.indexOf(selectedMonth);

    if (selectedMonthIndex === currentMonthIndex) {
      return `1st of ${selectedMonth} - ${getCurrentDate()} of ${selectedMonth}`;
    } else {
      const daysInMonth = getDaysInMonth(selectedMonthIndex, currentYear);
      return `1st of ${selectedMonth} - ${daysInMonth} of ${selectedMonth}`;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>Warden Salary Management</p>
      </div>
      <div className={styles.heading}>
        <div></div>
        <div className={styles.dropdown}>
          <Dropdown
            options={pastAndCurrentMonths}
            selectedOption={selectedMonth}
            onChange={setSelectedMonth}
          />
        </div>
      </div>

      <div className={styles.tablecontent}>
        <div className="mb-3 text-yellow-500 font-semibold">
          Considering Time Period: {getTimePeriod()}
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.empnamehead}>Warden ID</th>
              <th className={styles.empnamehead}>Warden Name</th>
              <th className={styles.empgenderhead}>No. of Working Days</th>
              <th className={styles.empagehead}>No. of Vehicles Scanned</th>
              <th className={styles.empcontacthead}>Commission Gained</th>
              <th className={styles.empslothead}>Total Wage</th>
              <th className={styles.empslothead}>Status</th>
            </tr>
          </thead>
          <tbody>
            {wardens.length > 0 ? (
              wardens.map((warden) => (
                <tr key={warden.warden_id}>
                  <td className={styles.empnamedata}>{warden.warden_id}</td>
                  <td className={styles.empgenderdata}>{warden.name}</td>
                  <td className={styles.empagedata}>{warden.workingDays}</td>
                  <td className={styles.empcontactdata}>
                    {warden.vehiclesScanned}
                  </td>
                  <td className={styles.empcontactdata}>
                    {warden.commissionGained}
                  </td>
                  <td className={styles.empcontactdata}>{warden.totalWage}</td>
                  <td
                    className={
                      warden.status === "Paid"
                        ? styles.statusActive
                        : styles.statusInactive
                    }
                  >
                    {warden.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className={styles.noData}>
                  No wardens data available for this month
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WardenPage;
