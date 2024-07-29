import Image from "next/image";
import styles from "./userdet.module.css";

const UserDetails = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Most Recent User Registrations</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td className="font-bold">Name</td>
                        <td className="font-bold">Status</td>
                        <td className="font-bold">Date</td>
                        <td className="font-bold">Type</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className={styles.user}>
                                <Image
                                    src="/images/noavatar.png"
                                    alt=""
                                    width={40}
                                    height={40}
                                    className={styles.userImage}
                                />
                                Kimuthu Niketh
                            </div>
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.pending}`}>
                                Pending
                            </span>
                        </td>
                        <td>20.07.2024</td>
                        <td>Driver</td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.user}>
                                <Image
                                    src="/images/noavatar.png"
                                    alt=""
                                    width={40}
                                    height={40}
                                    className={styles.userImage}
                                />
                                Shanaya Mendis
                            </div>
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.done}`}>Done</span>
                        </td>
                        <td>14.07.2024</td>
                        <td>Driver</td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.user}>
                                <Image
                                    src="/images/noavatar.png"
                                    alt=""
                                    width={40}
                                    height={40}
                                    className={styles.userImage}
                                />
                                DS Parking Private Limited
                            </div>
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.cancelled}`}>
                                Completed
                            </span>
                        </td>
                        <td>02.07.2024</td>
                        <td>PMC</td>
                    </tr>
                    <tr>
                        <td>
                            <div className={styles.user}>
                                <Image
                                    src="/images/noavatar.png"
                                    alt=""
                                    width={40}
                                    height={40}
                                    className={styles.userImage}
                                />
                                Gavin De Silva
                            </div>
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.pending}`}>
                                Pending
                            </span>
                        </td>
                        <td>29.06.2024</td>
                        <td>Driver</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default UserDetails;