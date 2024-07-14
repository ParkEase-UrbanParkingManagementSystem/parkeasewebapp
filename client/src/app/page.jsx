import Image from "next/image";
import styles from "./home.module.css";
import Navbar from "@/ui/homenavbar/homenavbar";
import { SelectScrollable } from "@/ui/selectscrollable/selectscrollable";
import Button from "@/ui/button/button";
import Grid from "@/ui/grid/grid";
import QRCodeDownload from "@/ui/qrcodedownload/qrcodedownload";

const Home = () => {

  const items = [
    { title: "Our Official Product Guide", content: "Discover how ParkEase transforms parking management with real-time availability, seamless reservations, and secure payments. Learn how our innovative platform can provide tailored solutions for your business." },
    { title: "Enhance parking efficiency and customer satisfaction", content: "Explore these 4 essential tips to ensure your parking operations run smoothly and keep your customers happy." },
    { title: "Let’s rise to the challenge of sustainability", content: "Sustainable parking is a shared responsibility. As a dedicated partner to companies worldwide, ParkEase helps you meet your environmental goals and create a lasting positive impact." },
  ];

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.homeSection}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Find, pay, and park with ease</h1>
          <p className={styles.desc}>
            Discover the future of parking with ParkEase, where convenience
            meets technology. Say goodbye to the hassle of searching for parking
            spots and dealing with outdated payment methods. With ParkEase, you
            can find real-time parking availability, reserve your spot in
            advance, and pay securely through our user-friendly mobile app.
          </p>
          <p className={styles.subtitle}>Discover parking near you, park with ease.</p>
          <SelectScrollable />
          <Button
            label="View Parking"
            icon={['fas', 'coffee']} 
            path="/login" 
          />
          
          {/* <div className={styles.buttons}>
            <a
              href="https://play.google.com/store/apps/details?id=your_app_package_name"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/ios.png"
                alt="Google Play Store"
                width={150}
                height={50}
              />
            </a>
            <a
              href="https://apps.apple.com/us/app/your-app-name/id1234567890"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/apple.png"
                alt="Apple App Store"
                width={150}
                height={50}
              />
            </a>
          </div> */}
        </div>
        <div className={styles.imgContainer}>
          <Image
            src="/images/home1.jpg"
            alt="ParkEase"
            fill
            className={styles.heroImg}
          />
        </div>
      </div>

      {/* <div className={styles.aboutSection}>
        <div className={styles.textContainer}>
          <div className={styles.boxes}>
            <div className={styles.box}>
              <h1>100%</h1>
              <p>Transparent pricing with no hidden fees</p>
            </div>
            <div className={styles.box}>
              <h1>95%</h1>
              <p>Of users find a parking spot within 5 minutes</p>
            </div>
            <div className={styles.box}>
              <h1>1 K+</h1>
              <p>Parking spots monitored in real-time</p>
            </div>
          </div>
        </div>
      </div> */}

      <div className={styles.businessSection}>
        
      <div className={styles.imgContainer}>
          <Image
            src="/images/home2.jpg"
            alt="ParkEase"
            fill
            className={styles.heroImg}
          />
        </div>

        <div className={styles.textContainer}>
          <h1 className={styles.title}>Maximize earnings, simplify operations and elevate parking.</h1>
          <p className={styles.desc}>
          Bid farewell to the challenges of traditional parking operations and outdated systems of managing your Parking Wardens.  
          Join ParkEase to streamline operations and boost earnings while enhancing the parking experience for customers.
          </p>
          <Button
            label="Get Started"
            icon={['fas', 'coffee']} 
            path="/register" 
          />
        </div>
        
      </div>

      <div className={styles.faqSection}>
        <div className={styles.textContainer}>
          <h5 className={styles.title1}>Not quite ready to get started?</h5>
          <p className={styles.desc}>
          Check out these resources to learn more about how ParkEase can help optimize 
          your parking management and boost your revenue.
          </p>
          <Grid />
        </div>
      </div>

      <div className={styles.faqSection}>
        <div className={styles.textContainer}>
          <h5 className={styles.title2}>It's easier with the Apps</h5>
          <QRCodeDownload />
        </div>
      </div>

      


    </div>

    
  );
};

export default Home;