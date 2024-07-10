import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Button.module.css';

const Button = ({ label, icon, onClick }) => (
  <div className={styles.buttonContainer}>
    <button className={styles.button} onClick={onClick}>
      {label}
      {icon && <FontAwesomeIcon icon={icon} className={styles.icon} />}
    </button>
  </div>
);

export default Button;