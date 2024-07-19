// import Image from "next/image";
// import styles from "./driver.module.css";
'use client'
import Navbar from "@/ui/homenavbar/homenavbar";
import DriverSearch from "@/ui/driversearch/driversearch";
import GoogleMapSection from "@/ui/googlemapsection/googlemapsection";
import { useState } from "react";
import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DestinationContext';
import { LoadScript } from "@react-google-maps/api";


// export const metadata = {
// title: "Park with Ease",
// description: "Drivers",
// };

const DriverPage = () => {

    const [source, setSource]=useState([]);
    const [destination, setDestination]=useState([]);

    return (
        <SourceContext.Provider value={{source, setSource}}>
            <DestinationContext.Provider value={{destination, setDestination}}>
                <div>
                    <Navbar />
                    <LoadScript 
                    libraries={['places']}
                    googleMapsApiKey={"AIzaSyAQzkKKubDkwzdBGhdUWrPoiQEuOzxpH4M"}>
                    <div className='p-6 grid grid-cols-1 md:grid-cols-3 gap-5'>
                        <div>
                            <DriverSearch />
                        </div>
                        <div className='cols-span-2'>
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