import React from "react";
import styles from "./selectuser.module.css";
import Image from "next/image";
import Link from "next/link";

function Users() {
  return (
    <div className={styles.container}>
      <Image
        src="/images/Group 1782.png"
        alt="Description of the image"
        width={160}
        height={160}
        className="m-3"
      ></Image>
      <div className={styles.users}>
        <div className={styles.driver}>
          <Link href="/register">
            <img src="images/driver user.png" className={styles.userpic} />
            <h1 className={styles.title}>Driver</h1>
          </Link>
        </div>

        <div className={styles.pmc}>
          <Link href="/register-pmc">
            <img src="images/office-building.png" className={styles.userpic} />
            <h1 className={styles.title}>Parking Management Company</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Users;
