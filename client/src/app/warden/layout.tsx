import styles from "../layout.module.css"
import Sidebar from "@/ui/sidebar/sidebar"

const WardenLayout = ({children}) => {
  return (
    
    <div className={styles.container}>
       <div className={styles.menu}>
          <Sidebar/>
       </div>
        <div className={styles.content}>
        {children}
        </div>
    </div>
  )
}

export default WardenLayout