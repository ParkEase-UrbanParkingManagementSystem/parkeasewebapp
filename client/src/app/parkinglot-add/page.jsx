"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./parkinglot-add.module.css";
import Button from "../../ui/button/button";

const AddParkingLot = () => {
  const [formData, setFormData] = useState({
    name: "",
    bikeCapacity: "",
    twCapacity: "",
    carCapacity: "",
    xlVehicleCapacity: "",
    addressNo: "",
    street1: "",
    street2: "",
    city: "",
    district: ""
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/parkinglots/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token:token
        },
        body: JSON.stringify(formData)
      });

      const parseRes = await response.json();

      if (response.ok) {
        console.log("Parking lot added successfully", parseRes);
        router.push("/parkingslot");
      } else {
        console.error("Error adding parking lot", parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.title}>Add Parking Lot</div>
        <div className={styles.formcontent}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="Parking Lot Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
              />
              <input
                type="number"
                placeholder="Bike Capacity"
                name="bikeCapacity"
                value={formData.bikeCapacity}
                onChange={handleChange}
                className={styles.input}
              />
              <input
                type="number"
                placeholder="Two-Wheeler Capacity"
                name="twCapacity"
                value={formData.twCapacity}
                onChange={handleChange}
                className={styles.input}
              />
              <input
                type="number"
                placeholder="Car Capacity"
                name="carCapacity"
                value={formData.carCapacity}
                onChange={handleChange}
                className={styles.input}
              />
              <input
                type="number"
                placeholder="XL Vehicle Capacity"
                name="xlVehicleCapacity"
                value={formData.xlVehicleCapacity}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="Address No"
                name="addressNo"
                value={formData.addressNo}
                onChange={handleChange}
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Street 1"
                name="street1"
                value={formData.street1}
                onChange={handleChange}
                className={styles.input}
              />
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
              <input
                type="text"
                placeholder="District"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <Button label="Add Parking Lot" className={styles.button} />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AddParkingLot;
