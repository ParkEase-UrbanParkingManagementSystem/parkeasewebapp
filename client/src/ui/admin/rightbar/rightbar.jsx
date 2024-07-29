import Image from "next/image";
import styles from "./rightbar.module.css";
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";

const Rightbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.bgContainer}>
                    <Image className={styles.bg} src="/images/astronaut.png" alt="" fill />
                </div>
                <div className={styles.text}>
                    <span className={styles.notification}>🔥 Available Now</span>
                    <h3 className={styles.title}>
                        Real-Time Parking Availability and Analytics
                    </h3>
                    <span className={styles.subtitle}>Takes 4 minutes to learn</span>
                    <p className={styles.desc}>
                        See real-time parking availability across different locations. 
                        Use analytics to predict peak parking times and suggest optimal parking locations. 
                    </p>
                    <button className={styles.button}>
                        <MdPlayCircleFilled />
                        Watch
                    </button>
                </div>
            </div>
            <div className={styles.item}>
                <div className={styles.text}>
                    <span className={styles.notification}>🚀 Coming Soon</span>
                    <h3 className={styles.title}>
                        New server actions are available, partial pre-rendering is coming
                        up!
                    </h3>
                    <span className={styles.subtitle}>Boost the user experience</span>
                    <p className={styles.desc}>
                        Detect fraudulent activities, such as repeated cancellations or misuse of ParkPoints.
                    </p>
                    <button className={styles.button}>
                        <MdReadMore />
                        Learn
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Rightbar;