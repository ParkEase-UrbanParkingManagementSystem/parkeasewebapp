import styles from "../layout.module.css";
import { useAuth } from "../../utils/authContext";
import Sidebar from "@/ui/sidebar/sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default DashboardLayout;
