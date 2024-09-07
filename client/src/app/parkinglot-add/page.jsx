"use client";

import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./parkinglot-add.module.css";
import Button from "../../ui/button/button";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

const defaultPrices = {
  bikePrice: 30,  // Default prices for public PMC
  carPrice: 70,
  threeWheelerPrice: 50,
  lorryPrice: 100
};

const AddParkingLot = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    bikeCapacity: "",
    carCapacity: "",
    addressNo: "",
    street1: "",
    street2: "",
    city: "",
    district: "",
    sketch: null,
    images: [],
    bikePrice: "",
    carPrice: "",
    threeWheelerPrice: "",
    lorryPrice: "",
  });

  const [isPublicPMC, setIsPublicPMC] = useState(null); // null to determine if PMC type is loaded

  const router = useRouter();

  useEffect(() => {
    const fetchPMCType = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/pmc/pmctype`, {
          method: "GET",
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        const data = await response.json();
        if (response.ok) {
          const publicPMC = data.sector === 'Public';
          setIsPublicPMC(publicPMC);

          // Set default prices if PMC is public
          if (publicPMC) {
            setFormData(prevData => ({
              ...prevData,
              bikePrice: defaultPrices.bikePrice,
              carPrice: defaultPrices.carPrice,
              threeWheelerPrice: defaultPrices.threeWheelerPrice,
              lorryPrice: defaultPrices.lorryPrice,
            }));
          }
        } else {
          console.error("Failed to fetch PMC type", data.message);
        }
      } catch (err) {
        console.error("Failed to fetch PMC type", err);
      }
    };

    fetchPMCType();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "sketch") {
      setFormData({ ...formData, sketch: files[0] });
    } else if (name === "images") {
      setFormData({ ...formData, images: Array.from(files) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const data = new FormData();
      for (let key in formData) {
        if (key === "images") {
          formData[key].forEach((file) => data.append(key, file));
        } else {
          data.append(key, formData[key]);
        }
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/parkinglots/add`,
        {
          method: "POST",
          headers: {
            token: token,
          },
          body: data,
        }
      );

      const parseRes = await response.json();

      if (response.ok) {
        console.log("Parking lot added successfully", parseRes);
        router.push("/parkingslot");
      } else {
        console.error("Error adding parking lot", parseRes);
      }
    } catch (err) {
      console.error("Request failed", err);
    }
  };

  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.title}>Add Parking Lot</div>
        <div className={styles.formcontent}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroupi}>
              <span>Parking Details: </span>
              <input
                type="text"
                placeholder="Parking Lot Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Parking Lot Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={styles.input}
              />
              <br />
              <span>Parking Capacity Details: </span>
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
                placeholder="Car Capacity"
                name="carCapacity"
                value={formData.carCapacity}
                onChange={handleChange}
                className={styles.input}
              />
              <br />
              <span>Parking Address Details: </span>
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
              <br />
            </div>
            <div className={styles.formGroupii}>
              <div className={styles.formGrouppic}>
                <span>Parking Prices (per vehicle): </span>
                <input
                  type="number"
                  placeholder="Bike Price"
                  name="bikePrice"
                  value={isPublicPMC ? formData.bikePrice : formData.bikePrice}
                  onChange={handleChange}
                  className={styles.input}
                  disabled={isPublicPMC === true}  // Disable input if PMC is public
                />
                <input
                  type="number"
                  placeholder="Car Price"
                  name="carPrice"
                  value={isPublicPMC ? formData.carPrice : formData.carPrice}
                  onChange={handleChange}
                  className={styles.input}
                  disabled={isPublicPMC === true}  // Disable input if PMC is public
                />
                <input
                  type="number"
                  placeholder="Three-Wheeler Price"
                  name="threeWheelerPrice"
                  value={isPublicPMC ? formData.threeWheelerPrice : formData.threeWheelerPrice}
                  onChange={handleChange}
                  className={styles.input}
                  disabled={isPublicPMC === true}  // Disable input if PMC is public
                />
                <input
                  type="number"
                  placeholder="Lorry Price"
                  name="lorryPrice"
                  value={isPublicPMC ? formData.lorryPrice : formData.lorryPrice}
                  onChange={handleChange}
                  className={styles.input}
                  disabled={isPublicPMC === true}  // Disable input if PMC is public
                />
                <br />
                <span>Drawn parking lot sketch: </span>
                <input
                  type="file"
                  accept="image/*"
                  name="sketch"
                  onChange={handleFileChange}
                />
                <br />
                <span>Add Pictures of the parking lot: </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  name="images"
                  onChange={handleFileChange}
                />
                <br />
              </div>
              <div>
                <Button
                  label="Add Parking Lot"
                  type="submit"
                  icon={faSquarePlus}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AddParkingLot;
