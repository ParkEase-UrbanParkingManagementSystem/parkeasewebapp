import React from 'react'
import styles from "@/ui/dashboard/sidebar/sidebar.module.css"
import Links from "@/ui/pmcNavbar/links/Links"
import Image from 'next/image';

const sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
          <Image className={styles.userimage} src="/images/user.jpg" width="50" height="50" />
          <div className={styles.userDetail}>
            <span className={styles.username}>Mr.Nipul Yansith</span>
            <span className={styles.userTitle}>Manager | ABC Company</span>
          </div>
      </div>

      <div className='links'><Links /></div>

    </div>

    
    
  )
}

export default sidebar