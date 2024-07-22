import React from "react";
import Navbar from "@/ui/navbar/navbar";
import { FiArrowRight } from "react-icons/fi";
import styles from "./hero.module.css";
import Image from "next/image";

const Hero = () => {
return (
<div className={styles["home-container"]}>
    <Navbar />
    <div className={styles["home-banner-container"]}>
    <div className={styles["home-bannerImage-container"]}>
        <img src='/images/home-banner-background.png' alt="" />
    </div>
    <div className={styles["home-text-section"]}>
        <h1 className={styles["primary-heading"]}>
        Find, pay, and park with ease
        </h1>
        <p className={styles["primary-text"]}>
        Discover the future of parking with ParkEase, where convenience meets technology.
        Say goodbye to the hassle of searching for parking spots and dealing with outdated payment methods.
        </p>
        
        <button className={styles["secondary-button"]}>
        Get Started <FiArrowRight />{" "}
        </button>
    </div>
    <div className={styles["home-image-section"]}>
        <img src='/images/home-banner-image.png' alt="" />
    </div>
    </div>
</div>
);
};

export default Hero;
