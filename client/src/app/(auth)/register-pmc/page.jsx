"use client";
import styles from "./register.module.css";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Register = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [regNo, setRegNo] = useState("");
  const [addressNo, setAddressNo] = useState("");
  const [street1, setStreet1] = useState("");
  const [street2, setStreet2] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [sector, setSector] = useState("");
  const [cmc, setCmc] = useState("Colombo");

  const router = useRouter();

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
    newErrors.name = validateField(name, "Name");
    newErrors.contact = validateField(contact, "Contact Number");
    newErrors.regNo = validateField(regNo, "Business Registration Number");

    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (sector === "") {
      setErrors({ sector: "Please select your PMC sector." });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateStep3 = () => {
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
    } else if (step === 3) {
      isValid = validateStep3();
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

    if (!validateStep3()) return;

    try {
      const body = {
        email,
        password,
        name,
        contact,
        regNo,
        sector,
        cmc,
        addressNo,
        street1,
        street2,
        city,
        district,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/auth/registerPMC`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        alert("Registration successful. Please log in.");
        router.push("/login");
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
          <div className="flex text-[20px] text-white tracking-widest m-5 font-bold text-center max-w-[600px]">
            Optimized parking solutions to manage your business better
          </div>
          <div className="justify-self-center">
            <Image
              src="/images/extra.png"
              alt="Description of the image"
              width={400}
              height={400}
              className={styles.image}
            />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.center}>
            <div className="pb-3">
              <h1 className="text-center text-3xl font-extrabold">Signup</h1>
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
                    <div className="text-red-500 text-xs">{errors.email}</div>
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
                    <div className="text-red-500 text-xs">{errors.password}</div>
                  )}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      className="form-control my-2 w-96"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && (
                    <div className="text-red-500 text-xs">{errors.name}</div>
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
                    <div className="text-red-500 text-xs">{errors.contact}</div>
                  )}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Business Registration Number"
                      name="regNo"
                      className="form-control my-2 w-96"
                      value={regNo}
                      onChange={(e) => setRegNo(e.target.value)}
                    />
                    {errors.regNo && (
                    <div className="text-red-500 text-xs">{errors.regNo}</div>
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
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 style={{ fontWeight: "bold", color: "#ffb403" }}>
                    PMC Sector:
                  </h2>
                  <select
                    name="sector"
                    className="form-control my-2 w-96"
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                  >
                    <option value="" disabled>Select Sector</option>
                    <option value="Public">Public (Registered Under MC)</option>
                    <option value="Private">Private</option>
                  </select>
                  {errors.sector && (
                    <div className="text-red-500 text-xs">{errors.sector}</div>
                  )}
                  {sector === "Public" && (
                    <div>
                      <h2 style={{ fontWeight: "bold", color: "#ffb403" }}>
                        MC Selection:
                      </h2>
                      <select
                        name="cmc"
                        className="form-control my-2 w-96"
                        value={cmc}
                        disabled
                      >
                        <option value="Colombo">Colombo</option>
                      </select>
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-3 space-x-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className={styles.button}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className={styles.button}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
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
                    <div className="text-red-500 text-xs">{errors.addressNo}</div>
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
                    <div className="text-red-500 text-xs">{errors.street1}</div>
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
                    <div className="text-red-500 text-xs">{errors.city}</div>
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
                    <div className="text-red-500 text-xs">{errors.district}</div>
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
                    <button
                      type="submit"
                      className={styles.button}
                    >
                      Regsiter
                    </button>
                  </div>
                </div>
              )}
            </form>
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
    </Fragment>
  );
};

export default Register;
