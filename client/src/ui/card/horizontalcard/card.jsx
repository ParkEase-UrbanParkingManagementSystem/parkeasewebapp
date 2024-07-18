import React from "react";
import styles from "../horizontalcard/card.module.css";

const Card = ({ title, amount }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <p className={styles.amount}>{amount}</p>
        <p className={styles.title}>{title}</p>
      </div>
    </div>
  );
};

export default Card;
