
import Navbar from "@/ui/pmcNavbar/PmcNavbar"
import styles from "@/ui/dashboard/dashboard.module.css"
import {useAuth} from '../../utils/authContext'
import Sidebar from "@/ui/dashboard/sidebar/sidebar"

const DashboardLayout = ({children}) => {
  
  

  return (
    
    <div className={styles.container}>
       <div className={styles.menu}>
          <Sidebar/>
       </div>
        <div className={styles.content}>
          <Navbar/>
        {children}
        </div>
    </div>
  )
}

export default DashboardLayout