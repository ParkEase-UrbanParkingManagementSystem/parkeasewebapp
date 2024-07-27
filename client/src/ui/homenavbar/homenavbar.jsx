// import Link from "next/link"
// import Links from "./links/links"
// import styles from "./homenavbar.module.css"

// const Navbar = () => {
//     return (
//         <div className={styles.container}>
//             <Link href="/" className={styles.logo}>ParkEase</Link>
//             <div>
//                 <Links />
//             </div>
//         </div>
//     )
// }

// export default Navbar
'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link"
import { useRouter } from "next/navigation";
import LetteredAvatar from 'react-lettered-avatar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Image from 'next/image';

const pages = ['Home', 'Contact Us', 'Last Visited'];
const settings = ['Profile', 'Logout'];

const Navbar = () => {
const [anchorElNav, setAnchorElNav] = useState(null);
const [anchorElUser, setAnchorElUser] = useState(null);
const [userDetails, setUserDetails] = useState(null);
const router = useRouter();

useEffect(() => {
    const fetchUserDetails = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:5000/driver/details", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token: token
                }
            });

            const parseRes = await response.json();

            if (response.ok) {
                setUserDetails(parseRes.data);
            } else {
                console.error("Can't get the details");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    fetchUserDetails();
}, [router]);


const arrayWithColors = [
    '#2ecc71',
    '#3498db',
    '#8e44ad',
    '#e67e22',
    '#e74c3c',
    '#1abc9c',
    '#2c3e50'
];

const handleLogout = () => {
    // Perform logout logic here (e.g., clearing tokens, calling API, etc.)
    console.log('User logged out');
    localStorage.removeItem("token");
    // Redirect to home page or login page
    router.push('/login');
};

React.useEffect(() => {
const fetchDriverDetails = async () => {
    const token = localStorage.getItem("token");

    try {
    const response = await fetch("http://localhost:5000/driver/details", {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        token: token,
        },
    });

    const parseRes = await response.json();

    if (response.ok) {
        setDriverDetails(parseRes.data);
    } else {
        console.error("Can't get the details");
        // router.push('/login'); // Redirect to login on error
    }
    } catch (err) {
    console.error(err.message);
    // router.push('/login'); // Redirect to login on error
    }
};

fetchDriverDetails();
}, [router]);

const handleOpenNavMenu = (event) => {
setAnchorElNav(event.currentTarget);
};
const handleOpenUserMenu = (event) => {
setAnchorElUser(event.currentTarget);
};

const handleCloseNavMenu = () => {
setAnchorElNav(null);
};

const handleCloseUserMenu = () => {
setAnchorElUser(null);
};

return (
<AppBar position="static" sx={{ backgroundColor: 'black' }}> 
    <Container maxWidth="xl">
    <Toolbar disableGutters>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <Image src="/images/Group 177.png" alt="Logo" width={170} height={170} />
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
        >
            <MenuIcon />
        </IconButton>
        <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
            display: { xs: 'block', md: 'none' },
            }}
        >
            {pages.map((page) => (
            <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography textAlign="center" sx={{ fontFamily: 'Montserrat, sans-serif' }}>{page}</Typography>
            </MenuItem>
            ))}
        </Menu>
        </Box>
        {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
        <Typography
        variant="h5"
        noWrap
        component="a"
        href="#app-bar-with-responsive-menu"
        sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            color: 'inherit',
            textDecoration: 'none',
            textTransform: 'none',
        }}
        >
        ParkEase
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 'auto', justifyContent: 'flex-end' }}>
        {pages.map((page) => (
            <Button
            key={page}
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: 'white', display: 'block', fontWeight:'bold', textTransform: 'none' }}
            >
            {page}
            </Button>
        ))}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="View More">
            <IconButton onClick={handleOpenUserMenu} sx={{ paddingLeft: 4 }}>
            <LetteredAvatar
                name={userDetails?.fname}
                // name="Chandana"
                size={40}
                radius={50}
                color="#fff"
                backgroundColors={arrayWithColors}
            />
            </IconButton>
        </Tooltip>
        <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
        >
            {settings.map((setting) => (
            <MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}>

                {setting === 'Profile' ? (
                <Link href="/driver/profile" passHref>
                    <Typography textAlign="center" sx={{ fontFamily: 'Montserrat, sans-serif', textTransform: 'none' }}>
                    {setting}
                    </Typography>
                </Link>
                ) : (
                <Typography textAlign="center" sx={{ fontFamily: 'Montserrat, sans-serif', textTransform: 'none' }}>
                    {setting}
                </Typography>
                )}
            </MenuItem>
            ))}
        </Menu>
        </Box>
    </Toolbar>
    </Container>
</AppBar>
);
};
export default Navbar;
