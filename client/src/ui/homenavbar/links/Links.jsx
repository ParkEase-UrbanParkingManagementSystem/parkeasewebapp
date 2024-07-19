"use client";

import { useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
// import Image from "next/image";

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
title: "Get Started",
path: "/register",
},
];

const Links = () => {
const [open, setOpen] = useState(false);

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