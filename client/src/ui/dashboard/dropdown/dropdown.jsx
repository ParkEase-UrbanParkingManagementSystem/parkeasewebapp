import React from "react";
import styles from "./dropdown.module.css";

const Dropdown = ({ options, selectedOption, onChange }) => {
  return (
    <select
      value={selectedOption}
      onChange={(e) => onChange(e.target.value)}
      className={styles.dropdown}
    >
      {options.map((option) => (
        <option key={option} value={option} className={styles.dropdownoption}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
