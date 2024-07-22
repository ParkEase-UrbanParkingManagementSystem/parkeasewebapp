import React from 'react'
import Image from 'next/image'

const VehicleListItem = ({vehicle}) => {
    return(
        <div>
            <div className='flex items-center justify-between mt-2 border-t border-b'>
                <div className='flex items-center gap-5'>
                    <Image src={vehicle.image} 
                    width={100} height={100}/>
                        <div>
                            <h2 className='font-semibold text-[18px]'>{vehicle.name}</h2>
                            <p>{vehicle.numberplate}</p>
                            <p>{vehicle.name}</p>
                        </div>
                </div>
                <h2 className='text-[15px] font-semibold'>Rs.{(vehicle.amount)} /h</h2>
            </div>
        </div>
    )
}

export default VehicleListItem