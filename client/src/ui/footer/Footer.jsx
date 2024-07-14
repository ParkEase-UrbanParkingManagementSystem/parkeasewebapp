import styles from "./footer.module.css";

// const Footer = () => {
// return (
// <div className={styles.container}>
//     <div className={styles.logo}>ParkEase</div>
//     <div className={styles.text}>
//     Hasle-free parking gateway © All rights reserved.
//     </div>
// </div>
// );
// };

// export default Footer;


const Footer = () => {
return (
<footer className={styles.footer}>
    <div className={styles.container}>
    <div className={styles.grid}>
        <div>
        <h2 className={styles.heading}>Company</h2>
        <ul className={styles.list}>
            <li className={styles.listItem}>
            <a href="#" className={styles.link}>About</a>
            </li>
            <li className={styles.listItem}>
            <a href="#" className={styles.link}>Careers</a>
            </li>
            <li className={styles.listItem}>
            <a href="#" className={styles.link}>Brand Center</a>
            </li>
            <li className={styles.listItem}>
            <a href="#" className={styles.link}>Blog</a>
            </li>
        </ul>
        </div>
        <div>
        <h2 className={styles.heading}>Help center</h2>
        <ul className={styles.list}>
            <li className={styles.listItem}>
            <a href="#" className={styles.link}>Discord Server</a>
            </li>
            <li className={styles.listItem}>
            <a href="#" className={styles.link}>Twitter</a>
            </li>
            <li className={styles.listItem}>
            <a href="#" className={styles.link}>Facebook</a>
            </li>
            <li className={styles.listItem}>
            <a href="#" className={styles.link}>Contact Us</a>
            </li>
        </ul>
        </div>
        <div>
        <h2 className={styles.heading}>Legal</h2>
        <ul className={styles.list}>
            <li className={styles.listItem}>
            <a href="#" className={styles.link}>Privacy Policy</a>
            </li>
            <li className={styles.listItem}>
            <a href="#" className={styles.link}>Licensing</a>
            </li>
            <li className={styles.listItem}>
            <a href="#" className={styles.link}>Terms &amp; Conditions</a>
            </li>
        </ul>
        </div>
        <div>
        <h2 className={styles.heading}>Download</h2>
        <ul className={styles.list}>
            <li className={styles.listItem}>
            <a href="#" className={styles.link}>iOS</a>
            </li>
            <li className={styles.listItem}>
            <a href="#" className={styles.link}>Android</a>
            </li>
            <li className={styles.listItem}>
            <a href="#" className={styles.link}>Windows</a>
            </li>
            <li className={styles.listItem}>
            <a href="#" className={styles.link}>MacOS</a>
            </li>
        </ul>
        </div>
    </div>
    <div className={styles.bottomBar}>
        <span className={styles.copyright}>© 2023 <a href="/" className={styles.footerLink}>ParkEase™</a>. All Rights Reserved.</span>
        <div className={styles.socialIcons}>
        <a href="#" className={styles.socialIcon}>
            <svg className={styles.icon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
            <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
            </svg>
        </a>
        <a href="#" className={styles.socialIcon}>
            <svg className={styles.icon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 0 10.244a9.911 9.911 0 0 0 10 9.911 9.911 9.911 0 0 0 10-9.911A9.911 9.911 0 0 0 10 .333Zm3.018 6.441a.56.56 0 0 1 0 1.12.56.56 0 1 1 0-1.12ZM10 5.78a4.467 4.467 0 0 0-4.481 4.466A4.467 4.467 0 0 0 10 14.71a4.467 4.467 0 0 0 4.481-4.464A4.467 4.467 0 0 0 10 5.78Zm0 7.408a2.937 2.937 0 0 1-2.942-2.942A2.937 2.937 0 0 1 10 7.303a2.937 2.937 0 0 1 2.942 2.943A2.937 2.937 0 0 1 10 13.188Zm4.608-8.934a.64.64 0 1 1 0-1.281.64.64 0 0 1 0 1.28Z" clipRule="evenodd" />
            </svg>
        </a>
        <a href="#" className={styles.socialIcon}>
            <svg className={styles.icon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18.008 0H1.991C.891 0 0 .891 0 1.991v16.017C0 19.109.891 20 1.991 20H18.008A1.993 1.993 0 0 0 20 18.008V1.991A1.993 1.993 0 0 0 18.008 0ZM6.953 15.564H3.867V7.534h3.086v8.03ZM5.41 6.272c-.98 0-1.774-.796-1.774-1.774 0-.978.794-1.774 1.774-1.774a1.776 1.776 0 0 1 0 3.548Zm10.152 9.292h-3.088V11.43c0-.986-.02-2.253-1.373-2.253-1.375 0-1.585 1.072-1.585 2.181v4.206H6.428V7.534h2.964v1.106h.042c.412-.78 1.422-1.604 2.929-1.604 3.133 0 3.708 2.061 3.708 4.74v4.788Z" clipRule="evenodd" />
            </svg>
        </a>
        </div>
    </div>
    </div>
</footer>
);
};

export default Footer;
