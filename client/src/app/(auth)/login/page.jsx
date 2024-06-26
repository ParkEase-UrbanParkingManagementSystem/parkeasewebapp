// app/login/page.jsx

// Mark this component as a Client Component
"use client";
import styles from "./login.module.css";

import { Fragment, useState } from 'react';
import { useRouter } from 'next/navigation'; // Importing Next.js router for navigation


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

           <div>Your Gateway to Hassle-free parking</div>

        </div>

      <div className={styles.right}>  

        <div className={styles.center}>    

        <div className="items-start border-4">
        <h1 className='text-center mt-4 text-2xl'>Log In</h1>
        </div>
        <form onSubmit={onSubmit}>
          <input
            type='email'
            name='email'
            placeholder='Email'
            className='form-control my-3 w-96'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            className='form-control my-3 w-96'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button className='btn btn-success btn-block'>Login</button>
        </form>
        <div className="text-center mt-3">
          <p>Don't have an account? <a href="/register">Register</a></p> {/* Using <a> for navigation */}
        </div>
      </div>
      </div>  
      </div>
    </Fragment>
  );
}

export default Login;
