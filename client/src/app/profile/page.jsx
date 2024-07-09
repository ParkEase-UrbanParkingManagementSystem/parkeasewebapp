import React from "react";
import styles from "./profile.module.css";
import Image from "next/image";
import Card from "../../ui/card/card";
import {faPen} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faPen);

const Profile = () => {
  const cardItems1 = [
    { title: "Email Address:", content: "pasindiv@gmail.com" },
    { title: "Username:", content: "ABCPMC@123" },
    { title: "Last Accessed Time:", content: "12.30pm 0n 12th July 2024" },
  ];

  const cardItems2 = [
    { title: "Company Name:", content: "ABC Company" },
    { title: "Business Registration Number:", content: "123456789abc" },
    { title: "Contact Number:", content: "071 466 7655" },
    {
      title: "Company Address:",
      content: "102-32/C, Nandun Uyana, Muthuhena Waththa, Meegoda",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.imagecontainer}>
        <Image
          className={styles.userimage}
          src="/images/user.jpg"
          width="130"
          height="130"
        />
        <p>ABC Parking Management Company</p>
      </div>
      <div className="flex">
        <div className="w-1/2">
          <Card items={cardItems1} />
        </div>

        <div className="w-1/2">
          <Card items={cardItems2} />
        </div>
      </div>
      <div className={styles.buttonContainer}>
      <button className={styles.button}>
        Edit Profile
        <FontAwesomeIcon icon={faPen} className={styles.icon} />
      </button>
      </div>
      
    </div>
  );
};

export default Profile;
