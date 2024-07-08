"Use Client";

import React from "react";
import styles from "./warden.module.css";

const WardenPage = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <p>Registered Parking Warden List</p>
        </div>

        <div className={styles.tablecontent}>
          <table className={styles.table}>
            
            <tr>
              <th className={styles.empidhead}>Employee ID</th>
              <th className={styles.empnamehead}>Name</th>
              <th className={styles.empgenderhead}>Gender</th>
              <th className={styles.empagehead}>Age</th>
              <th className={styles.empslothead}>Assigned Parking Slot</th>
            </tr>
            <tr>
              <td className={styles.empiddata}>#1100</td>
              <td className={styles.empnamedata}>Nimal Athapaththu</td>
              <td className={styles.empgenderdata}>Male</td>
              <td className={styles.empagedata}>54</td>
              <td className={styles.empslotdata}>Kollupitiya</td>
            </tr>
            <tr>
              <td className={styles.empiddata}>#1100</td>
              <td className={styles.empnamedata}>Nimal Athapaththu</td>
              <td className={styles.empgenderdata}>Male</td>
              <td className={styles.empagedata}>54</td>
              <td className={styles.empslotdata}>Kollupitiya</td>
            </tr>
            <tr>
              <td className={styles.empiddata}>#1100</td>
              <td className={styles.empnamedata}>Nimal Athapaththu</td>
              <td className={styles.empgenderdata}>Male</td>
              <td className={styles.empagedata}>54</td>
              <td className={styles.empslotdata}>Kollupitiya</td>
            </tr>
            <tr>
              <td className={styles.empiddata}>#1100</td>
              <td className={styles.empnamedata}>Nimal Athapaththu</td>
              <td className={styles.empgenderdata}>Male</td>
              <td className={styles.empagedata}>54</td>
              <td className={styles.empslotdata}>Kollupitiya</td>
            </tr>
            <tr>
              <td className={styles.empiddata}>#1100</td>
              <td className={styles.empnamedata}>Nimal Athapaththu</td>
              <td className={styles.empgenderdata}>Male</td>
              <td className={styles.empagedata}>54</td>
              <td className={styles.empslotdata}>Kollupitiya</td>
            </tr>
            <tr>
              <td className={styles.empiddata}>#1100</td>
              <td className={styles.empnamedata}>Nimal Athapaththu</td>
              <td className={styles.empgenderdata}>Male</td>
              <td className={styles.empagedata}>54</td>
              <td className={styles.empslotdatafree}>
                Not yet assigned
              </td>
            </tr>
            <tr>
              <td className={styles.empiddata}>#1100</td>
              <td className={styles.empnamedata}>Nimal Athapaththu</td>
              <td className={styles.empgenderdata}>Male</td>
              <td className={styles.empagedata}>54</td>
              <td className={styles.empslotdata}>Kollupitiya</td>
            </tr>
            <tr>
              <td className={styles.empiddata}>#1100</td>
              <td className={styles.empnamedata}>Nimal Athapaththu</td>
              <td className={styles.empgenderdata}>Male</td>
              <td className={styles.empagedata}>54</td>
              <td className={styles.empslotdata}>Kollupitiya</td>
            </tr>
          </table>
        </div>
        <div className={styles.number}>
          <div></div>
          <div className={styles.icon}>
          </div>
          <div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WardenPage;
