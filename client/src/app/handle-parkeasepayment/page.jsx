"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./wallet.module.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export default function ParkPoints() {
  const [isTopUpDialogOpen, setIsTopUpDialogOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [monthlyValues, setMonthlyValues] = useState({
    January: 10000,
    February: 10000,
    March: 10000,
    April: 10000,
    May: 10000,
    June: 10000,
    July: 10000,
    August: 10000,
    September: 10000,
    October: 10000,
    November: 10000,
    December: 10000,
  });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // fetchWalletBalance();
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");
    if (sessionId) {
      console.log("go toooooooooooooooooooooo");
      completeTopUp(sessionId);
    }
  }, []);

  // const fetchWalletBalance = async () => {
  //   const token = localStorage.getItem("token");
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_KEY}/driver/getWalletBalance`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           token: token,
  //         },
  //       }
  //     );
  //     const data = await response.json();

  //     if (response.ok) {
  //       setWalletAmount(Number(data.data?.available_amount) || 0);
  //     } else {
  //       toast.error(data.message || "Failed to fetch wallet balance");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching wallet balance:", error);
  //     toast.error("Failed to fetch wallet balance");
  //   }
  // };

  const completeTopUp = async (sessionId) => {
    console.log("in functionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      console.log(
        "Completing top-up with funcccccccccccccccccccccccccc:",
        sessionId
      );

      const response = await fetch(
        // `${process.env.NEXT_PUBLIC_API_KEY}/pmctype/subscription`,
        `${process.env.NEXT_PUBLIC_API_KEY}/parking/subscription`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({ session_id: sessionId }),
        }
      );
      const data = await response.json();
      console.log("fetchedddddddddddddddddddddddddddddd");
      console.log("response", data);

      if (response.ok) {
        console.log("Top-up completed successfullyyyyyyyyyyyyyy:", data);
        toast.success(data.message);
      } else {
        console.error("Error completing top-up erorrrrrrrrrrrrrrrrrr:", data);
        toast.error(data.message || "An error occurred during top-up");
      }
    } catch (error) {
      console.error("Error completing top-up:", error);
      toast.error("An error occurred during top-up");
    } finally {
      setIsLoading(false);
      // Clear session_id from the URL
      window.history.replaceState(
        {},
        document.title,
        "/handle-parkeasepayment"
      );
    }
  };

  const handlePopup = (month) => {
    setSelectedMonth(month); // Set the selected month
    setTopUpAmount(monthlyValues[month]); // Pre-fill the input field with the month's value
    setIsTopUpDialogOpen(true); // Open the dialog
  };

  const handleTopUp = async () => {
    if (!topUpAmount || parseFloat(topUpAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/pmc-fee-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: parseFloat(topUpAmount) }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = data.url;
      } else {
        toast.error(data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error initiating top-up:", error);
      toast.error("An error occurred during top-up request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>ParkEase Monthly Payment Management</p>
       
        
      </div>

      

      <div className={styles.tablecontent}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.empnamehead}>Month</th>
              <th className={styles.empgenderhead}>Value</th>
              <th className={styles.empagehead}>Pay</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(monthlyValues).map(([month, value]) => (
              <tr key={month}>
                <td>{month}</td>
                <td>{value}</td>
                <td>
                  <button
                    className={styles.button}
                    onClick={() => handlePopup(month)}
                  >
                    Pay Now
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="m-8 text-lg font-semibold text-red-500">You have to pay the monthly subscription on or before the 20th of each month. Otherwise ParkEase will Inactivate your parking lots</p>
      </div>
      <Dialog open={isTopUpDialogOpen} onOpenChange={setIsTopUpDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Details for {selectedMonth}</DialogTitle>
            <DialogDescription>
              Value for {selectedMonth}: Rs. {monthlyValues[selectedMonth]}
            </DialogDescription>
          </DialogHeader>
          <Input
            type="number"
            value={topUpAmount}
            onChange={(e) => setTopUpAmount(e.target.value)} // Allows editing if needed
            readOnly
          />
          <Button onClick={handleTopUp} disabled={isLoading}>
            {isLoading ? "Processing..." : "Proceed to Payment"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
