import React from "react";
import styles from "../card/card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = ({ items, icon }) => {
  return (
    <div className={styles.card}>
      {icon && <FontAwesomeIcon icon={icon} className={styles.icon} />}
      {items.map((item, index) => (
        <div key={index}>
          <p className={styles.content}>{item.content}</p>
          <p className={styles.title}>{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Card;
