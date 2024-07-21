'use client';
import React, { useContext, useEffect, useState } from "react";
import InputItem from "@/ui/inputitem/inputitem";
import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DestinationContext';
import DriverVehicleList from '@/ui/drivervehiclelist/drivervehiclelist';

const DriverSearch = () => {
    
    const {source, setSource}=useContext(SourceContext);
    const {destination, setDestination}=useContext(DestinationContext);
    const [distance, setDistance]=useState();


    //To calculate the distance between two locations
    const calculateDistance=()=>{
        const dist=google.maps.geometry.spherical.computeDistanceBetween(
            {lat:source.lat,lng:source.lng},
            {lat:destination.lat,lng:destination.lng}
        )
        // console.log(dist);
        setDistance(dist)
    }

    useEffect(()=>{
        if(source){
            console.log(source);
        }
        if(destination){
            console.log(destination);
        }
    },[source,destination])

    return(
        <div>
        <div className='p-2 md:pd-6 border-[2px] rounded-xl'>
            <p className='text-[20px] font-bold'>Find Parking</p>
            <InputItem type='source'/>
            <InputItem type='destination'/>
            <button className='p-2 w-full mt-3 text-white rounded-lg' style={{ backgroundColor: '#ffb403' }}
            onClick={()=>calculateDistance()}
            >Search</button>
        </div>
        {distance?<DriverVehicleList />:null}
        </div>
        
    );
};

export default DriverSearch