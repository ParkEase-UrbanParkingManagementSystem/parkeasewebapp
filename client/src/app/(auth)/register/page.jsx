"use client";
import styles from "./register.module.css";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation"; // Importing Next.js router for navigation
import Link from "next/link"; // Importing Next.js Link for routing
import Image from "next/image";

const Register = () => {
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

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password, fname, lname, nic, contact, addressNo, street1, street2, city, district };

      const response = await fetch(`http://localhost:5000/auth/registerDriver`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        router.push("/dashboard"); // Redirecting to a dashboard or home page after successful registration
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className={styles.register_container}>
        <div className={styles.left}>
          <div className="m-3">
            <Image
              src="/images/Group 1782.png"
              alt="Description of the image"
              width={160}
              height={160}
              className={styles.image}
            />
          </div>
          <div className="text-4xl text-white tracking-widest m-5">
            Your Gateway to Hassle-free Parking
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
            <div className="float-left py-3">
              <h1 className="text-center text-3xl font-extrabold">User Registration</h1>
            </div>

            <div>
              <form type="submit" onSubmit={onSubmitForm}>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="form-control my-3 w-96"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="form-control my-3 w-96"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="First Name"
                  name="fname"
                  className="form-control my-3 w-96"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />
               
               <input
                  type="text"
                  placeholder="Last Name"
                  name="lname"
                  className="form-control my-3 w-96"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="NIC Number"
                  name="nic"
                  className="form-control my-3 w-96"
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Contact Number"
                  name="contact"
                  className="form-control my-3 w-96"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />

                <div>
                  <h2>Address Details:</h2>
                  <input
                    type="text"
                    placeholder="Address No"
                    name="addressNo"
                    className="form-control my-3 w-96"
                    value={addressNo}
                    onChange={(e) => setAddressNo(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Street 1"
                    name="street1"
                    className="form-control my-3 w-96"
                    value={street1}
                    onChange={(e) => setStreet1(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Street 2"
                    name="street2"
                    className="form-control my-3 w-96"
                    value={street2}
                    onChange={(e) => setStreet2(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    className="form-control my-3 w-96"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="District"
                    name="district"
                    className="form-control my-3 w-96"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                  />
                </div>

                <button className={styles.button}>
                  Register
                </button>
              </form>
            </div>

            <div className="text-center mt-3">
              <p>
                Already have an account?{" "}
                <Link href="/login" className="text-blue-500">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
