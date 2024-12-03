"use client";
import styles from "../profile/page.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Ensure this import is correct
import Navbar from "../../../ui/homenavbar/homenavbar";
import PaymentCard from "@/ui/paymentcard/paymentcard";
import Button from "@/ui/button/button";
import { faBucket } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  // const [vehicleDetails, setVehicleDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const router = useRouter();
  const [parkingAnalytics, setParkingAnalytics] = useState(null); // New state for parking analytics

  // const getImageUrl = (typeId) => {
  //   switch (typeId) {
  //     case 1:
  //       return "/images/car.png";
  //     case 2:
  //       return "/images/motorcycle.png";
  //     case 3:
  //       return "/images/threewheel.jpg";
  //     case 4:
  //       return "/images/large_vehicle.jpg";
  //     default:
  //       return "/images/default_vehicle.jpg"; // Fallback image
  //   }
  // };

  // const fetchVehicles = async () => {
  //   try {
  //     const token = localStorage.getItem("token");

  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_KEY}/vehicle`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           token: token, // Use 'Authorization' instead of 'token'
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch vehicles");
  //     }

  //     const data = await response.json();
  //     setVehicleDetails(data.data); // Ensure the correct data path and default to an empty array
  //     // console.log("Maru details bn",data.data)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/driver/details`,
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
        setUserDetails(parseRes.data);
      } else {
        console.error("Can't get the details");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchParkingAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/driver/parking-analytics`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setParkingAnalytics(data.data);
      } else {
        console.error("Failed to fetch parking analytics");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchParkingAnalytics();
  }, []);

  // Handle case where userDetails is still null
  if (!userDetails || !parkingAnalytics) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <div className="container mx-auto my-4 p-2">
        {/* <h1 className="mb-4 text-lg font-bold">Driver Profile</h1> */}
        <div className="md:flex no-wrap md:-mx-2  ">
          {/* Left Side */}
          <div className="w-full md:w-3/12 md:mx-2">
            {/* Profile Card */}
            <div className="bg-white p-3 border-t-4 border-yellow-400 rounded-xl">
              {/* <div className="image overflow-hidden">
                <img className="h-auto w-full mx-auto rounded-full"
                  src="/images/binura.jpg"
                  alt="Profile" />
              </div> */}
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1 mt-3">
                {userDetails.fname} {userDetails.lname}
              </h1>
              {/* <p className="text-sm text-gray-500 hover:text-yellow-600 leading-6">Hello, I'm thrilled to be a part of this wonderful app! As a new driver here, I'm genuinely
                impressed</p> */}
              <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>Status</span>
                  <span className="ml-auto">
                    <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                      Active
                    </span>
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span>Member since</span>
                  <span className="ml-auto">
                    {new Date(userDetails.registered_at).toLocaleDateString(
                      "en-GB"
                    )}
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <Button
                    label="Delete Account"
                    type="submit"
                    icon={faBucket}
                  />
                </li>
              </ul>
            </div>
            {/* End of profile card */}
            <div className="my-4"></div>
            {/* Friends card */}
            {/* <div className="bg-white p-3 hover:shadow rounded-xl"> */}
            {/* <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                <span className="text-green-500">
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zm-2 2a2 2 0 100 4 2 2 0 000-4zm-2-2a2 2 0 100 4 2 2 0 000-4zm-4-2a2 2 0 100 4 2 2 0 000-4zm0 6a2 2 0 100 4 2 2 0 000-4z"
                    />
                  </svg>
                </span>
                <span>Vehicles</span>
              </div> */}
            {/* <div className="grid grid-cols-3">
                {Array.isArray(vehicleDetails) &&
                  vehicleDetails.map((vehicle, index) => (
                    <div key={index} className="text-center my-2">
                      <img
                        className="h-16 w-16 rounded-3xl mx-auto"
                        src={getImageUrl(vehicle.type_id)}
                        alt={`${vehicle.name} Image`}
                      />
                      <a href="#" className="text-main-color">
                        {vehicle.name}
                      </a>
                    </div>
                  ))}
              </div> */}
            {/* </div> */}
            {/* End of friends card */}
            <div className="bg-white p-3 shadow-sm rounded-xl">
              <h1 className="mb-2 text-lg font-bold">Parking Details</h1>
              <div className="">
                {/* <div className="bg-white p-2 rounded-lg shadow-md"> */}
                {/* <h2 className="font-semibold mb-2">Summary</h2> */}
                <div className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <div className="flex items-center py-3">
                    <span>Total Times Parked:&nbsp; </span>
                    <span>{parkingAnalytics.total_times_parked} Times</span>
                  </div>
                  <div className="flex items-center py-3">
                    <span>Average Parking Time:&nbsp; </span>
                    <span>
                      {Math.floor(parkingAnalytics.average_parking_time / 60)}{" "}
                      mins
                    </span>
                  </div>
                </div>
                {/* </div> */}

                {/* <div className="bg-white p-2 rounded-lg shadow-md"> */}
                {/* <h2 className="font-semibold mb-2">Cost Details</h2> */}
                <div className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <div className="flex items-center py-3">
                    <span>Total Cost for Parkings:&nbsp; </span>
                    <span>Rs. {parkingAnalytics.total_cost_for_parking}/=</span>
                  </div>
                  <div className="flex items-center py-3">
                    <span>Average Cost for:      &nbsp;   &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;   </span>
                    <span>
                      Rs. {Number(parkingAnalytics.average_cost_for_parking).toFixed(2)}/=
                          </span>


                  </div>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
          {/* Right Side */}
          <div className="w-full md:w-9/12 mx-2 h-64">
            {/* Profile tab */}
            {/* About Section */}
            <div className="bg-white p-3 shadow-sm rounded-xl ">
              {/* <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span clas="text-green-500">
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
              </div> */}
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-md">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">First Name</div>
                    <div className="px-4 py-2">{userDetails.fname}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Last Name</div>
                    <div className="px-4 py-2">{userDetails.lname}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Gender</div>
                    <div className="px-4 py-2">{userDetails.gender}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                    <div className="px-4 py-2">{userDetails.contact}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Current Address
                    </div>
                    <div className="px-4 py-2">
                      {userDetails.addressno}, {userDetails.street_1},{" "}
                      {userDetails.street_2}, {userDetails.city}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Hometown</div>
                    <div className="px-4 py-2">{userDetails.province}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Email</div>
                    <div className="px-4 py-2">
                      <a
                        className="text-blue-800"
                        href="mailto:jane@example.com"
                      >
                        {userDetails.email}
                      </a>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">NIC</div>
                    <div className="px-4 py-2">{userDetails.nic}</div>
                  </div>
                </div>
              </div>
            </div>
            {/* End of about section */}

            <div className="my-4"></div>

            <div className="grid grid-cols-2 gap-3">
              <PaymentCard
                image="https://img.freepik.com/free-photo/3d-cryptocurrency-rendering-design_23-2149074564.jpg?t=st=1724691943~exp=1724695543~hmac=ee0dcdc4de41b24cf25b5322c89d040999556e598877c16ac5df2801e6e8f85b&w=996"
                title="PayPark Wallet"
                description="PayPark Wallet is a secure and convenient digital wallet designed specifically for parking payments within the PayPark platform. Easily top up your wallet using your credit or debit cards and use the balance to pay for parking at various locations."
                link="/driver/wallet"
                currency="LKR"
              />

              <PaymentCard
                image="https://img.freepik.com/free-vector/credit-card-digital-concept-background_1017-36143.jpg?t=st=1724692168~exp=1724695768~hmac=14640616327ef182bb5a88bcce48be7c28510f8d16c56f094b7f5fea2fe46205&w=996"
                title="Payment Options"
                description="Securely save your credit/debit card details for quick and seamless payments. Once saved, there's no need to re-enter card information for every transaction, making it easier and faster to top up your wallet and pay for parking."
                link="/driver/driver-cards"
              />
            </div>

            {/* <div className="my-4"></div> */}

            {/* Experience and education */}

            {/* End of profile tab */}
          </div>
        </div>
      </div>
      <div className="my-4"></div>
    </div>
  );
};

export default Profile;
