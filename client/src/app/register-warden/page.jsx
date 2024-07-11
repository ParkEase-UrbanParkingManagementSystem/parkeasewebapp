"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./register-warden.module.css";
import Button from "../../ui/button/button";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fname: "",
    lname: "",
    nic: "",
    addressNo: "",
    street1: "",
    street2: "",
    city: "",
    province: ""
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/wardens/registerWarden", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(formData)
      });

      const parseRes = await response.json();

      if (response.ok) {
        console.log("Warden registered successfully", parseRes);
        router.push("/dashboard");
      } else {
        console.error("Error registering warden", parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.title}>Warden Registration</div>
        <div className={styles.formcontent}>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control my-3 w-96"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control my-3 w-96"
            />
            <input
              type="text"
              placeholder="First Name"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              className="form-control my-3 w-96"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              className="form-control my-3 w-96"
            />
            <input
              type="text"
              placeholder="National Identity Card"
              name="nic"
              value={formData.nic}
              onChange={handleChange}
              className="form-control my-3 w-96"
            />
            
            <input
              type="text"
              placeholder="Address No"
              name="addressNo"
              value={formData.addressNo}
              onChange={handleChange}
              className="form-control my-3 w-96"
            />
            <input
              type="text"
              placeholder="Street 1"
              name="street1"
              value={formData.street1}
              onChange={handleChange}
              className="form-control my-3 w-96"
            />
            <input
              type="text"
              placeholder="Street 2"
              name="street2"
              value={formData.street2}
              onChange={handleChange}
              className="form-control my-3 w-96"
            />
            <input
              type="text"
              placeholder="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="form-control my-3 w-96"
            />
            <input
              type="text"
              placeholder="Province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="form-control my-3 w-96"
            />
            <Button label="Register" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
