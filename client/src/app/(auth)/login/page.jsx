"use client";

import styles from "./login.module.css";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setEmailError(false);
    setPasswordError(false);
    setIsLoading(true);

    if (!email) {
      setEmailError(true);
      setError("Please enter your email");
      setIsLoading(false);
      return;
    }

    if (!password) {
      setPasswordError(true);
      setError("Please enter your password");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        const role_id = parseRes.role_id;

        if (role_id === 2) {
          router.push("/dashboard");
        } else if (role_id === 1) {
          router.push("/driver");
        } else {
          setError("Successful login but unknown role");
        }
      } else {
        setError("Login failed, please check your credentials.");
        setEmailError(true);
        setPasswordError(true);
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
      console.error("Error during login:", err);
    }

    setIsLoading(false);
  };

  return (
    <Fragment>
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
            />
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
                  className={`form-control my-3 w-96 ${emailError ? 'border-red-500' : ''}`}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(false);
                  }}
                  value={email}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={`form-control my-3 w-96 ${passwordError ? 'border-red-500 bg-red-100' : ''}`}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(false);
                  }}
                  value={password}
                />
                <button type="submit" className={styles.button} disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </form>
            </div>

            {error && <div className="text-red-500 text-center mt-2  py-1 rounded-xl">{error}</div>}

            <div className="text-center mt-3">
              <p>
                Don't have an account?{" "}
                <Link href="/select-user" className="text-blue-600">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;

