'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/ui/homenavbar/homenavbar";
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

export default function WalletScreen() {
  const [walletAmount, setWalletAmount] = useState(0);
  const [isTopUpDialogOpen, setIsTopUpDialogOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [topUpHistory, setTopUpHistory] = useState([]);
  
  const router = useRouter();

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      // hour: "numeric",
      // minute: "numeric",
      // hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
  };
  

  // Fetch wallet balance
  const fetchWalletBalance = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/driver/getWalletBalance`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        setWalletAmount(Number(data.data?.available_amount) || 0);
      } else {
        toast.error(data.message || "Failed to fetch wallet balance");
      }
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
      toast.error("Failed to fetch wallet balance");
    }
  };

  // Fetch top-up history
  const fetchTopUpHistory = async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/driver/topup-history`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });


      const data = await response.json();
      if (response.ok) {
        setTopUpHistory(data.data || []);
      } else {
        toast.error(data.message || "Failed to fetch top-up history");
      }
    } catch (error) {
      console.error("Error fetching top-up history:", error);
      toast.error("Failed to fetch top-up history");
    } finally {
      setIsLoading(false);
    }
  };

  console.log(topUpHistory);

  useEffect(() => {
    fetchWalletBalance();
    fetchTopUpHistory();

    // Check for successful payment
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");
    if (sessionId) {
      completeTopUp(sessionId);
    }
  }, []);

  // Handle top-up completion
  const completeTopUp = async (sessionId) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/parking/top-up-wallet`,
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

      if (response.ok) {
        setWalletAmount(data.newBalance);
        toast.success(data.message);
      } else {
        toast.error(data.message || "An error occurred during top-up");
      }
    } catch (error) {
      console.error("Error completing top-up:", error);
      toast.error("An error occurred during top-up");
    } finally {
      setIsLoading(false);
      window.history.replaceState({}, document.title, "/driver/wallet");
    }
  };

  // Handle top-up initiation
  const handleTopUp = async () => {
    if (!topUpAmount || parseFloat(topUpAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/create-checkout-session", {
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
    <div>
      <Navbar />
      <div className={styles.gradientBackground}>
        <div className={styles.container}>
          <h1 className={styles.titleText}>My PayPark Wallet</h1>
          <p className={styles.infoText}>
            PayPark Wallet is an easy and convenient way to pay for your parking fees. Simply top up your wallet and enjoy a hassle-free parking experience.
          </p>
          <div className={styles.wallet_and_balance}>
            <Image
              src="/images/paypark.png"
              alt="PayPark Logo"
              width={200}
              height={200}
              className={styles.payparkImage}
            />
            <div className={styles.walletWrapper}>
              <h2 className={styles.walletAmount}>Rs. {walletAmount.toFixed(2)}/=</h2>
              <p className={styles.walletLabel}>Available Balance</p>
            </div>
          </div>
          <div className={styles.buttons_container}>
            <button
              className={styles.topUpButton}
              onClick={() => setIsTopUpDialogOpen(true)}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Top Up Now"}
            </button>
            <button
              className={styles.topUpButton2}
              onClick={() => {
                setIsHistoryDialogOpen(true);
                fetchTopUpHistory();
              }}
              disabled={isLoading}
            >
              View Top-Up History
            </button>
          </div>
          <div className={styles.footer}>
            <p className={styles.footerText}>Accepted payment methods:</p>
            <div className={styles.paymentIcons}>
              <Image
                src="/images/visa.png"
                alt="Visa"
                width={50}
                height={40}
                className={styles.icon}
              />
              <Image
                src="/images/amex.png"
                alt="Amex"
                width={50}
                height={40}
                className={styles.icon}
              />
              <Image
                src="/images/mastercard.png"
                alt="Mastercard"
                width={50}
                height={40}
                className={styles.icon}
              />
            </div>
          </div>
        </div>
      </div>
      <Dialog open={isTopUpDialogOpen} onOpenChange={setIsTopUpDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Top Up Your Wallet</DialogTitle>
            <DialogDescription>
              Enter the amount you want to add to your wallet.
            </DialogDescription>
          </DialogHeader>
          <Input
            type="number"
            value={topUpAmount}
            onChange={(e) => setTopUpAmount(e.target.value)}
            placeholder="Enter amount in LKR"
          />
          <Button onClick={handleTopUp} disabled={isLoading}>
            {isLoading ? "Processing..." : "Proceed to Payment"}
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Top-Up History</DialogTitle>
          </DialogHeader>
          <div style={{ padding: "1rem", maxWidth: "600px", margin: "0 auto" }}>
  {topUpHistory.length > 0 ? (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {topUpHistory.map((item, index) => (
        <li
          key={index}
          style={{
            backgroundColor: "#f9f9f9",
            border: "1px solid #ddd",
            borderRadius: "8px",
            marginBottom: "1rem",
            padding: "1rem",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p
            style={{
              fontSize: "1rem",
              color: "#333",
              margin: "0 0 0.5rem",
            }}
          >
            <strong>Date:</strong> {formatDate(item.date)} at {item.time}
          </p>
          <p
            style={{
              fontSize: "1rem",
              color: "#555",
              margin: 0,
            }}
          >
            <strong>Amount:</strong> Rs. {Number(item.amount).toFixed(2)}
          </p>
        </li>
      ))}
    </ul>
  ) : (
    <p
      style={{
        fontSize: "1rem",
        textAlign: "center",
        color: "#888",
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      No top-up history found.
    </p>
  )}
</div>


        </DialogContent>
      </Dialog>
    </div>
  );
}
