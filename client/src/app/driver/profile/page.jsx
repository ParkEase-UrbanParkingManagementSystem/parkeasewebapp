"use client";
import styles from "../profile/page.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Ensure this import is correct
import Navbar from '../../../ui/homenavbar/homenavbar';


const Profile = () => {
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const router = useRouter();

  const getImageUrl = (typeId) => {
    switch(typeId) {
      case 1:
        return "/images/car.png";
      case 2:
        return "/images/motorcycle.png";
      case 3:
        return "/images/threewheel.jpg";
      case 4:
        return "/images/large_vehicle.jpg";
      default:
        return "/images/default_vehicle.jpg"; // Fallback image
    }
  };

  const fetchVehicles = async () => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/vehicle`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                token:token // Use 'Authorization' instead of 'token'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch vehicles');
        }

        const data = await response.json();
        setVehicleDetails(data.data);  // Ensure the correct data path and default to an empty array
        // console.log("Maru details bn",data.data)
    } catch (error) {
        console.error(error);
    }
};

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/driver/details`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token
        }
      });

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

  useEffect(() => {
   
    fetchVehicles();
    fetchUserDetails();
  }, []);

  // Handle case where userDetails is still null
  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
        <Navbar/>
        <div className="container mx-auto my-5 p-2">
            <h1 className="mb-2 text-lg font-bold">Driver Profile</h1>
                    <div className="md:flex no-wrap md:-mx-2 ">
                        {/* Left Side */}
                        <div className="w-full md:w-3/12 md:mx-2">
                            {/* Profile Card */}
                            <div className="bg-white p-3 border-t-4 border-yellow-400">
                                <div className="image overflow-hidden">
                                    <img className="h-auto w-full mx-auto rounded-full"
                                        src="/images/binura.jpg" 
                                        alt="Profile" />
                                </div>
                                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1 mt-3">{userDetails.fname} {userDetails.lname}</h1>
                                <p className="text-sm text-gray-500 hover:text-yellow-600 leading-6">Hello, I'm thrilled to be a part of this wonderful app! As a new driver here, I'm genuinely 
                                    impressed</p>
                                <ul
                                    className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                    <li className="flex items-center py-3">
                                        <span>Status</span>
                                        <span className="ml-auto"><span
                                            className="bg-yellow-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                                    </li>
                                    <li className="flex items-center py-3">
                                        <span>Member since</span>
                                        <span className="ml-auto">July 28, 2024</span>
                                    </li>
                                </ul>
                            </div>
                            {/* End of profile card */}
                            <div className="my-4"></div>
                            {/* Friends card */}
                            <div className="bg-white p-3 hover:shadow">
                                <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                                    <span className="text-green-500">
                                        <svg className="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zm-2 2a2 2 0 100 4 2 2 0 000-4zm-2-2a2 2 0 100 4 2 2 0 000-4zm-4-2a2 2 0 100 4 2 2 0 000-4zm0 6a2 2 0 100 4 2 2 0 000-4z" />
                                        </svg>
                                    </span>
                                    <span>Vehicles</span>
                                </div>
                                <div className="grid grid-cols-3">
                                    {Array.isArray(vehicleDetails) && vehicleDetails.map((vehicle, index) => (
                                        <div key={index} className="text-center my-2">
                                        <img
                                            className="h-16 w-16 rounded-3xl mx-auto"
                                            src={getImageUrl(vehicle.type_id)}
                                            alt={`${vehicle.name} Image`}
                                        />
                                        <a href="#" className="text-main-color">{vehicle.name}</a>
                                        </div>
                                    ))}
                                    </div>
                            </div>
                            {/* End of friends card */}
                        </div>
                        {/* Right Side */}
                        <div className="w-full md:w-9/12 mx-2 h-64">
                            {/* Profile tab */}
                            {/* About Section */}
                            <div className="bg-white p-3 shadow-sm rounded-sm">
                                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                    <span clas="text-green-500">
                                        <svg className="h-5"
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M10 20l-5.88-6.02A7.97 7.97 0 014 8.35c0-4.42 3.58-8 8-8s8 3.58 8 8c0 2.15-.84 4.1-2.12 5.57L14 14M14 14v6m0 0h4m-4 0H6" />
                                        </svg>
                                    </span>
                                    <span className="tracking-wide">About</span>
                                </div>
                                <div className="text-gray-700">
                                    <div className="grid md:grid-cols-2 text-sm">
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
                                            <div className="px-4 py-2 font-semibold">Current Address</div>
                                            <div className="px-4 py-2">{userDetails.addressno}, {userDetails.street_1}, {userDetails.street_2}, {userDetails.city}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Hometown</div>
                                            <div className="px-4 py-2">{userDetails.province}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Email.</div>
                                            <div className="px-4 py-2">
                                                <a className="text-blue-800" href="mailto:jane@example.com">{userDetails.email}</a>
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

                            {/* Experience and education */}
                            <div className="bg-white p-3 shadow-sm rounded-sm">
  <h1 className="mb-2 text-lg font-bold">Parking Details</h1>
  <div className="grid grid-cols-1 gap-4 p-4">
    <div className="bg-white p-2 rounded-lg shadow-md">
      <h2 className="font-semibold mb-2">Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Total Times Parked:</span>
          <span>167 Times</span>
        </div>
        <div className="flex justify-between">
          <span>Average Parking Time:</span>
          <span>52 mins</span>
        </div>
        <div className="flex justify-between">
          <span>Average Parkings in a Month:</span>
          <span>11 Times</span>
        </div>
        <div className="flex justify-between">
          <span>Total Parkings This Month:</span>
          <span>14 Times</span>
        </div>
      </div>
    </div>

    <div className="bg-white p-2 rounded-lg shadow-md">
      <h2 className="font-semibold mb-2">Cost Details</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Total Cost for Parkings:</span>
          <span>Rs. 9573.00/=</span>
        </div>
        <div className="flex justify-between">
          <span>Average Cost for a Month:</span>
          <span> Rs. 1973.25/=</span>
        </div>
      </div>
    </div>
  </div>
</div>

                            {/* End of profile tab */}
                        </div>
                    </div>
                </div>
            </div>
      
   
  );
};







export default Profile;


