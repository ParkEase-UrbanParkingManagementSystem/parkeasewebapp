import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./statcards.module.css";

const StatCards = ({ icon: Icon, title, number, detail, positive }) => {
    return (
        <div className={styles.container}>
            <Icon size={24} />
            <div className={styles.texts}>
                <span className={styles.title}>{title}</span>
                <span className={styles.number}>{number}</span>
                <span className={styles.detail}>
                    <span className={positive ? styles.positive : styles.negative}>{detail}</span>more than previus month
                </span>
            </div>
        </div>
    );
};


export default StatCards;