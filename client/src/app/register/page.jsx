// app/register/page.jsx

// Mark this component as a Client Component
"use client";

import { Fragment, useState } from 'react';
import { useRouter } from 'next/navigation'; // Importing Next.js router for navigation
import Link from 'next/link'; // Importing Next.js Link for routing


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
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
      <h1 className='text-center my-5'>PMC Registration</h1>
      <form type="submit" onSubmit={onSubmitForm}>
        <input
          type="email"
          placeholder='email'
          name='email'
          className='form-control my-3'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder='password'
          name='password'
          className='form-control my-3'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder='name'
          name='name'
          className='form-control my-3'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button className='btn btn-success btn-block mt-2 '>Register</button>
      </form>
      <p className='mt-2'>Already have an account? <Link href="/login">Login</Link></p>
    </Fragment>
  );
};

export default Register;
