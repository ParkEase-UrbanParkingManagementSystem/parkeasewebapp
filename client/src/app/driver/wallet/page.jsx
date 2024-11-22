"use client"

import Navbar from "@/ui/homenavbar/homenavbar";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./wallet.module.css";
import { useRouter } from "next/navigation";


export default function WalletScreen() {
  const [walletAmount, setWalletAmount] = useState(0);

  const router = useRouter();

  const fetchWalletBalance = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/driver/getWalletBalance`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      const data = await response.json();
      setWalletAmount(Number(data.data?.available_amount) || 0);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWalletBalance();
  }, []);

  return (
    <div>
        <Navbar />
    <div className={styles.gradientBackground}>
      <div className={styles.container}>
        {/* Header */}
        <h1 className={styles.titleText}>My PayPark Wallet</h1>

        {/* Information Section */}
        <p className={styles.infoText}>
          PayPark Wallet is an easy and convenient way to pay for your parking fees. Simply top up your wallet and enjoy a hassle-free parking experience.
        </p>

        {/* PayPark Image */}

        <div className={styles.wallet_and_balance}>
        <Image
          src="/images/paypark.png"
          alt="PayPark Logo"
          width={200}
          height={200}
          className={styles.payparkImage}
        />

        {/* Wallet Balance */}
        <div className={styles.walletWrapper}>
          <h2 className={styles.walletAmount}>Rs. {walletAmount.toFixed(2)}/=</h2>
          <p className={styles.walletLabel}>Available Balance</p>
        </div>

        </div>

        {/* Buttons */}

        <div className={styles.buttons_container}>

        <button className={styles.topUpButton} onClick={() => router.push("/")}>
          Top Up Now
        </button>
        <button className={styles.topUpButton2} onClick={() => router.push("/")}>
          View Top-Up History
        </button>

        </div>

        {/* Footer */}
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
    </div>
  );
}
