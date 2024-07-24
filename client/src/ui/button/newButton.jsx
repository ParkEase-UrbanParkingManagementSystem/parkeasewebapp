'use client';

import React from 'react';
import styles from './Button.module.css';

const NewButton = ({ label, onClick }) => {
    return (
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={onClick}>
          {label}
        </button>
      </div>
    );
  };
  
  export default NewButton;
