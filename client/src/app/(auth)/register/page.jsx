"use client";
import styles from "./register.module.css";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation"; // Importing Next.js router for navigation
import Link from "next/link"; // Importing Next.js Link for routing
import Image from "next/image";
// import Navbar2 from "@/ui/navbar2/navbar2";

const Register = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [nic, setNic] = useState("");
  const [contact, setContact] = useState("");
  const [addressNo, setAddressNo] = useState(""); // New state for address number
  const [street1, setStreet1] = useState(""); // New state for street 1
  const [street2, setStreet2] = useState(""); // New state for street 2
  const [city, setCity] = useState(""); // New state for city
  const [district, setDistrict] = useState(""); // New state for district

  const router = useRouter(); // Using Next.js router for navigation

  const validateField = (value, name) => {
    if (value.trim() === "") {
      return `${name} is required.`;
    }
    return "";
  };

  const validateStep1 = () => {
    const newErrors = {};
    newErrors.email = validateField(email, "Email");
    newErrors.password = validateField(password, "Password");
    newErrors.name = validateField(fname, "First Name");
    newErrors.name = validateField(lname, "Last Name");
    newErrors.name = validateField(nic, "NIC");
    newErrors.contact = validateField(contact, "Contact Number");

    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const newErrors = {};
    newErrors.addressNo = validateField(addressNo, "Address No");
    newErrors.street1 = validateField(street1, "Street 1");
    newErrors.city = validateField(city, "City");
    newErrors.district = validateField(district, "District");

    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const nextStep = () => {
    let isValid = false;
    if (step === 1) {
      isValid = validateStep1();
    } else if (step === 2) {
      isValid = validateStep2();
    }

    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (!validateStep2()) return;

    try {
      const body = {
        email,
        password,
        fname,
        lname,
        nic,
        contact,
        addressNo,
        street1,
        street2,
        city,
        district,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/auth/registerDriver`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        alert("Registration successful. Please log in.");
        router.push("/login"); // Redirect to the login page after successful registration
      } else {
        const errorMessage = await response.text();
        alert(errorMessage || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error(err.message);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <Fragment>
      <div>
        {/* <Navbar2/> */}
        <div className={styles.register_container}>
          <div className={styles.left}>
            <div className="m-3">
              <Link href="/">
                <Image
                  src="/images/Group 1782.png"
                  alt="Description of the image"
                  width={160}
                  height={160}
                  className={styles.image}
                />
              </Link>
            </div>
            <div className="text-[25px] text-white tracking-widest m-5 font-bold text-center max-w-[600px]">
              Your gateway to hassle-free parking
            </div>
            <div className="justify-self-center">
              <Image
                src="/images/Parking-rafiki 1.png"
                alt="Description of the image"
                width={500}
                height={500}
                className={styles.image}
              />
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.center}>
              <div className="pb-3">
                <h1 className="text-3xl font-extrabold text-center">Signup</h1>
              </div>
              <form type="submit" onSubmit={onSubmitForm}>
                {step === 1 && (
                  <div>
                    <h2 style={{ fontWeight: "bold", color: "#ffb403" }}>
                      General Information:
                    </h2>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        className="form-control my-2 w-96"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && (
                        <div className="text-red-500 text-xs">
                          {errors.email}
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        className="form-control my-2 w-96"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {errors.password && (
                        <div className="text-red-500 text-xs">
                          {errors.password}
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="First Name"
                        name="fname"
                        className="form-control my-2 w-96"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                      />
                      {errors.fname && (
                        <div className="text-red-500 text-xs">
                          {errors.fname}
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Last Name"
                        name="lname"
                        className="form-control my-2 w-96"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                      />

                      {errors.lname && (
                        <div className="text-red-500 text-xs">
                          {errors.lname}
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="NIC Number"
                        name="nic"
                        className="form-control my-2 w-96"
                        value={nic}
                        onChange={(e) => setNic(e.target.value)}
                      />

                      {errors.nic && (
                        <div className="text-red-500 text-xs">
                          {errors.nic}
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Contact Number"
                        name="contact"
                        className="form-control my-2 w-96"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                      />
                      {errors.contact && (
                        <div className="text-red-500 text-xs">
                          {errors.contact}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <button
                        type="button"
                        onClick={nextStep}
                        className={styles.button}
                      >
                        Next
                      </button>
                    </div>
                    {/* <br /> */}
                  </div>
                )}
                {step === 2 && (
                  <div>
                    <h2 style={{ fontWeight: "bold", color: "#ffb403" }}>
                      Business Address Details:
                    </h2>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Address No"
                        name="addressNo"
                        className="form-control my-2 w-96"
                        value={addressNo}
                        onChange={(e) => setAddressNo(e.target.value)}
                      />
                      {errors.addressNo && (
                        <div className="text-red-500 text-xs">
                          {errors.addressNo}
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Street 1"
                        name="street1"
                        className="form-control my-2 w-96"
                        value={street1}
                        onChange={(e) => setStreet1(e.target.value)}
                      />
                      {errors.street1 && (
                        <div className="text-red-500 text-xs">
                          {errors.street1}
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Street 2"
                        name="street2"
                        className="form-control my-2 w-96"
                        value={street2}
                        onChange={(e) => setStreet2(e.target.value)}
                      />
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        placeholder="City"
                        name="city"
                        className="form-control my-2 w-96"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                      {errors.city && (
                        <div className="text-red-500 text-xs">
                          {errors.city}
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="District"
                        name="district"
                        className="form-control my-2 w-96"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                      />
                      {errors.district && (
                        <div className="text-red-500 text-xs">
                          {errors.district}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-center mt-3 space-x-4">
                      <button
                        type="button"
                        onClick={prevStep}
                        className={styles.button}
                      >
                        Back
                      </button>
                      <button type="submit" className={styles.button}>
                        Regsiter
                      </button>
                    </div>
                  </div>
                )}

                {/* <button className={styles.button}>Register</button> */}
              </form>
              {/* </div> */}

              <div className="text-center mt-3">
                <p>
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-600">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
