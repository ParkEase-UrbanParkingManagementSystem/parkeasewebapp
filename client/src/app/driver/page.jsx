// import Image from "next/image";
// import styles from "./driver.module.css";
'use client'
import Navbar from "@/ui/homenavbar/homenavbar";
import DriverSearch from "@/ui/driversearch/driversearch";
import GoogleMapSection from "@/ui/googlemapsection/googlemapsection";
import { useState, useEffect } from "react";
import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DestinationContext';
import { LoadScript } from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { useAuth } from '@/utils/authContext';
import QRCode from 'qrcode.react';

const DriverPage = () => {
    const [userDetails, setUserDetails] = useState(null);
    const router = useRouter();

    useEffect(() => {
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

        fetchUserDetails();
    }, [router]);

    const [source, setSource] = useState([]);
    const [destination, setDestination] = useState([]);

    return (
        <SourceContext.Provider value={{ source, setSource }}>
            <DestinationContext.Provider value={{ destination, setDestination }}>
                <div>
                    <Navbar />
                    <LoadScript
                        libraries={['places']}
                        googleMapsApiKey={"AIzaSyAQzkKKubDkwzdBGhdUWrPoiQEuOzxpH4M"}>
                        <div className='p-6 grid grid-cols-1 md:grid-cols-3 gap-5 '>
                            <div className="">
                                <div className="p-1 mb-3 text-2xl font-bold">
                                    Hello {userDetails?.fname},
                                </div>
                                <DriverSearch />
                            </div>
                            <div className='cols-span-2 p-2 '>
                                <GoogleMapSection />
                            </div>
                        </div>
                    </LoadScript>
                </div>
            </DestinationContext.Provider>
        </SourceContext.Provider>
    );
};

export default DriverPage;
