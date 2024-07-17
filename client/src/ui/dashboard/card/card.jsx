import React from "react";
import styles from "../card/card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = ({ item, icon }) => {
  return (
    <div className={styles.card}>
      <div>
        <FontAwesomeIcon icon={icon} className={styles.icon} />

        <p className={styles.content}>{item.content}</p>
        <p className={styles.title}>{item.title}</p>
      </div>
    </div>
  );
};

export default Card;
