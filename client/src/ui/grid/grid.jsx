import styles from './grid.module.css';
import Button from "@/ui/button/button";
import ArticleIcon from '@mui/icons-material/Article';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';

const Grid = () => {
return (
<div className={styles.gridContainer}>

    <div className={styles.gridItem}>
    <h2 className={styles.topic}> <ArticleIcon/> Our official product guide</h2>
    <p className={styles.description}>Discover how ParkEase transforms parking 
        management with real-time availability, seamless reservations, and secure payments. 
        Learn how our innovative platform can provide tailored solutions for your business.</p>
        <Button
            label="Download Guide"
            icon={['fas', 'coffee']} 
            path="/login" 
        />
    </div>

    <div className={styles.gridItem}>
    <h2 className={styles.topic}> <ThumbUpAltIcon/> Enhance parking efficiency and customer satisfaction</h2>
    <p className={styles.description}>Explore these 4 essential tips to ensure your parking operations run smoothly and keep your customers happy.</p>
    <Button
        label="Read More"
        icon={['fas', 'coffee']} 
        path="/login"
    />
    </div>

    <div className={styles.gridItem}>
    <h2 className={styles.topic}> <EnergySavingsLeafIcon/> Rising to the challenge of sustainability</h2>
    <p className={styles.description}>Sustainable parking is a shared responsibility. As a dedicated partner to companies worldwide, ParkEase helps you meet your environmental goals and create a lasting positive impact.</p>
    <Button
        label="Read More"
        icon={['fas', 'coffee']} 
        path="/login" 
    />
    </div>
</div>
);
};

export default Grid;
