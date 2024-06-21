// app/login/page.jsx

// Mark this component as a Client Component
"use client";

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
      <div className="login-container">
        <h1 className='text-center mt-4'>PMC Login</h1>
        <form onSubmit={onSubmit}>
          <input
            type='email'
            name='email'
            placeholder='Email'
            className='form-control my-3'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            className='form-control my-3'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button className='btn btn-success btn-block'>Login</button>
        </form>
        <div className="text-center mt-3">
          <a href="/register">Register</a> {/* Using <a> for navigation */}
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
