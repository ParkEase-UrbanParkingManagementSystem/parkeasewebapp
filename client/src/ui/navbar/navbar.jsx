/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'
import React, { useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import { AccountCircle } from "@mui/icons-material";
import styles from "./navbar.module.css";
import Link from 'next/link';

const Navbar = () => {
const [openMenu, setOpenMenu] = useState(false);
const menuOptions = [
{
    text: "Home",
    icon: <HomeIcon />,
},
{
    text: "Contact",
    icon: <PhoneRoundedIcon />,
},
{
    text: "Login",
    icon: <AccountCircle />,
},
];
return (
<div className={styles["navbar"]}>
    <div className={styles["nav-logo-container"]}>
    <img src='/images/Group 1782.png' alt="" />
    </div>
    <div className={styles["navbar-links-container"]}>
    <a href="/">Home</a>
    <a href="/contact">Contact</a>
    <a href="/login">Login</a>

    {/* <button className={styles["primary-button"]}>Get Started</button> */}
    <Link href="/register" legacyBehavior>
    <a className={styles["primary-button"]}>Get Started</a>
    </Link>
    </div>
    <div className={styles["navbar-menu-container"]}>
    <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
    </div>
    <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
    <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={() => setOpenMenu(false)}
        onKeyDown={() => setOpenMenu(false)}
    >
        <List>
        {menuOptions.map((item) => (
            <ListItem key={item.text} disablePadding>
            <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
            </ListItemButton>
            </ListItem>
        ))}
        </List>
        <Divider />
    </Box>
    </Drawer>
</div>
);
};

export default Navbar;
