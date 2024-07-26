import React, { useState , useEffect, useContext } from 'react';
import ParkingItem from "@/ui/parkingitem/parkingitem";
import ShimmerEffectItem from "@/ui/shimmereffectitem/shimmereffectitem";
import { SelectedParkingContext } from "@/context/SelectedParkingContext";

function ParkingList({ parkingListData }) {
    const [count, setCount] = useState(0);
    const [loader, setLoader] = useState(true);
    const {selectedParking,setSelectedParking}=useContext(SelectedParkingContext);
    // console.log("ParkingList", parkingListData);

    useEffect(() => {
        setInterval(() => {
            setLoader(false)
        }, 1000)
    }, [])

    useEffect(() => {
        setLoader(true);
        setCount(0);
    }, [parkingListData])

    return (
        <div className='p-2 md:pd-6 border-[2px] rounded-xl mb-3'>
            <h2 className='text-[20px] font-bold mb-3 items-center mt-3 flex justify-between'>Top Nearby Parking Spaces
                <span className='flex'>
                    {count > 0 ? <svg xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        onClick={() => setCount(count - 3)}
                        className="w-10 h-10 p-2 text-gray-400 hover:text-yellow-500 hover:bg-yellow-300 cursor-pointer rounded-lg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg> : null}

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        onClick={() => setCount(count + 3)}
                        className="w-10 h-10 p-2 text-gray-400 hover:text-yellow-500 hover:bg-yellow-300 cursor-pointer rounded-lg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </span>
            </h2>
            {!loader ? <div>
                {parkingListData.map((parking, index) =>
                    index >= count && index < count + 3 && (
                        <div key={index} className={`cursor-pointer rounded-2xl
                            ${selectedParking.name==parking.name?'bg-slate-300':null}`}
                            onClick={()=>setSelectedParking(parking)} >
                            <ParkingItem parking={parking} />
                        </div>
                    ))}

            </div> : null}
            {loader ? [1, 2, 3].map((item, index) => (
                <ShimmerEffectItem key={index} />
            )) : null}
        </div>
    );
};

export default ParkingList;