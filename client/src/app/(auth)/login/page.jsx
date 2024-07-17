// app/login/page.jsx

// Mark this component as a Client Component
"use client";
import styles from "./login.module.css";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation"; // Importing Next.js router for navigation
import Image from "next/image";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Using Next.js router

  

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password };

      const response = await fetch(`http://localhost:5000/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        router.push("/dashboard"); // Navigate to a dashboard or home page after login
      } else {
        alert("Login failed, please check your credentials.");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      
      <div className={styles.login_container}>
        <div className={styles.left}>
          <div className="m-3">
            <Image
              src="/images/Group 1782.png"
              alt="Description of the image"
              width={160}
              height={160}
              className={styles.image}
            ></Image>
          </div>
          <div className="text-4xl text-white tracking-widest m-5">
            Your Gateway to Hassle - free parking
          </div>
          <div className="justify-self-center">
            <Image
              src="/images/Business decisions-bro 2.png"
              alt="Description of the image"
              width={500}
              height={500}
              className={styles.image}
            ></Image>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.center}>
            <div className="float-left py-10">
              <h1 className="text-center text-3xl font-extrabold">Log In</h1>
            </div>

            <div>
              <form onSubmit={onSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control my-3 w-96"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control my-3 w-96"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <button className={styles.button}>
                  Login
                </button>
              </form>
            </div>

            <div className="text-center mt-3">
              <p>
                Don't have an account?{" "}
                <a href="/register" className="text-blue-500">
                  Register
                </a>
              </p>
              {/* Using <a> for navigation */}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
