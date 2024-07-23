import React from 'react';
import Image from 'next/image';

const VehicleListItem = ({ vehicle }) => {
    let imageSrc = '';

    switch (vehicle.type_id) {
        case 1:
            imageSrc = '/images/car.png';
            break;
        case 2:
            imageSrc = '/images/motorcycle.png';
            break;
        case 3:
            imageSrc = '/images/tuktuk.png';
            break;
        case 4:
            imageSrc = '/images/lorry.png';
            break;
        default:
            imageSrc = '/images/default.jpg'; // Fallback image
            break;
    }
    
    return (
        <div>
            <div className='flex items-center justify-between mt-2 border-t border-b'>
                <div className='flex items-center gap-5'>
                    <Image 
                        src={imageSrc} 
                        width={100} 
                        height={100} 
                        alt={`${vehicle.name} image`} 
                    />
                    <div>
                        <h2 className='font-semibold text-[18px]'>{vehicle.name}</h2>
                        <p>{vehicle.vehicle_number}</p>
                    </div>
                </div>
                <h2 className='text-[15px] font-semibold'>Rs.{vehicle.amount} /h</h2>
            </div>
        </div>
    );
};

export default VehicleListItem;
