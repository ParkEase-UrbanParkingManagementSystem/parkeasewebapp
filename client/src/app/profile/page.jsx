"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import from 'next/navigation'
import styles from "./profile.module.css";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faPen);

const Profile = () => {
  const [pmcDetails, setPmcDetails] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPmcDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login"); // Redirect to login if no token found
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_KEY}/pmc/details`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );

        const parseRes = await response.json();

        if (response.ok) {
          setPmcDetails(parseRes.data);
        } else {
          console.error("Can't get the details");
          // router.push('/login'); // Redirect to login on error
        }
      } catch (err) {
        console.error(err.message);
        // router.push('/login'); // Redirect to login on error
      }
    };

    fetchPmcDetails();
  }, [router]);

  if (!pmcDetails) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  return (
    <div className={styles.container}>
      <div className="container mx-auto my-2 p-2  ">
        <h1 className="mb-3 text-lg font-bold "> </h1>
        <div className="md:flex no-wrap md:-mx-2 ">
          {/* Left Side */}
          <div className="w-full md:w-3/12 md:mx-2">
            {/* Profile Card */}
            <div className="bg-white p-3 border-t-4 border-yellow-400 rounded-xl">
              <div className="image overflow-hidden">
                <img
                  className="h-auto w-full mx-auto rounded-full"
                  src="/images/OIP.jpeg"
                  alt="Profile"
                />
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1 mt-3">
                {pmcDetails.pmc.name}
              </h1>

              <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>Member since</span>
                  <span className="ml-auto">{pmcDetails.pmc.registered_at}</span>
                </li>
              </ul>
            </div>
            {/* End of profile card */}
            <div className="my-4"></div>
            {/* Friends card */}
            <div className="bg-white p-3 hover:shadow rounded-xl">
              <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                <span className="text-yellow-500">
                  <svg
                    className="h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656-.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zm-2 2a2 2 0 100 4 2 2 0 000-4zm-2-2a2 2 0 100 4 2 2 0 000-4zm-4-2a2 2 0 100 4 2 2 0 000-4zm0 6a2 2 0 100 4 2 2 0 000-4z"
                    />
                  </svg>
                </span>
                <span>PMC Details</span>
              </div>
              <div className="py-2">
                <div className="text-gray-700">
                  <div className="py-1">
                    <span className="font-semibold">CEO/Owner Name:</span> Rajiv
                    Perera
                  </div>
                  <div className="py-1">
                    <span className="font-semibold">Key Personnel:</span>{" "}
                    Sanjeewa Kumar (CFO), Sumedha Dias (CTO)
                  </div>

                  <div className="py-1">
                    <span className="font-semibold">Operational Regions:</span>{" "}
                    Colombo
                  </div>
                </div>
              </div>
            </div>
            {/* End of friends card */}
          </div>
          {/* Right Side */}
          <div className="w-full md:w-9/12 mx-2 h-64">
            {/* Profile tab */}
            {/* About Section */}
            <div className="bg-white p-3 shadow-sm rounded-xl ">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span className="text-yellow-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 20l-5.88-6.02A7.97 7.97 0 014 8.35c0-4.42 3.58-8 8-8s8 3.58 8 8c0 2.15-.84 4.1-2.12 5.57L14 14M14 14v6m0 0h4m-4 0H6"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 ">PMC Name</div>
                    <div className="px-4 py-2 font-bold">
                      {pmcDetails.pmc.name}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 ">Registration Number</div>
                    <div className="px-4 py-2 font-bold">
                      {pmcDetails.pmc.regno}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 ">Company Sector</div>
                    <div className="px-4 py-2 font-bold">
                      {pmcDetails.pmc.sector}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 ">Email</div>
                    <div className="px-4 py-2 font-bold">
                      {pmcDetails.user.email}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 ">Contact No.</div>
                    <div className="px-4 py-2 font-bold">
                    {pmcDetails.user.contact}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 ">Current Address</div>
                    <div className="px-4 py-2 font-bold">
                      {pmcDetails.user.addressno}, {pmcDetails.user.street_1},{" "}
                      {pmcDetails.user.street_2}, {pmcDetails.user.city}.
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 ">District</div>
                    <div className="px-4 py-2 font-bold">
                      {pmcDetails.user.province}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End of about section */}

            <div className="my-4"></div>

            {/* Legal and Compliance Section */}
            <div className="bg-white p-3 shadow-sm rounded-xl">
              <h1 className="mb-2 text-lg font-bold">Legal and Compliance</h1>
              <div className="grid grid-cols-1 gap-4 p-4">
                <div className="bg-white p-2 rounded-lg shadow-md">
                  <h2 className="font-semibold mb-2">
                    Licenses and Certifications
                  </h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Parking Operation License:</span>
                      <span>Valid until Dec 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Health and Safety Certification:</span>
                      <span>Valid until Jun 2025</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-2 rounded-lg shadow-md">
                  <h2 className="font-semibold mb-2">Insurance Details</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>General Liability Insurance:</span>
                      <span>Coverage up to $1,000,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Worker's Compensation Insurance:</span>
                      <span>Coverage up to $500,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End of Legal and Compliance Section */}
            {/* End of profile tab */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
