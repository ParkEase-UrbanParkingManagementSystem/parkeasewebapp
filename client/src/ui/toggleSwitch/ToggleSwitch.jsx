// components/ToggleSwitch.js
import React, { useState } from 'react';
import styles from './ToggleSwitch.module.css';

const ToggleSwitch = ({ isActive, onToggle }) => {
  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={isActive} onChange={onToggle} />
      <span className={styles.slider}></span>
    </label>
  );
};

export default ToggleSwitch;
