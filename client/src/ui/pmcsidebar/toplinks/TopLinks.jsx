"use client";

import Link from "next/link";
import React from "react";
import styles from "./links.module.css";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faParking, faUser } from "@fortawesome/free-solid-svg-icons";

const Links = () => {
  const pathname = usePathname();

  const links = [
    { title: "Dashboard", path: "/dashboard", icon: faChartBar },
    { title: "Parking Lots", path: "/parkingslot", icon: faParking },
    { title: "Wardens", path: "/warden", icon: faUser },
  ];

  return (
    <div>
      {links.map((link) => (
        <div key={link.title} className={`${styles.link} ${pathname === link.path ? styles.active : ""}`}>
          <FontAwesomeIcon icon={link.icon} className={styles.icon} />
          <Link href={link.path}>
            {link.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Links;
