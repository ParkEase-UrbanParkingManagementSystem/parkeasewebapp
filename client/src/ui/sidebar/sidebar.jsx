import React from "react";
import styles from "../sidebar/sidebar.module.css";
import Links from "@/ui/pmcsidebar/links/links";
import Image from "next/image";

const sidebar = () => {
  return (
    <div className={styles.sidebarcontainer}>
      <div className={styles.logo}>
        <Image src="/images/ParkEase_logo.png" width="50" height="50" />
      </div>
      {/* <div className={styles.user}>
        <Image
          className={styles.userimage}
          src="/images/user.jpg"
          width="50"
          height="50"
        />
        <div className={styles.userDetail}>
          <span className={styles.userTitle}>ABC Parking Management Company</span>
        </div>
      </div> */}

      <div className={styles.links}>
        <Links />
      </div>
    </div>
  );
};

export default sidebar;
