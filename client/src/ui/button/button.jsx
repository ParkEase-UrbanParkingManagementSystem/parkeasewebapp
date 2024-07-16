// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import styles from './Button.module.css';

// const Button = ({ label, icon, onClick }) => (
//   <div className={styles.buttonContainer}>
//     <button className={styles.button} onClick={onClick}>
//       {label}
//       {icon && <FontAwesomeIcon icon={icon} className={styles.icon} />}
//     </button>
//   </div>
// );

// export default Button;

'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Button.module.css';

const Button = ({ label, icon, path }) => {
  const router = useRouter();

  const handleClick = () => {
    // Navigate to the specified path
    if (path) {
      router.push(path);
    }
  };

  return (
    <div className={styles.buttonContainer}>
      <button className={styles.button} onClick={handleClick}>
        {label}
        {icon && <FontAwesomeIcon icon={icon} className={styles.icon} />}
      </button>
    </div>
  );
};

export default Button;
