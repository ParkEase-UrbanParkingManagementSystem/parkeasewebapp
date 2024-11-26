"use client";

// import Navbar2 from "@/ui/navbar2/navbar2";
import styles from "./login.module.css";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation"; // Importing Next.js router for navigation
import Image from "next/image";
// import Footer from "@/ui/footer/Footer"
// Correctly importing jwt-decode
import Link from "next/link"; // Importing Link from next/link for client-side navigation

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Using Next.js router

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    try {
      const body = { email, password };
      console.log("Sending request with body:", body);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      console.log("Response:", parseRes); // Debugging response

      if (parseRes.token) {
        console.log("Received token:", parseRes.token); // Debugging received token
        localStorage.setItem("token", parseRes.token);

        const role_id = parseRes.role_id;
        console.log("Role ID:", role_id); // Debugging decoded token
        

        if (role_id === 2) {
          router.push("/dashboard"); // Navigate to dashboard for role 2
        } else if (role_id === 1) {
          router.push("/driver"); // Navigate to home for role 1
        } else {
          alert("Successful login but unknown role");
        }
      } else {
        alert("Login failed, please check your credentials.");
      }
    } catch (err) {
      console.error("Error during login:", err.message);
    }
  };

  return (
    <Fragment>
      {/* <div> */}
        {/* <Navbar2/> */}
      <div className={styles.login_container}>
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
          <div className="text-[20px] text-white tracking-widest m-24 font-bold text-center">
            Where Finding Parking is a Breeze
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
            <div className="py-7">
              <h1 className="text-[23px] mb-2 text-center" style={{ fontWeight: 'bold', color:'#ffb403' }}>Hello there!</h1> 
              <h1 className="text-2xl font-extrabold text-center">Log In</h1>
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
                <button type="submit" className={styles.button}>
                  Login
                </button>
              </form>
            </div>

            <div className="text-center mt-3">
              <p>
                Don't have an account?{" "}
                <a href="/select-user" className="text-blue-600">

                  Register
                </a>
              </p>
            </div>
          </div>
        </div>
        
      </div>
      {/* <Footer/> */}
      {/* </div> */}
    </Fragment>
  );
};

export default Login;
