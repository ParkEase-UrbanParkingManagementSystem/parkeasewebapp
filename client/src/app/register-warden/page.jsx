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
    province: "",
    contact: "", // Added contact field
  });

  const router = useRouter();
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationErrors({ ...validationErrors, [name]: "" });
  };

  const fieldLabels = {
    email: "Email",
    password: "Password",
    fname: "Warden first name",
    lname: "Warden last name",
    nic: "NIC",
    addressNo: "Address No.",
    street1: "Street 1",
    city: "City",
    province: "District",
    contact: "Contact",
  };

  const validateFields = () => {
    const errors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] || formData[key].length === 0) {
        errors[key] = `${fieldLabels[key]} is required`;
      }
    });
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/wardens/registerWarden`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify(formData),
        }
      );

      const parseRes = await response.json();

      if (response.ok) {
        const userConfirmed = window.confirm(
          "Warden added successfully. Click OK to proceed."
        );

        if (userConfirmed) {
          console.log("Warden registered successfully", parseRes);
          router.push("/warden");
        }
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
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <span>Warden Account Details: </span>
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
              />
              {validationErrors.email && (
                <p className="text-red-500 text-xs">
                  *{validationErrors.email}
                </p>
              )}
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
              />
              {validationErrors.password && (
                <p className="text-red-500 text-xs">
                  *{validationErrors.password}
                </p>
              )}
              <br />
              <span>Personal Details: </span>
              <input
                type="text"
                placeholder="First Name"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                className={styles.input}
              />
              {validationErrors.fname && (
                <p className="text-red-500 text-xs">
                  *{validationErrors.fname}
                </p>
              )}
              <input
                type="text"
                placeholder="Last Name"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                className={styles.input}
              />
              {validationErrors.lname && (
                <p className="text-red-500 text-xs">
                  *{validationErrors.lname}
                </p>
              )}
              <input
                type="text"
                placeholder="National Identity Card"
                name="nic"
                value={formData.nic}
                onChange={handleChange}
                className={styles.input}
              />
              {validationErrors.nic && (
                <p className="text-red-500 text-xs">*{validationErrors.nic}</p>
              )}
              <input
                type="text"
                placeholder="Contact Number" // Added contact input
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className={styles.input}
              />
              {validationErrors.contact && (
                <p className="text-red-500 text-xs">
                  *{validationErrors.contact}
                </p>
              )}
            </div>
            <div className={styles.formGroup}>
              <span>Address Details: </span>
              <input
                type="text"
                placeholder="Address No"
                name="addressNo"
                value={formData.addressNo}
                onChange={handleChange}
                className={styles.input}
              />
              {validationErrors.addressNo && (
                <p className="text-red-500 text-xs">
                  *{validationErrors.addressNo}
                </p>
              )}
              <input
                type="text"
                placeholder="Street 1"
                name="street1"
                value={formData.street1}
                onChange={handleChange}
                className={styles.input}
              />
              {validationErrors.street1 && (
                <p className="text-red-500 text-xs">
                  *{validationErrors.street1}
                </p>
              )}
              <input
                type="text"
                placeholder="Street 2"
                name="street2"
                value={formData.street2}
                onChange={handleChange}
                className={styles.input}
              />
              <input
                type="text"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={styles.input}
              />
              {validationErrors.city && (
                <p className="text-red-500 text-xs">*{validationErrors.city}</p>
              )}
              <input
                type="text"
                placeholder="District"
                name="province"
                value={formData.province}
                onChange={handleChange}
                className={styles.input}
              />
              {validationErrors.province && (
                <p className="text-red-500 text-xs">
                  *{validationErrors.province}
                </p>
              )}
            </div>

            <div className="mt-3 flex justify-self-start p-2">
              <Button label="Register" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
