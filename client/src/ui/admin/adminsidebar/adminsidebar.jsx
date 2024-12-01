import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./adminsidebar.module.css";
import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdShoppingBag,
    MdAttachMoney,
    MdWork,
    MdAnalytics,
    MdPeople,
    MdOutlineSettings,
    MdHelpCenter,
    MdLogout,
} from "react-icons/md";
// import { auth, signOut } from "@/app/auth";

const menuItems = [
    {
        list: [
            {
                title: "Dashboard",
                path: "/admin",
                icon: <MdDashboard />,
            },
            {
                title: "Drivers",
                path: "/admin/allDrivers",
                icon: <MdSupervisedUserCircle />,
            },
            {
                title: "PMCs",
                path: "/admin/allPmcs",
                icon: <MdPeople />,
            },
            {
                title: "Parking Spaces",
                path: "/admin/parkingLocations/tileview",
                icon: <MdSupervisedUserCircle />,
            },
            {
                title: "Transactions",
                path: "/admin/allTransactions",
                icon: <MdAttachMoney />,
            },
            {
                title: "Revenue",
                path: "/dashboard/transactions",
                icon: <MdWork />,
            }
        ],
    },
];

const AdminSidebar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image src="/images/admin.jpeg" alt="" width="50" height="50" />
                <div className={styles.userDetail}>
                    <span className={styles.username}>Kishan Perera</span>
                    <span className={styles.userTitle}>Admin</span>

                </div>
            </div>
            <ul className={styles.list}>
                {menuItems.map((cat) => (
                    <li key={cat.title}>
                        <span className={styles.cat}>{cat.title}</span>
                        {cat.list.map((item) => (
                            <MenuLink item={item} key={item.title} />
                        ))}
                    </li>
                ))}
            </ul>
            <button className={styles.logout}> <MdLogout /> Logout </button>
        </div>
    );
};


export default AdminSidebar;