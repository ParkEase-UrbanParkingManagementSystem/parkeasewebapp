"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./pmcnavbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const Navbar = () => {
  const [pmcDetails, setPmcDetails] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const router = useRouter();

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  useEffect(() => {
    const fetchPmcDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_KEY}/pmc/details`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );

        const parseRes = await response.json();

        if (response.ok) {
          setPmcDetails(parseRes.data);
        } else {
          console.error("Can't get the details");
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchPmcDetails();
  }, [router]);

  const fetchNotifications = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/pmc/notifications`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      const parseRes = await response.json();

      if (response.ok) {
        setNotifications(parseRes.notifications || []);
      } else {
        console.error("Can't get the notifications");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const markAsRead = async (notificationId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/pmc/notifications/${notificationId}/mark-as-read`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((notification) =>
            notification.id === notificationId
              ? { ...notification, is_read: true }
              : notification
          )
        );
      } else {
        console.error("Failed to mark notification as read");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
    if (!showNotifications) fetchNotifications();
  };

  const handleClickOutside = (event) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setShowNotifications(false);
    }
  };

  useEffect(() => {
    if (showNotifications) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [showNotifications]);

  return (
    <>
      {showNotifications && <div className={styles.notificationOverlay}></div>}
      <div className={styles.container}>
        <div></div>
        <div className={styles.searchcontainer}>
          <input type="text" placeholder="Search" />
          <FontAwesomeIcon icon={faSearch} className={styles.searchicon} />
        </div>
        <div
          className={styles.notification}
          ref={notificationRef}
          onClick={toggleNotifications}
        >
          <FontAwesomeIcon icon={faBell} className={styles.notificationicon} />
          {unreadCount > 0 && (
            <div className={styles.notificationBadge}>{unreadCount}</div>
          )}
          {showNotifications && (
            <div className={styles.notificationDropdown}>
              <h3 className={styles.notificationTitle}>Notifications</h3>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`${styles.notificationItem} ${
                      notification.is_read ? styles.read : styles.unread
                    }`}
                  >
                    <h4 className="text-lg font-semibold pb-2">{notification.title}</h4>
                    <p className="text-sm pb-2">{notification.message}</p>
                    {!notification.is_read && (
                      <button
                        className={styles.markAsReadButton}
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className={styles.noNotifications}>No notifications</p>
              )}
            </div>
          )}
        </div>
        <div className={styles.user}>
          <div className={styles.imagecontainer}>
            <Image
              className={styles.userimage}
              src="/images/user.jpg"
              width="30"
              height="30"
              alt="User"
            />
          </div>
          <div className={styles.username}>
            {pmcDetails && pmcDetails.pmc
              ? pmcDetails.pmc.name.slice(0, 2).toUpperCase()
              : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
