'use client';
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
    // States
    const [userDetails, setUserDetails] = useState(null);
    const [userLocation, setUserLocation] = useState([]);
    const [source, setSource] = useState([]);
    const [destination, setDestination] = useState([]);
    const [parkingList, setParkingList] = useState([]);
    const [selectedParking, setSelectedParking] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const router = useRouter();

    // Fetch user details
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
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };

        fetchUserDetails();
    }, [router]);

    // Fetch user location
    useEffect(() => {
        getUserLocation();
    }, []);

    const getUserLocation = () => {
        navigator.geolocation.getCurrentPosition(function (pos) {
            setUserLocation({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            });
        });
    };

    // Fetch nearby places
    useEffect(() => {
        if (userLocation)
            getNearByPlace('parking');
    }, [userLocation]);

    const getNearByPlace = (category) => {
        GlobalApi.getNearByPlace(category, userLocation?.lat, userLocation.lng)
            .then(resp => {
                setParkingList(resp.data.results);
            });
    };
 
    // Loading indicator
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <svg className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full" viewBox="0 0 24 24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8S4 16.418 4 12zm8-6a6 6 0 0 0-6 6 6 6 0 0 0 6 6 6 6 0 0 0 6-6 6 6 0 0 0-6-6z" />
                    </svg>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

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
                                            <div className="p-1 mt-2 mb-3 text-2xl font-bold" style={{ color: '#ffb403' }}> 
                                                Hello {userDetails?.fname}!
                                            </div>
                                            <CategoryList setSelectedCategory={(category) =>
                                                getNearByPlace(category)} />
                                            <ParkingList parkingListData={parkingList} />
                                        </div>
                                        <div className="col-span-1 p-2 mt-14">
                                            {userDetails?.isparked ? (
                                                
                                                <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                                                <p className="text-xl font-bold text-gray-800 mb-4">
                                                    You have already parked your vehicle.
                                                </p>
                                                <img
                                                        className="h-full w-full rounded-xl mt- 2 mb-3"
                                                        src="/images/pickparking.png"
                                                        alt=""
                                                    />
                                                <p className="text-gray-600">
                                                                Click the button below to see the details.
                                                            </p>
                                                            <div className="flex justify-center mt-1">
                                                            <a
                                                                href="/driver/parked-details"
                                                                className="inline-block mt-2 px-8 py-2 bg-[#FFB403] text-white font-semibold rounded-lg shadow-md hover:bg-[#e0a700] transition duration-300"
                                                            >
                                                                See Details
                                                            </a>
                                                            </div>
                                            </div>
                                            ) : (
                                                <DriverSearch />
                                            )}
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
