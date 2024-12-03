"use client";

import React, { useState, useEffect } from "react";
import styles from "./payment.module.css";
import Dropdown from "@/ui/dashboard/dropdown/dropdown";
import axios from "axios"; // Axios for API requests

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
  const currentYear = today.getFullYear();

  const pastAndCurrentMonths = allMonths.slice(0, currentMonthIndex + 1);

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [wardens, setWardens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWardenDetails = async (month, year) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/warden/revenue`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            token: token,
          },
        }
      );

      setWardens(response.data);
    } catch (err) {
      console.error("Error fetching warden details:", err);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWardenDetails(selectedMonth, currentYear);
  }, [selectedMonth, currentYear]);

  const getTimePeriod = () => {
    const daysInMonth = new Date(
      currentYear,
      allMonths.indexOf(selectedMonth) + 1,
      0
    ).getDate();

    return `1st of ${selectedMonth} - ${
      selectedMonth === currentMonth ? today.getDate() : daysInMonth
    } of ${selectedMonth}`;
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

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : wardens.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.empnamehead}>Warden ID</th>
                <th className={styles.empnamehead}>Warden Name</th>
                <th className={styles.empgenderhead}>No. of Working Days</th>
                <th className={styles.empagehead}>No. of Vehicles Scanned</th>
                <th className={styles.empcontacthead}>Revenue Gained</th>
                <th className={styles.empslothead}>Total Wage</th>
                <th className={styles.empslothead}>Status</th>
              </tr>
            </thead>
            <tbody>
              {wardens.map((warden) => (
                <tr key={warden.warden_id}>
                  <td className={styles.empnamedata}>{warden.warden_id}</td>
                  <td className={styles.empgenderdata}>{warden.name}</td>
                  <td className={styles.empagedata}>{warden.workingDays}</td>
                  <td className={styles.empcontactdata}>
                    {warden.vehiclesScanned}
                  </td>
                  <td className={styles.empcontactdata}>
                    {warden.revenueGained}
                  </td>
                  <td className={styles.empcontactdata}>
                    {warden.totalWage}
                  </td>
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
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available for the selected month and year.</p>
        )}
      </div>
    </div>
  );
};

export default WardenPage;
