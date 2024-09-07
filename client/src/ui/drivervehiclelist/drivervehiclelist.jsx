import React, { useState, useEffect } from 'react';
import VehicleListItem from '@/ui/vehiclelistitem/vehiclelistitem';
import QRCode from 'qrcode.react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const DriverVehicleList = () => {
    const router = useRouter();
    const [driverId, setDriverId] = useState(null);
    const [vehicles, setVehicles] = useState([]);  // Initialize as an empty array
    const [activeIndex, setActiveIndex] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [showQRCode, setShowQRCode] = useState(false);
    const [showAddVehicleForm, setShowAddVehicleForm] = useState(false);
    const [newVehicle, setNewVehicle] = useState({
        name: '',
        type: '',
        number: ''
    });

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/vehicle`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        token: token // Use 'Authorization' instead of 'token'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch vehicles');
                }

                const data = await response.json();
                setDriverId(data.driver_id);
                setVehicles(data.data || []);  // Ensure the correct data path and default to an empty array
            } catch (error) {
                console.error(error);
            }
        };

        fetchVehicles();
    }, []);

    const handleSelectVehicle = (vehicle, index) => {
        setSelectedVehicle(vehicle);
        setActiveIndex(index);
        setShowQRCode(true);
    };

    const handleCloseQRCode = () => {
        setShowQRCode(false);
        setSelectedVehicle(null);
        setActiveIndex(null);
    };

    const handleOpenAddVehicleForm = () => {
        setShowAddVehicleForm(true);
    };

    const handleCloseAddVehicleForm = () => {
        setShowAddVehicleForm(false);
        setNewVehicle({ name: '', type: '', number: '' });
    };

    const handleParkedButton = () => {
        router.push('/driver/parked-details');
    };

    const handleAddVehicle = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/vehicle`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: token  // Use 'Authorization' instead of 'token'
                },
                body: JSON.stringify({
                    vehicle_number: newVehicle.number,
                    name: newVehicle.name,
                    type_id: newVehicle.type
                })
            });

            if (!response.ok) {
                throw new Error('Failed to add vehicle');
            }

            const addedVehicle = await response.json();

            // Update the local vehicle list
            setVehicles((prevVehicles) => [...prevVehicles, addedVehicle.data]);
            handleCloseAddVehicleForm();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='mt-4 p-2 overflow-auto max-h-[470px] border-[2px] rounded-xl'>

            {!showAddVehicleForm && (
                <>
                    <h2 className='text-[20px] font-bold items-center'>Choose your ride</h2>

                    {vehicles.length === 0 &&

                        <div className='flex flex-col items-center justify-center mt-4'>
                            <Image
                                src={"/images/question-mark.png"}
                                width={80}
                                height={100}
                                alt={`image`}
                            />
                            <p className='text-[15px]  mb-1 mt-3 text-center'>No Vehicles added. Please add a vehicle</p>
                        </div>
                    }

                    {vehicles.map((item, index) => (
                        <div
                            key={index}
                            className={`cursor-pointer p-2 rounded-md border-black ${activeIndex === index ? 'border-[2px]' : ''}`}
                            onClick={() => handleSelectVehicle(item, index)}
                        >
                            <VehicleListItem vehicle={item} />
                        </div>
                    ))}

                    <button
                        className='mt-3 p-2 w-full text-white rounded-lg ' style={{ backgroundColor: '#ffb403' }}
                        onClick={handleOpenAddVehicleForm}
                    >
                        Add Vehicle
                    </button>
                </>
            )}

            {showAddVehicleForm && (
                <div className='bg-white p-5 pt-2 pb-2 rounded-lg'>
                    <div className='mb-1'>
                        <label className='block mb-1'>Vehicle Name</label>
                        <input
                            type='text'
                            className='border p-2 w-full rounded-xl'
                            value={newVehicle.name}
                            onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                        />
                    </div>
                    <div className='mb-1'>
                        <label className='block mb-1'>Vehicle Type</label>
                        <select
                            className='border p-2 w-full rounded-xl'
                            value={newVehicle.type}
                            onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
                        >
                            <option value=''>Select Type</option>
                            <option value='1'>Car</option>
                            <option value='2'>Bike</option>
                            <option value='3'>Threewheeler</option>
                            <option value='4'>Large Vehicle</option>
                        </select>
                    </div>

                    <div className='mb-1'>
                        <label className='block mb-1'>Vehicle Number</label>
                        <input
                            type='text'
                            className='border p-2 w-full rounded-xl'
                            value={newVehicle.number}
                            onChange={(e) => setNewVehicle({ ...newVehicle, number: e.target.value })}
                        />
                    </div>
                    <div className='flex justify-end'>
                        <button
                            className='p-2 bg-black text-white rounded-lg mr-2 mt-1'
                            onClick={handleCloseAddVehicleForm}
                        >
                            Cancel
                        </button>
                        <button
                            className='p-2 text-white rounded-lg mt-1'
                            style={{ backgroundColor: '#ffb403' }}
                            onClick={handleAddVehicle}
                        >
                            Add Vehicle
                        </button>
                    </div>
                </div>
            )}

            {selectedVehicle?.name && showQRCode && (
                <div className='fixed inset-0 flex items-center justify-center z-10'>
                    <div className='flex flex-col items-center bg-white p-3 shadow-xl rounded-lg w-full md:w-[30%] border-[1px]'>
                        <h2 className='mb-2'>QR Code for {selectedVehicle.name}</h2>
                        <QRCode value={`Vehicle: ${selectedVehicle.vehicle_id}, User: ${driverId}`} size={256} />
                        <button className='mt-3 p-2 bg-red-500 text-white rounded-lg' onClick={handleCloseQRCode}>
                            Close
                        </button>
                        <button className='mt-3 p-2 bg-green-500 text-white rounded-lg' onClick={handleParkedButton}>
                            Parked
                        </button>
                    </div>
                </div>

            )}
        </div>
    );
};

export default DriverVehicleList;
