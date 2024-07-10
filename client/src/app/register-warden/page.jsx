"use client";

import { Fragment } from "react";
import styles from "./register-warden.module.css";
import Button from "../../ui/button/button";

const Register = () => {
  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.title}>Warden Registration</div>
        <div className={styles.formcontent}>
          <form type="submit">
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="form-control my-3 w-96"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="form-control my-3 w-96"
            />
            <input
              type="text"
              placeholder="First Name"
              name="fname"
              className="form-control my-3 w-96"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lname"
              className="form-control my-3 w-96"
            />
            <input
              type="text"
              placeholder="National Identity Card"
              name="nic"
              className="form-control my-3 w-96"
            />

            <input
              type="text"
              placeholder="Address No"
              name="addressNo"
              className="form-control my-3 w-96"
            />
            <input
              type="text"
              placeholder="Street 1"
              name="street1"
              className="form-control my-3 w-96"
            />
            <input
              type="text"
              placeholder="Street 2"
              name="street2"
              className="form-control my-3 w-96"
            />
            <input
              type="text"
              placeholder="City"
              name="city"
              className="form-control my-3 w-96"
            />
            <input
              type="text"
              placeholder="District"
              name="district"
              className="form-control my-3 w-96"
            />
            <Button label="Register"/>
            
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
