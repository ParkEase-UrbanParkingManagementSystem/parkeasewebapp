import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { SelectedParkingContext } from '@/context/SelectedParkingContext'

const ParkingToast = ({ userLocation }) => {
    const { selectedParking, setSelectedParking } = useContext(SelectedParkingContext);
    // const { userLocation, setUserLocation } = useContext(UserLocationContext);
    const [distance, setDistance] = useState();
    useEffect(() => {
        if (selectedParking.name) {
            calculateDistance(
                selectedParking.geometry.location.lat,
                selectedParking.geometry.location.lng
                , userLocation.lat,
                userLocation.lng
            )
        }
    }, [selectedParking])


    const calculateDistance = (lat1, lon1, lat2, lon2) => {

        const earthRadius = 6371; // in kilometers

        const degToRad = (deg) => {
            return deg * (Math.PI / 180);
        };

        const dLat = degToRad(lat2 - lat1);
        const dLon = degToRad(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = earthRadius * c;

        setDistance(distance.toFixed(1))
        return distance.toFixed(2); 
    };

    const onDirectionClick = () => {
        window.open('https://www.google.com/maps/dir/?api=1&origin=' +
            userLocation.lat + ',' + userLocation.lng + '&destination='
            + selectedParking.geometry.location.lat
            + ',' + selectedParking.geometry.location.lng + '&travelmode=driving')
    }

    return (
        <>
            {selectedParking.name ? <div className='fixed bottom-3 right-3 z-30
    flex items-center bg-black p-3 rounded-2xl gap-5'>
                <div>
                    <h2 className='font-semibold
            text-yellow-600 text-[20px]'>{selectedParking.name}</h2>
                    <h2 className='text-yellow-600'>{distance} Kilometers away</h2>
                </div>
                <div className='bg-black p-5 rounded-xl
        hover:scale-105 transition-all cursor-pointer'
                    onClick={() => onDirectionClick()}>
                    <Image src='/images/send.png'
                        alt='nav'
                        width={20}
                        height={20}
                    />
                </div>
            </div> : null}
        </>
    )
}

export default ParkingToast;