import React from 'react';
import styles from './Loading.module.css'; // Optional CSS module for styling
import Image from 'next/image';

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <p className='text-2xl font-bold'>Loading...</p>
      <Image src="/images/logo.png" alt="Logo" width={180} height={80} />
    </div>
  );
};

export default Loading;