import styles from "../layout.module.css";
import Sidebar from "../../ui/sidebar/sidebar";
import Navbar from "../../ui/pmcnavbar/navbar";

const ParkingLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div>
        <Sidebar />
      </div>
      <div className={styles.body}>
        <div>
          <Navbar />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default ParkingLayout;