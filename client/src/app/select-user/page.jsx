import React from "react";
import styles from "./selectuser.module.css";

function Users() {
  return (
    <div className={styles.container}>
      <div className={styles.driver}>
        <img src="images/driver user.png" className={styles.userpic} />
        <h1 className={styles.title}>Driver</h1>
      </div>
      <div className={styles.pmc}>
        <img src="images/office-building.png" className={styles.userpic} />
        <h1 className={styles.title}>Parking Management Company</h1>
      </div>
    </div>
  );
}

export default Users;
