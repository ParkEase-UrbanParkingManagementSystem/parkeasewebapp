"use client";

import Link from "next/link";
import React from "react";
import styles from "../toplinks/links.module.css";
import { usePathname } from "next/navigation";
import { useAuth } from "../../../utils/authContext";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"; // Import necessary icons

const Links = () => {
  const pathname = usePathname();
  const { setAuth } = useAuth();
  const router = useRouter();

  const links = [
    { title: "View Profile", path: "/profile", icon: faUser },
    { title: "Log Out", path: "/logout", icon: faSignOutAlt },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    router.push("/login");
  };

  return (
    <div>
      {links.map((link) => (
        <div key={link.title} className={`${styles.link} ${pathname === link.path ? styles.active : ""}`}>
          <FontAwesomeIcon icon={link.icon} className={`${styles.icon} icon`} />
          {link.path === "/logout" ? (
            <a
              href={link.path}
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
              className="font-semibold"
            >
              {link.title}
            </a>
          ) : (
            <Link href={link.path} className="font-semibold">
              {link.title}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Links;
