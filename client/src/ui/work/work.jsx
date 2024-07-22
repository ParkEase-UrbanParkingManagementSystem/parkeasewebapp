import React from "react";
import styles from "./work.module.css";

const Work = () => {
const workInfoData = [
{
    image: "images/pickparking.png",
    title: "Choose parking",
    text: "Real-time data and insights on parking availability all around you.",
},
{
    image: "images/pickpayment.png",
    title: "Easy payments",
    text: "Secure and transparent payment options for a fraud-free parking experience.",
},
{
    image: "images/happycustomer.png",
    title: "Stellar experience",
    text: "Seamless integration of QR codes for easy access and payment.",
},
];

return (
<div className={styles["work-section-wrapper"]}>
    <div className={styles["work-section-top"]}>
    <p className={styles["primary-subheading"]}>Learn More</p>
    <h1 className={styles["primary-heading"]}>How it works</h1>
    <p className={styles["primary-text"]}>
        With ParkEase, the entire process from locating a parking spot to finalizing payments is streamlined, making parking stress-free for both drivers and parking wardens involved.
    </p>
    </div>
    <div className={styles["work-section-bottom"]}>
    {workInfoData.map((data) => (
        <div className={styles["work-section-info"]} key={data.title}>
        <div className={styles["info-boxes-img-container"]}>
            <img src={data.image} alt={data.title} />
        </div>
        <h2 className={styles["primary-subheading"]}>{data.title}</h2>
        <p>{data.text}</p>
        </div>
    ))}
    </div>
</div>
);
};

export default Work;
