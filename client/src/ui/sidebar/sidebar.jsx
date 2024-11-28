import React from "react";
import styles from "../sidebar/sidebar.module.css";
import TopLinks from "../../ui/pmcsidebar/toplinks/TopLinks";
import BottomLinks from "../../ui/pmcsidebar/bottomlinks/BottomLinks";
import Image from "next/image";
import Link from "next/link";

const sidebar = () => {
  return (
    <div className={styles.sidebarcontainer}>
      <div className={styles.logo}>
        <Link href="/dashboard">
            <Image
              src="/images/Group 178.png"
              alt="Home"
              width={160}
              height={160}
            />
        </Link>
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
