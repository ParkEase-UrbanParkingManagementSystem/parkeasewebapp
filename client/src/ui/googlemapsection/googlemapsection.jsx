import React, { useContext, useEffect, useState } from "react";
import { DirectionsRenderer, GoogleMap, MarkerF, OverlayView, OverlayViewF, useJsApiLoader } from '@react-google-maps/api';
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";

const GoogleMapSection = () => {
const containerStyle = {
    width: '1050px',
    // width: '100%',
    height: window.innerWidth*0.45
};

const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523
});

// const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: "AIzaSyAQzkKKubDkwzdBGhdUWrPoiQEuOzxpH4M"
//     })

    const {source, setSource}=useContext(SourceContext);
    const {destination, setDestination}=useContext(DestinationContext);

    const [map, setMap] = React.useState(null)
    const [directionRoutePoints, setDirectionRoutePoints]=useState([]);

    useEffect(()=>{
        if(source?.length!=[]&&map)
        {
            map.panTo({
                lat:source.lat,
                lng:source.lng
            });
            
            setCenter({
                lat:source.lat,
                lng:source.lng
            });
        }

        if(source.length!=[]&&destination.length!=[])
        {
            directionRoute();
        }

    },[source])

    useEffect(()=>{
        if(destination?.length!=[]&&map)
        {
            setCenter({
                lat:destination.lat,
                lng:destination.lng
            })
        }

        if(source.length!=[]&&destination.length!=[])
        {
            directionRoute();
        }
    },[destination])

    const directionRoute=()=>{
        const DirectionService=new google.maps.DirectionsService();

        DirectionService.route({
            origin:{lat:source.lat,lng:source.lng},
            destination:{lat:destination.lat,lng:destination.lng},
            travelMode:google.maps.TravelMode.DRIVING
        },(results,status)=>{
            if(status===google.maps.DirectionsStatus.OK)
            {
                setDirectionRoutePoints(results)
            }else{
                console.error('Error');
            }
        })
    }

    const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
    }, [])

    return (
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{mapId:'b9ad85c8c6d5b6f2'}}
        >

            {source.length!=[]? <MarkerF
            position={{lat:source.lat,lng:source.lng}}
            icon={{
                url:"/images/target2.png",
                scaledSize:{
                    width:30,
                    height:30
                }
            }}
            >
                <OverlayViewF
                    position={{lat:source.lat,lng:source.lng}}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                    <div className="p-2 font-bold inline-block rounded-md" style={{ backgroundColor: '#ffb403' }}>
                        <p className='text-black'>{source.label}</p>
                    </div>
                </OverlayViewF>
            </MarkerF>:null}

            {destination.length!=[]? <MarkerF
            position={{lat:destination.lat,lng:destination.lng}}
            icon={{
                url:"/images/target2.png",
                scaledSize:{
                    width:30,
                    height:30
                }
            }}
            >

                <OverlayViewF
                    position={{lat:destination.lat,lng:destination.lng}}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                    <div className="p-2 font-bold inline-block rounded-md" style={{ backgroundColor: '#ffb403' }}>
                        <p className='text-black'>{destination.label}</p>
                    </div>
                </OverlayViewF>
            </MarkerF>:null}
            
            <DirectionsRenderer
                directions={directionRoutePoints}
                options={{
                    polylineOptions:{
                        strokeColor:'#000',
                        strokeWeight:5
                    },
                    suppressMarkers:true
                }}
            
            />
        </GoogleMap>
    )
};

export default GoogleMapSection;