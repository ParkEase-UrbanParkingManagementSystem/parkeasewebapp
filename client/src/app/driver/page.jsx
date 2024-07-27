// import Image from "next/image";
// import styles from "./driver.module.css";
'use client'
import Navbar from "@/ui/homenavbar/homenavbar";
import DriverSearch from "@/ui/driversearch/driversearch";
import CategoryList from "@/ui/categorylist/categorylist";
import ParkingList from "@/ui/parkinglist/parkinglist";
import GoogleMapSection from "@/ui/googlemapsection/googlemapsection";
import ParkingToast from "@/ui/parkingtoast/parkingtoast";
import { useState, useEffect } from "react";
import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DestinationContext';
import { UserLocationContext } from '@/context/UserLocationContext';
import { ParkingListContext } from '@/context/ParkingListContext';
import { SelectedParkingContext } from '@/context/SelectedParkingContext';
import { LoadScript } from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { useAuth } from '@/utils/authContext';
import QRCode from 'qrcode.react';
import GlobalApi from "@/services/GlobalApi";

const DriverPage = () => {

    //To get driver details
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

    //To get the user's current location
    const [userLocation, setUserLocation] = useState([]);

    useEffect(() => {
        getUserLocation();
    }, [])
    const getUserLocation = () => {
        navigator.geolocation.getCurrentPosition(function (pos) {
            console.log(pos);
            setUserLocation({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            })
        })
    }

    const [source, setSource] = useState([]);
    const [destination, setDestination] = useState([]);
    // const [radius, setRadius] = useState(25);
    const [parkingList, setParkingList] = useState([]);
    const [selectedParking,setSelectedParking]=useState([]);

    //To get nearby places
    useEffect(() => {
        if (userLocation)
            getNearByPlace('parking');


    }, [userLocation])

    const getNearByPlace = (category) => {
        GlobalApi.getNearByPlace(category, userLocation?.lat, userLocation.lng)
            .then(resp => {
                // console.log(resp.data.results);
                setParkingList(resp.data.results);
            })
    }


    // useEffect(()=>{
    //     getGooglePlace();
    // },[radius])
    // const getGooglePlace=()=>{
    //     GlobalApi.getGooglePlace(radius).then(resp=>{
    //         console.log(resp.data.product.results)
    //     })
    // }

    return (
        <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
            <SelectedParkingContext.Provider value={{ selectedParking, setSelectedParking }}>
                <ParkingListContext.Provider value={{ parkingList, setParkingList }}>
                    <SourceContext.Provider value={{ source, setSource }}>
                        <DestinationContext.Provider value={{ destination, setDestination }}>
                            <div>
                                <Navbar />
                                <LoadScript
                                    libraries={['places']}
                                    googleMapsApiKey={"AIzaSyAQzkKKubDkwzdBGhdUWrPoiQEuOzxpH4M"}>
                                    <div className='p-2 grid grid-cols-1 md:grid-cols-4 gap-2 '>
                                        <div className="col-span-1 p-2">
                                            <div className="p-1 mb-3 text-2xl font-bold">
                                                Hello {userDetails?.fname}!
                                            </div>
                                            <CategoryList setSelectedCategory={(category) =>
                                                getNearByPlace(category)} />
                                            <ParkingList parkingListData={parkingList} />
                                        </div>
                                        <div className="col-span-1 p-2 mt-14">
                                            <DriverSearch />
                                        </div>
                                        <div className='col-span-2 p-4 bg-white shadow-lg rounded-xl'>
                                            <div>
                                                <GoogleMapSection />
                                            </div>
                                            <ParkingToast userLocation={userLocation} />
                                            </div>

                                    </div>
                                </LoadScript>
                            </div>
                        </DestinationContext.Provider>
                    </SourceContext.Provider>
                </ParkingListContext.Provider>
            </SelectedParkingContext.Provider>
        </UserLocationContext.Provider>
    );
};

export default DriverPage;
