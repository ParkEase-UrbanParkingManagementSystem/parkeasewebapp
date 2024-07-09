import Link from "next/link"
import Links from "./links/Links"
import styles from "./homenavbar.module.css"

const Navbar = () => {
    return (
        <div className={styles.container}>
            <Link href="/" className={styles.logo}>ParkEase</Link>
            <div>
                <Links />
            </div>
        </div>
    )
}

export default Navbar