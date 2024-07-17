import React from "react";
import styles from "../sidebar/sidebar.module.css";
import TopLinks from "../../ui/pmcsidebar/toplinks/TopLinks";
import BottomLinks from "../../ui/pmcsidebar/bottomlinks/BottomLinks";
import Image from "next/image";

const sidebar = () => {
  return (
    <div className={styles.sidebarcontainer}>
      <div className={styles.logo}>
        <Image src="/images/Group 178.png" width="160" height="160" />
      </div>

      <div className={styles.links}>
        <TopLinks />
      </div>
      <div className={styles.links}>
        <BottomLinks />
      </div>
    </div>
  );
};

export default sidebar;
