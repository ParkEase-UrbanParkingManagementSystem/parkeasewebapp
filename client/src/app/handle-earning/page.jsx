"use client";

import React, { useState, useEffect } from "react";
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
      const monthIndex = allMonths.indexOf(month) + 1;

      if (monthIndex === 0) {
        throw new Error("Invalid month selected");
      }
      const token = localStorage.getItem("token");

      if (!token) {
        Router.push("/login");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/wardens/revenue?month=${monthIndex}&year=${year}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            token: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setWardens(data);
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
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.empnamehead}>Warden ID</th>
                <th className={styles.empnamehead}>Warden Name</th>
                <th className={styles.empgenderhead}>No. of Working Days</th>
                <th className={styles.empagehead}>No. of Vehicles Scanned</th>
                <th className={styles.empcontacthead}>Revenue Gained</th>
                <th className={styles.empslothead}>Total Wage</th>
              </tr>
            </thead>
            <tbody>
              {wardens.length > 1 ? (
                wardens.map((warden) => (
                  <tr key={warden.warden_id}>
                    <td className={styles.empnamedata}>{warden.warden_id}</td>
                    <td className={styles.empgenderdata}>
                      {warden.warden_name}
                    </td>
                    <td className={styles.empagedata}>{warden.working_days}</td>
                    <td className={styles.empcontactdata}>
                      {warden.vehicles_scanned}
                    </td>
                    <td className={styles.empcontactdata}>
                      {warden.total_revenue}
                    </td>
                    <td className={styles.empcontactdata}>
                      {warden.total_wage}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 italic">
                    No data available for the selected month and year.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default WardenPage;
