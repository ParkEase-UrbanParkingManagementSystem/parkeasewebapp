// app/register/page.jsx

// Mark this component as a Client Component
"use client";
import styles from "./register.module.css";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation"; // Importing Next.js router for navigation
import Link from "next/link"; // Importing Next.js Link for routing
import Image from "next/image";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter(); // Using Next.js router for navigation

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password, name };

      const response = await fetch(`http://localhost:5000/auth/register`, {
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
          <div className="m-2">
            <Image
              src="/images/Group 177.png"
              alt="Description of the image"
              width={150}
              height={200}
              className={styles.image}
            ></Image>
          </div>
          <div className="text-4xl text-white tracking-widest m-5 font-semibold">
            Your Gateway to Hassle - free parking
          </div>
          <div className="justify-self-center">
            <Image
              src="/images/Parking-rafiki 1.png"
              alt="Description of the image"
              width={500}
              height={500}
              className={styles.image}
            ></Image>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.center}>
            <div className="float-left py-3">
              <h1 className="text-center text-3xl font-extrabold">Register</h1>
            </div>

            <div>
              <form type="submit" onSubmit={onSubmitForm}>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="form-control my-3 w-96"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="form-control my-3 w-96"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="name"
                  name="name"
                  className="form-control my-3 w-96"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="business registration number"
                  name="regNo"
                  className="form-control my-3 w-96"
                />

                <div>
                  <h2>Address Details :</h2>
                  <input
                    type="text"
                    placeholder="address_no"
                    name="addNo"
                    className="form-control my-3 w-96"
                  />
                  <input
                    type="text"
                    placeholder="street_1"
                    name="st1"
                    className="form-control my-3 w-96"
                  />
                  <input
                    type="text"
                    placeholder="street_2"
                    name="st2"
                    className="form-control my-3 w-96"
                  />
                  <input
                    type="text"
                    placeholder="city"
                    name="city"
                    className="form-control my-3 w-96"
                  />
                  <input
                    type="text"
                    placeholder="district"
                    name="district"
                    className="form-control my-3 w-96"
                  />
                </div>

                <button className="btn btn-success btn-block w-full">
                  Register
                </button>
              </form>
            </div>

            <div className="text-center mt-3">
              <p>
                Already have an account? <Link href="/login" className="text-blue-500">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
