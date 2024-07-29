import AdminNavbar from "@/ui/admin/adminnavbar/adminnavbar"
import AdminSidebar from "@/ui/admin/adminsidebar/adminsidebar"
import styles from "./admin.module.css"

const Layout = ({ children }) => {
    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <AdminSidebar />
            </div>
            <div className={styles.content}>
                <AdminNavbar />
                {children}
            </div>
        </div>
    )
}

export default Layout;