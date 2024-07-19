import React, { useState } from 'react';
import { VehicleListData } from '@/utils/vehicleList';
import VehicleListItem from '@/ui/vehiclelistitem/vehiclelistitem';
// import { useRouter } from 'next/router';

const DriverVehicleList = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    // const router = useRouter();

    return (
        <div className='mt-3 p-5 overflow-auto h-[250px]'>
            <h2 className='text-[22px] font-bold'>Choose your ride</h2>
            {VehicleListData.map((item, index) => (
                <div
                    key={index}
                    className={`cursor-pointer p-2 rounded-md border-black ${activeIndex === index ? 'border-[2px]' : ''}`}
                    onClick={() => {
                        setActiveIndex(index);
                        setSelectedVehicle(item);
                    }}
                >
                    <VehicleListItem vehicle={item} />
                </div>
            ))}

            {selectedVehicle?.name && (
                <div className='flex justify-between fixed bottom-5 bg-white p-3 shadow-xl rounded-lg w-full md:w-[30%] border-[1px] items-center'>
                    <h2>Make Payment For</h2>
                    <button
                        className='p-3 bg-black text-white rounded-lg text-center'
                        // onClick={() => router.push('/payment')}
                    >
                        Select {selectedVehicle.name}
                    </button>
                </div>
            )}
        </div>
    );
};

export default DriverVehicleList;
