import React from "react";
import Image from "next/image";
import styles from "./about.module.css";


const About = () => {
return (
<div className={styles["about-section-container"]}>
    <div className={styles["about-background-image-container"]}>
    <img src='/images/about-background.png' alt="" />
    </div>
    <div className={styles["about-section-image-container"]}>
    <img src='/images/about-background-image.png' alt="" />
    </div>
    <div className={styles["about-section-text-container"]}>
    <p className={styles["primary-subheading"]}>About us</p>
    <h1 className={styles["primary-heading"]}>
        Maximize earnings and simplify operations.
    </h1>
    <p className={styles["primary-text"]}>
        Our cutting-edge technology provides real-time data, efficient management tools, and user-friendly interfaces that make parking management effortless.
    </p>
    <div className={styles["about-buttons-container"]}>
        <button className={styles["secondary-button"]}>Learn More</button>
    </div>
    </div>
</div>
);
};

export default About;
