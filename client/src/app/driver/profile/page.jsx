import styles from "../profile/page.module.css";

const Profile = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Profile Page</h1>

      <div className={styles.profileSection}>
        <div className={styles.profileCard}>
          <img src="/images/user-icon.png" alt="Profile Picture" className={styles.profilePic} />
          <div className={styles.profileInfo}>
            <h2>John Doe</h2>
            <p>Email: john.doe@example.com</p>
            <p>Mobile: +1 234 567 890</p>
            <p>Address: 123 Main St, Apt 4B, New York, NY 10001</p>
            <p>Hometown: New York, USA</p>
            <p>NIC: 1234-567890-1</p>
          </div>
        </div>

        <div className={styles.vehicleSection}>
          <div className={styles.vehicleCard}>
            <h2 className={styles.cardTitle}>Vehicle Information</h2>
            <div className={styles.vehicleGrid}>
              <div className={styles.vehicleItem}>
                <img src="/images/tesla-model-s.jpg" alt="Tesla Model S" className={styles.vehiclePic} />
                <div className={styles.vehicleInfo}>
                  <p>Tesla Model S</p>
                 
                  <p>License Plate: ABC-1234</p>
                </div>
              </div>
              <div className={styles.vehicleItem}>
                <img src="/images/car.png" alt="BMW 3 Series" className={styles.vehiclePic} />
                <div className={styles.vehicleInfo}>
                  <p>BMW 3 Series</p>
                  
                  <p>License Plate: XYZ-5678</p>
                </div>
              </div>
              <div className={styles.vehicleItem}>
                <img src="/images/motorcycle.png" alt="Audi A4" className={styles.vehiclePic} />
                <div className={styles.vehicleInfo}>
                  <p>Honda JADE</p>
                  
                  <p>License Plate: LMN-9012</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
