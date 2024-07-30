import React from "react";
import styles from "./payment.module.css";

const WardenPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>Warden Salary Mangement</p>
      </div>

      <div className={styles.tablecontent}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.empnamehead}>Warden ID</th>
              <th className={styles.empnamehead}>Warden Name</th>
              <th className={styles.empgenderhead}>No.of Working Days</th>
              <th className={styles.empagehead}>No.of Vehicles Scanned</th>
              <th className={styles.empcontacthead}>Commission Gained</th>
              <th className={styles.empslothead}>Total Wage</th>
              <th className={styles.empslothead}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.empnamedata}>WF8GVH</td>
              <td className={styles.empgenderdata}>Pasindi Vindula</td>
              <td className={styles.empagedata}>21</td>
              <td className={styles.empcontactdata}>89</td>
              <td className={styles.empcontactdata}>147.00</td>
              <td className={styles.empcontactdata}>5147.00</td>
              <td className={styles.statusActive}>Paid</td>
            </tr>
            <tr>
              <td className={styles.empnamedata}>WF8GVH</td>
              <td className={styles.empgenderdata}>Pasindi Vindula</td>
              <td className={styles.empagedata}>21</td>
              <td className={styles.empcontactdata}>89</td>
              <td className={styles.empcontactdata}>147.00</td>
              <td className={styles.empcontactdata}>5147.00</td>
              <td className={styles.statusActive}>Paid</td>
            </tr>
            <tr>
              <td className={styles.empnamedata}>WF8GVH</td>
              <td className={styles.empgenderdata}>Pasindi Vindula</td>
              <td className={styles.empagedata}>21</td>
              <td className={styles.empcontactdata}>89</td>
              <td className={styles.empcontactdata}>147.00</td>
              <td className={styles.empcontactdata}>5147.00</td>
              <td className={styles.statusInactive}>Unpaid</td>
            </tr>
            <tr>
              <td className={styles.empnamedata}>WF8GVH</td>
              <td className={styles.empgenderdata}>Pasindi Vindula</td>
              <td className={styles.empagedata}>21</td>
              <td className={styles.empcontactdata}>89</td>
              <td className={styles.empcontactdata}>147.00</td>
              <td className={styles.empcontactdata}>5147.00</td>
              <td className={styles.statusActive}>Paid</td>
            </tr>
            <tr>
              <td className={styles.empnamedata}>WF8GVH</td>
              <td className={styles.empgenderdata}>Pasindi Vindula</td>
              <td className={styles.empagedata}>21</td>
              <td className={styles.empcontactdata}>89</td>
              <td className={styles.empcontactdata}>147.00</td>
              <td className={styles.empcontactdata}>5147.00</td>
              <td className={styles.statusActive}>Paid</td>
            </tr>
            <tr>
              <td className={styles.empnamedata}>WF8GVH</td>
              <td className={styles.empgenderdata}>Pasindi Vindula</td>
              <td className={styles.empagedata}>21</td>
              <td className={styles.empcontactdata}>89</td>
              <td className={styles.empcontactdata}>147.00</td>
              <td className={styles.empcontactdata}>5147.00</td>
              <td className={styles.statusInactive}>Unpaid</td>
            </tr>
            <tr>
              <td className={styles.empnamedata}>WF8GVH</td>
              <td className={styles.empgenderdata}>Pasindi Vindula</td>
              <td className={styles.empagedata}>21</td>
              <td className={styles.empcontactdata}>89</td>
              <td className={styles.empcontactdata}>147.00</td>
              <td className={styles.empcontactdata}>5147.00</td>
              <td className={styles.statusActive}>Paid</td>
            </tr>
            {/* <tr>
              <td colSpan="5" className={styles.noData}>
                No wardens registered under this PMC
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WardenPage;
