import React from "react";
import styles from "../card/card.module.css";

const Card = ({ items }) => {
  return (
    <div className={styles.card}>
      {items.map((item, index) => (
        <div key={index}>
          <p className={styles.title}>{item.title}</p>
          <p>{item.content}</p><br/>
        </div>
      ))}
    </div>
  );
};

export default Card;
