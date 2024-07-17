import React from "react";
import styles from "../horizontalcard/card.module.css";

const Card = ({ title, content }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <p className={styles.title}>{title} - {content}</p>
      </div>
    </div>
  );
};

export default Card;
