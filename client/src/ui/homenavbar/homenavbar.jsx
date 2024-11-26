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
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';

const pages = ['Home', 'Contact Us', 'Your Activity'];
const settings = ['Profile', 'Logout'];

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElNotifications, setAnchorElNotifications] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const router = useRouter();

    useEffect(() => {
        fetchUserDetails();
        fetchNotifications();
    }, []);

    useEffect(() => {
        const count = notifications.filter(notification => !notification.is_read).length;
        setUnreadCount(count);
    }, [notifications]);

    const fetchNotifications = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/notifications/get-notifications`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token: token
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const notifications = await response.json();

            if (Array.isArray(notifications)) {
                setNotifications(notifications);
            } else {
                console.error("Invalid data format: expected an array");
                setNotifications([]);
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
            setNotifications([]);
        }
    };

    const fetchUserDetails = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/driver/details`, {
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
                setUserDetails(null);
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
            setUserDetails(null);
        }
    };

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
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block', fontFamily: 'Montserrat, sans-serif' }}
                            >
                                <Link href={page === 'Home' ? '/driver' : page === 'Your Activity' ? '/driver/activity' : '/contact'} passHref>
                                    {page}
                                </Link>
                            </Button>
                        ))}
                    </Box>

                    {/* Notification Icon */}
                    <Box sx={{ flexGrow: 0, mr: 2 }}>
                        <Tooltip title="Notifications">
                            <IconButton onClick={handleOpenNotificationMenu} color="inherit">
                                <Badge 
                                    badgeContent={unreadCount} 
                                    color="error"
                                    sx={{
                                        '& .MuiBadge-badge': {
                                            backgroundColor: '#ff4444',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            minWidth: '20px',
                                            height: '20px',
                                            borderRadius: '10px',
                                        }
                                    }}
                                >
                                    <NotificationsIcon />
                                </Badge>
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
                            PaperProps={{
                                style: {
                                    maxHeight: '80vh',
                                    width: '450px', 
                                    overflowX: 'hidden',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    borderRadius: '8px',
                                },
                            }}
                        >
                            <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0', position: 'sticky', top: 0, bgcolor: 'background.paper', zIndex: 1 }}>
                                <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>Notifications</Typography>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    sx={{ mb: 1, textTransform: 'none', fontSize: '0.85rem',  color: '#FFB403', borderColor: '#FFB403', '&:hover': {
                                                    backgroundColor: '#fbffe0',
                                                    borderColor: '#FFB403',
                                                    
                                                } }}
                                >
                                    Mark All as Read
                                </Button>
                            </Box>
                            <Box sx={{ maxHeight: 'calc(80vh - 100px)', overflowY: 'auto' }}>
                                {notifications && notifications.length > 0 ? (
                                    notifications.map((notification) => (
                                        <MenuItem
                                            key={notification.id}
                                            onClick={handleCloseNotificationMenu}
                                            sx={{
                                                borderBottom: '1px solid #f0f0f0',
                                                flexDirection: 'column',
                                                alignItems: 'flex-start',
                                               
                                                py: 2,
                                                px: 2,
                                                '&:hover': {
                                                    backgroundColor: '#f5f5f5',
                                                },
                                                width: '100%',
                                            }}
                                        >
                                            <Typography variant="subtitle2" sx={{ 
                                                fontWeight: 600, 
                                                mb: 0.5, 
                                                color: '#',
                                                fontSize: '1rem'
                                            }}>
                                                {notification.title}
                                            </Typography>
                                            <Typography 
                                                variant="body2" 
                                                sx={{ 
                                                    mb: 1, 
                                                    color: '#333',
                                                    lineHeight: 1.4,
                                                    fontSize: '0.85rem', 
                                                    fontWeight: 200, 
                                                    wordWrap: 'break-word', 
                                                    whiteSpace: 'normal' 
                                                }}
                                            >
                                                {notification.message}
                                            </Typography>
                                            <Box sx={{ 
                                                display: 'flex', 
                                                justifyContent: 'space-between', 
                                                width: '100%', 
                                                alignItems: 'center'
                                            }}>
                                                <Typography variant="caption" sx={{ 
                                                    color: 'text.secondary',
                                                    fontSize: '0.75rem' 
                                                }}>
                                                    {new Date(notification.created_at).toLocaleString()}
                                                </Typography>
                                                <Button
                                                    variant="text"
                                                    size="small"
                                                    sx={{ 
                                                        fontSize: '0.7rem', 
                                                        color: '#FFB403', 
                                                        textTransform: 'none',
                                                        padding: '2px 8px' 
                                                    }}
                                                >
                                                    Mark as Read
                                                </Button>
                                            </Box>
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem onClick={handleCloseNotificationMenu}>
                                        <Typography sx={{ color: 'text.secondary', py: 2 }}>No new notifications</Typography>
                                    </MenuItem>
                                )}
                            </Box>
                        </Menu>
                    </Box>

                    {/* User Avatar and Settings */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="View More">
                            <IconButton onClick={handleOpenUserMenu} sx={{ paddingLeft: 4 }}>
                                <LetteredAvatar
                                    name={userDetails && userDetails.fname ? userDetails.fname : ''}
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

