"use client";

import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./parkinglot-add.module.css";
import Button from "../../ui/button/button";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

const defaultPrices = {
  bikePrice: 30, // Default prices for public PMC
  carPrice: 70,
  threeWheelerPrice: 50,
  lorryPrice: 100,
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
    link: "",
    sketch: null,
    images: [],
    bikePrice: "",
    carPrice: "",
    threeWheelerPrice: "",
    lorryPrice: "",
  });

  const [isPublicPMC, setIsPublicPMC] = useState(null); // null to determine if PMC type is loaded
  const [validationErrors, setValidationErrors] = useState({});

  const router = useRouter();

  useEffect(() => {
    const fetchPMCType = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_KEY}/pmc/pmctype`,
          {
            method: "GET",
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          const publicPMC = data.sector === "Public";
          setIsPublicPMC(publicPMC);

          // Set default prices if PMC is public
          if (publicPMC) {
            setFormData((prevData) => ({
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
    setValidationErrors({ ...validationErrors, [name]: "" });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "sketch") {
      setFormData({ ...formData, sketch: files[0] });
      setValidationErrors({ ...validationErrors, sketch: "" });
    } else if (name === "images") {
      setFormData({ ...formData, images: Array.from(files) });
      setValidationErrors({ ...validationErrors, images: "" });
    }
  };

  const fieldLabels = {
    name: "Parking Lot Name",
    description: "Parking Lot Description",
    bikeCapacity: "Bike Capacity",
    carCapacity: "Car Capacity",
    addressNo: "Address Number",
    street1: "Street 1",
    city: "City",
    district: "District",
    link: "Location Link",
    sketch: "Parking Lot Sketch",
    images: "Parking Lot Images",
    bikePrice: "Bike Price",
    carPrice: "Car Price",
    threeWheelerPrice: "Three-Wheeler Price",
    lorryPrice: "Lorry Price",
  };

  const validateFields = () => {
    const errors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] || (key === "images" && formData[key].length === 0)) {
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
        const userConfirmed = window.confirm(
          "Parking lot added successfully. Click OK to proceed."
        );

        if (userConfirmed) {
          console.log("Parking lot added successfully", parseRes);
          router.push("/parkingslot");
        }
        // router.push("/parkingslot");
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
              {validationErrors.name && (
                <p className="text-red-500 text-xs">*{validationErrors.name}</p>
              )}
              <input
                type="text"
                placeholder="Parking Lot Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={styles.input}
              />
              {validationErrors.description && (
                <p className="text-red-500 text-xs">
                  *{validationErrors.description}
                </p>
              )}
              <br />
              <span>Parking Lot Location Link: </span>
              <input
                type="text"
                placeholder="Location Link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className={styles.input}
              />
              {validationErrors.link && (
                <p className="text-red-500 text-xs">*{validationErrors.link}</p>
              )}
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
                name="district"
                value={formData.district}
                onChange={handleChange}
                className={styles.input}
              />
              {validationErrors.district && (
                <p className="text-red-500 text-xs">
                  *{validationErrors.district}
                </p>
              )}
              <br />
            </div>
            <div className={styles.formGroupii}>
              <div className={styles.formGrouppic}>
                <span>Parking Capacity Details: </span>
                <input
                  type="number"
                  placeholder="Bike Capacity"
                  name="bikeCapacity"
                  value={formData.bikeCapacity}
                  onChange={handleChange}
                  className={styles.input}
                />
                {validationErrors.bikeCapacity && (
                  <p className="text-red-500 text-xs">
                    *{validationErrors.bikeCapacity}
                  </p>
                )}
                <input
                  type="number"
                  placeholder="Car Capacity"
                  name="carCapacity"
                  value={formData.carCapacity}
                  onChange={handleChange}
                  className={styles.input}
                />
                {validationErrors.carCapacity && (
                  <p className="text-red-500 text-xs">
                    *{validationErrors.carCapacity}
                  </p>
                )}
                <br />
                <span>Parking Prices (per vehicle): </span>
                <input
                  type="number"
                  placeholder="Bike Price"
                  name="bikePrice"
                  value={isPublicPMC ? formData.bikePrice : formData.bikePrice}
                  onChange={handleChange}
                  className={styles.input}
                  disabled={isPublicPMC === true} // Disable input if PMC is public
                />
                {validationErrors.bikePrice && (
                  <p className="text-red-500 text-xs">
                    *{validationErrors.bikePrice}
                  </p>
                )}
                <input
                  type="number"
                  placeholder="Car Price"
                  name="carPrice"
                  value={isPublicPMC ? formData.carPrice : formData.carPrice}
                  onChange={handleChange}
                  className={styles.input}
                  disabled={isPublicPMC === true} // Disable input if PMC is public
                />
                {validationErrors.carPrice && (
                  <p className="text-red-500 text-xs">
                    *{validationErrors.carPrice}
                  </p>
                )}
                <input
                  type="number"
                  placeholder="Three-Wheeler Price"
                  name="threeWheelerPrice"
                  value={
                    isPublicPMC
                      ? formData.threeWheelerPrice
                      : formData.threeWheelerPrice
                  }
                  onChange={handleChange}
                  className={styles.input}
                  disabled={isPublicPMC === true} // Disable input if PMC is public
                />
                {validationErrors.threeWheelerPrice && (
                  <p className="text-red-500 text-xs">
                    *{validationErrors.threeWheelerPrice}
                  </p>
                )}
                <input
                  type="number"
                  placeholder="Lorry Price"
                  name="lorryPrice"
                  value={
                    isPublicPMC ? formData.lorryPrice : formData.lorryPrice
                  }
                  onChange={handleChange}
                  className={styles.input}
                  disabled={isPublicPMC === true} // Disable input if PMC is public
                />
                {validationErrors.lorryPrice && (
                  <p className="text-red-500 text-xs">
                    *{validationErrors.lorryPrice}
                  </p>
                )}
                <br />
                <span>Drawn parking lot sketch: </span>
                <input
                  type="file"
                  accept="image/*"
                  name="sketch"
                  onChange={handleFileChange}
                />
                {validationErrors.sketch && (
                  <p className="text-red-500 text-xs">
                    *{validationErrors.sketch}
                  </p>
                )}
                <br />
                <span>
                  Add Pictures of the parking lot: (Up to 10 pictures)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  name="images"
                  onChange={handleFileChange}
                />
                {validationErrors.images && (
                  <p className="text-red-500 text-xs">
                    *{validationErrors.images}
                  </p>
                )}
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
