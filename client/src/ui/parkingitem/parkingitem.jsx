import React from 'react'
import Image from 'next/image'


const ParkingItem = ({ parking }) => {
    const GOOGLE_API_KEY = 'AIzaSyAQzkKKubDkwzdBGhdUWrPoiQEuOzxpH4M';
    const photo_ref = parking?.photos ? parking?.photos[0]?.photo_reference : '';
    const defaultImageUrl = '/images/default_parking_img.png';

    const imageUrl = photo_ref 
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo_ref}&key=${GOOGLE_API_KEY}`
    : defaultImageUrl;

    return (
        <div className='flex gap-3 p-3 border-b-[1px] border-slate-400 mb-4 items-center'>
            <Image src={imageUrl}
                alt='parking-lot-image'
                width={80}
                height={80}
                className='rounded-xl
            object-cover h-[100px] w-[100px]'
            />
            <div>
                <h2 className='text-[15px] font-semibold'>{parking.name}</h2>
                <h2 className='text-[12px] text-gray-500'>{parking.vicinity}</h2>
                <div className='flex gap-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                        className="w-5 h-5 text-yellow-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                    <h2>{parking.rating}</h2>

                </div>
            </div>
        </div>
    )
}

export default ParkingItem