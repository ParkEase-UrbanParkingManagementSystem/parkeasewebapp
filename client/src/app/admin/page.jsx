// import { cards } from "../lib/data";
// import Card from "../ui/dashboard/card/card";
import Chart from "@/ui/admin/chart/chart";
import styles from "./admin.module.css";
import Rightbar from "@/ui/admin/rightbar/rightbar";
import StatCards from "@/ui/admin/statcards/statcards";
import UserDetails from "@/ui/admin/userdet/userdet";
import { MdSupervisedUserCircle, MdTrendingUp, MdTrendingDown } from 'react-icons/md';
// import styles from "@/ui/admin/statcards/statcards.module.css"

const Admin = () => {
    return (
        <div className={styles.body}>
            <div className={styles.wrapper}>
                <div className={styles.main}>
                    <div className={styles.cards}>
                        {/* {cards.map((item) => (
                <Card item={item} key={item.id} />
              ))} */}
                        <StatCards
                            icon={MdSupervisedUserCircle}
                            title="Total Drivers"
                            number="150"
                            detail="2%"
                            positive={true}
                        />
                        <StatCards
                            icon={MdSupervisedUserCircle}
                            title="Total PMCs"
                            number="150.45"
                            detail="1.5%"
                            positive={true}
                        />
                        <StatCards
                            icon={MdSupervisedUserCircle}
                            title="Total Wardens"
                            number="5.34"
                            detail="0.5%"
                            positive={true}
                        />
                    </div>
                    <UserDetails />
                    <Chart />
                </div>
                <div className={styles.side}>
                    <Rightbar />
                </div>
            </div>
        </div>
    );
};

export default Admin;