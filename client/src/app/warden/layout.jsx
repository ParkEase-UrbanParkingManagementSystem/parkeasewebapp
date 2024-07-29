import styles from "../layout.module.css";
import Sidebar from "../../ui/sidebar/sidebar";
import Navbar from "../../ui/pmcnavbar/navbar";

const WardenLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div>
        <Sidebar />
      </div>
      <div className={styles.body}>
        <div className={styles.navbar}>
          <Navbar />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default WardenLayout;
