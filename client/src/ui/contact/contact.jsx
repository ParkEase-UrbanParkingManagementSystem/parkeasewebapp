import React from "react";
import styles from "./contact.module.css";

const Contact = () => {
return (
<div className={styles["contact-page-wrapper"]}>
    <h1 className={styles["primary-subheading"]}>Any questions in mind?</h1>
    <h1 className={styles["primary-heading"]}>Let us help you</h1>
    <div className={styles["contact-form-container"]}>
    <input type="text" placeholder="yourmail@gmail.com" />
    <button className={styles["secondary-button"]}>Submit</button>
    </div>
</div>
);
};

export default Contact;
