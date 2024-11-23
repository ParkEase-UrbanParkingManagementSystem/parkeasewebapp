'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
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
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';

// Icons
import NotificationsIcon from '@mui/icons-material/Notifications'; // Notification icon

const pages = ['Home', 'Contact Us', 'Your Activity'];
const settings = ['Profile', 'Logout'];

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElNotifications, setAnchorElNotifications] = useState(null); // State for notifications
    const [userDetails, setUserDetails] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No token found");
                return;
            }

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
                console.error(error.message);
            }
        };

        fetchUserDetails();
    }, [router]);

    const arrayWithColors = [
        '#2ecc71', '#3498db', '#8e44ad', '#e67e22', '#e74c3c', '#1abc9c', '#2c3e50'
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push('/login');
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleOpenNotificationMenu = (event) => {
        setAnchorElNotifications(event.currentTarget);
    };

    const handleCloseNotificationMenu = () => {
        setAnchorElNotifications(null);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const renderMenuItem = (page) => {
        let href = "";
        switch (page) {
            case 'Your Activity':
                href = "/driver/activity";
                break;
            case 'Home':
                href = "/driver";
                break;
            case 'Contact Us':
                href = "/contact";
                break;
            default:
                href = "#";
                break;
        }
        return (
            <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Link href={href} passHref>
                    <Typography textAlign="center" sx={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {page}
                    </Typography>
                </Link>
            </MenuItem>
        );
    };

    return (
        <AppBar position="sticky" sx={{ backgroundColor: 'black' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Logo for Desktop View */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                        <Link href="/driver" passHref legacyBehavior>
                            <a>
                                <Image src="/images/Group 177.png" alt="Logo" width={170} height={170} />
                            </a>
                        </Link>
                    </Box>

                    {/* Menu for Mobile View */}
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
                            {pages.map(renderMenuItem)}
                        </Menu>
                    </Box>

                    {/* Logo for Mobile View */}
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

                    {/* Menu for Desktop View */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 'auto', justifyContent: 'flex-end' }}>
                        {pages.map(renderMenuItem)}
                    </Box>

                    {/* Notification Icon */}
                    <Box sx={{ flexGrow: 0, mr: 2 }}>
                        <Tooltip title="Notifications">
                            <IconButton onClick={handleOpenNotificationMenu} color="inherit">
                                <NotificationsIcon />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-notifications"
                            anchorEl={anchorElNotifications}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElNotifications)}
                            onClose={handleCloseNotificationMenu}
                        >
                            <MenuItem onClick={handleCloseNotificationMenu}>
                                <Typography>No new notifications</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>

                    {/* User Avatar and Settings */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="View More">
                            <IconButton onClick={handleOpenUserMenu} sx={{ paddingLeft: 4 }}>
                                <LetteredAvatar
                                    name={userDetails?.fname}
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
