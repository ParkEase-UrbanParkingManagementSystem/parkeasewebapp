"use client";

import Link from "next/link";
import React from "react";
import styles from "./links.module.css";
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
      path: "",
      icon: faParking,
      subLinks: [
        { title: "Manage Parking Lot", path: "/parkingslot" },
        { title: "Add Parking Lot", path: "/parkinglot-add" },
      ],
    },
    {
      title: "Wardens",
      path: "",
      icon: faUser,
      subLinks: [
        { title: "Manage Wardens", path: "/warden" },
        { title: "Add Warden", path: "/register-warden" },
      ],
    },
    {
      title: "Payments",
      path: "",
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
            link.subLinks.some((sub) => pathname === sub.path)
              ? ""
              : pathname === link.path
              ? styles.active
              : ""
          } ${link.subLinks.length === 0 ? styles.noSubLinks : ""}`}
        >
          <FontAwesomeIcon icon={link.icon} className={styles.icon} />
          {link.subLinks.length > 0 ? (
            <span className="font-semibold">{link.title}</span>
          ) : (
            <Link href={link.path} className="font-semibold">
              {link.title}
            </Link>
          )}
          {link.subLinks.length > 0 && (
            <div className={styles.subLinks}>
              {link.subLinks.map((subLink) => (
                <Link
                  key={subLink.title}
                  href={subLink.path}
                  className={
                    pathname === subLink.path ? styles.subLinkActive : ""
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
