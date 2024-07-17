import styles from "../layout.module.css"
import Sidebar from "../../ui/sidebar/sidebar"

const DashboardLayout = ({children}) => {
  return (
    
    <div className={styles.container}>
       <div>
          <Sidebar/>
       </div>
        <div className={styles.content}>
        {children}
        </div>
    </div>
  )
}

export default DashboardLayout