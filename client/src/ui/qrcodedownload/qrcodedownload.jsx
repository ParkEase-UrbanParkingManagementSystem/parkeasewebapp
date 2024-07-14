// components/QRCodeDownload.jsx
'use client';
import React from 'react';
import QRCode from 'qrcode.react';
import styles from './qrcodedownload.module.css'; // Import the CSS module

const QRCodeDownload = () => {
return (
<div className={styles.qrCodeContainer}>
    <div className={styles.qrCodeGrid}>
    <div className={styles.qrCodeItem}>
        <h3>Download the Driver App</h3>
        <p>Scan to download</p>
        <QRCode
        value="https://play.google.com/store/apps/details?id=your_app_package_name"
        size={200}
        includeMargin={true}
        />
    </div>
    <div className={styles.qrCodeItem}>
        <h3>Download the Warden App</h3>
        <p>Scan to download</p>
        <QRCode
        value="https://apps.apple.com/us/app/your-app-name/id1234567890"
        size={200}
        includeMargin={true}
        />
    </div>
    </div>
</div>
);
};

export default QRCodeDownload;
