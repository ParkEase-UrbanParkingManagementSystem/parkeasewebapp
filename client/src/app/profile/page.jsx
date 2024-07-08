import React from 'react';
import styles from "./profile.module.css"
import Image from 'next/image';

const Profile = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imagecontainer}>
      <Image className={styles.userimage} src="/images/user.jpg" width="130" height="130" />
      </div>
      <div className={styles.profilecontainer}>
        <p>Name: Pasindi Vindula</p>
        <p>Email Address: pasindiv@gmail.com</p>
        <p>Business Registration No. : BUS128467#1</p>
        <p>Address Details: </p>
        <p>Address No. : 102-32/C</p>
        <p>Street Name 01. : Nandun Uyana</p>
        <p>Street Name 02. : Muthuhena Waththa</p>
        <p>City: Meegoda</p>
        <p>District: Colombo</p>
      </div>
    </div>
  );
};

export default Profile;