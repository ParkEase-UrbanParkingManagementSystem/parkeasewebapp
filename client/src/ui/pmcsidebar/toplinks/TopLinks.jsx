"use client";

import Link from "next/link";
import React from "react";
import styles from "./links.module.css"; // Adjust path as needed
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faMoneyCheckDollar,
  faParking,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Links = () => {
  const pathname = usePathname();

  const links = [
    { title: "Dashboard", path: "/dashboard", icon: faChartBar, subLinks: [] },
    {
      title: "Parking Lots",
      path: "/parkingslot",
      icon: faParking,
      subLinks: [
        { title: "Add Parking Lot", path: "/parkinglot-add" },
        { title: "Manage Parking Lot", path: "/parkingslot/manage" },
      ],
    },
    {
      title: "Wardens",
      path: "/warden",
      icon: faUser,
      subLinks: [{ title: "Add Warden", path: "/register-warden" }],
    },
    {
      title: "Payments",
      path: "/handle-payment",
      icon: faMoneyCheckDollar,
      subLinks: [
        { title: "Park Points", path: "/parkpoints" },
        { title: "Warden Salary", path: "/warden-salary" },
      ],
    },
  ];

  return (
    <div>
      {links.map((link) => (
        <div
          key={link.title}
          className={`${styles.link} ${
            pathname === link.path || link.subLinks.some(sub => pathname === sub.path)
              ? styles.active
              : ""
          }`}
        >
          <FontAwesomeIcon icon={link.icon} className={styles.icon} />
          <Link href={link.path}>
            {link.title}
          </Link>
          {link.subLinks.length > 0 && (
            <div className={styles.subLinks}>
              {link.subLinks.map((subLink) => (
                <Link
                  key={subLink.title}
                  href={subLink.path}
                  className={
                    pathname === subLink.path
                      ? styles.subLinkActive
                      : ""
                  }
                >
                  {subLink.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Links;
