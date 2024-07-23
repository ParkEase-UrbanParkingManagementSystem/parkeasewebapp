"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation'; // Updated import for Next.js 14
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import { useAuth } from "../../../utils/authContext";

const links = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Contact Us",
    path: "/contact",
  },
  {
    title: "Last Visited",
    path: "/last-visited",
  },
];

const Links = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, setAuth } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    router.push("/login");
  };

  // TEMPORARY
  const session = true;

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {session?.user ? (
          <>
            {session.user?.isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
            {/* <form action={handleLogout}>
              <button className={styles.logout}>Logout</button>
            </form> */}
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>
      <button className={styles.menuButton} onClick={() => setOpen((prev) => !prev)}>Menu</button>
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;
