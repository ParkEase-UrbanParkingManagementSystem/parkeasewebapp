import React, { useContext, useEffect, useState } from "react";
import { DirectionsRenderer, GoogleMap, MarkerF, InfoBox, useJsApiLoader, OverlayViewF, OverlayView } from '@react-google-maps/api';
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import { SelectedParkingContext } from "@/context/SelectedParkingContext";
import { ParkingListContext } from "@/context/ParkingListContext";

const GoogleMapSection = () => {
    const containerStyle = {
        width: window.innerWidth,
        height: '100vh'
    };

    const { source } = useContext(SourceContext);
    const { destination } = useContext(DestinationContext);
    const { userLocation } = useContext(UserLocationContext);
    const { selectedParking } = useContext(SelectedParkingContext);
    const { parkingList } = useContext(ParkingListContext);

    const [center, setCenter] = useState({ lat: userLocation.lat, lng: userLocation.lng });
    const [directionRoutePoints, setDirectionRoutePoints] = useState(null);
    const { isLoaded } = useJsApiLoader({ googleMapsApiKey: "AIzaSyBoxehPHj1ptymdJCDWBbbzFYC-ccf-1uQ" });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setCenter({ lat: latitude, lng: longitude });
            }, (error) => {
                console.error("Error getting location: ", error);
            });
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    useEffect(() => {
        if (source && destination && isLoaded) {
            const DirectionService = new google.maps.DirectionsService();
            DirectionService.route({
                origin: source,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING
            }, (results, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    setDirectionRoutePoints(results);
                    const routeCenter = {
                        lat: (results.routes[0].bounds.getNorthEast().lat() + results.routes[0].bounds.getSouthWest().lat()) / 2,
                        lng: (results.routes[0].bounds.getNorthEast().lng() + results.routes[0].bounds.getSouthWest().lng()) / 2
                    };
                    setCenter(routeCenter);
                } else {
                    console.error('Error fetching directions', results);
                }
            });
        }
    }, [source, destination, isLoaded]);

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={selectedParking.name ? 15 : 10}
        >
            {directionRoutePoints && <DirectionsRenderer directions={directionRoutePoints} />}
            {parkingList && parkingList.map((parking, index) => (
                <MarkerF
                    key={index}
                    position={parking.geometry.location}
                    icon={{
                        url: "/images/parking.png",
                        scaledSize: { width: 50, height: 50 }
                    }}
                >
                    <InfoBox position={parking.geometry.location}>
                        <div
                            style={{
                                backgroundColor: "black",
                                opacity: 0.75,
                                padding: 5,
                                color: "white",
                                borderRadius: 5
                            }}
                        >
                            <div style={{ fontSize: 12, fontColor: "#FFFFFF" }}>
                                {parking.name}
                            </div>
                        </div>
                    </InfoBox>
                </MarkerF>
            ))}
            {userLocation.length != []? <MarkerF
                position={userLocation}
                icon={{
                    url: "/images/locator.png",
                    scaledSize: { width: 50, height: 50 }
                }}
            >
            <OverlayViewF
                position={{ lat: userLocation.lat, lng: userLocation.lng }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
                <div className="p-2 font-bold inline-block rounded-md bg-slate-300">
                    <p className='text-black'>You are here</p>
                </div>
            </OverlayViewF>
            </MarkerF>:null}
        </GoogleMap>
    );
};

export default GoogleMapSection;