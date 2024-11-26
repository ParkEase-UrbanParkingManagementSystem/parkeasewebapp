import React from 'react';
import styles from './Loading.module.css'; // Optional CSS module for styling
import Image from 'next/image';

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      {/* <p className='text-2xl font-bold'>Loading...</p> */}
      <Image src="/images/ParkEase_logo.png" alt="Logo" width={200} height={100} />
    </div>
  );
};

export default Loading;