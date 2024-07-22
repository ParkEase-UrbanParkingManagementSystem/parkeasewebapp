import React, { useState } from 'react';
import { VehicleListData } from '@/utils/vehicleList';
import VehicleListItem from '@/ui/vehiclelistitem/vehiclelistitem';
import QRCode from 'qrcode.react';

const DriverVehicleList = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [showQRCode, setShowQRCode] = useState(false);
    const [showAddVehicleForm, setShowAddVehicleForm] = useState(false);
    const [newVehicle, setNewVehicle] = useState({
        name: '',
        type: '',
        number: ''
    });

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

    const handleAddVehicle = () => {
        // Add new vehicle to the list
        VehicleListData.push({ ...newVehicle });
        handleCloseAddVehicleForm();
    };

    return (
        <div className='mt-4 p-2 overflow-auto h-[220px] border-[2px] rounded-xl '>
            {!showAddVehicleForm && (
                <>
                    <h2 className='text-[20px] font-bold items-center'>Choose your ride</h2>
                    {VehicleListData.map((item, index) => (
                        <div
                            key={index}
                            className={`cursor-pointer p-2 rounded-md border-black ${activeIndex === index ? 'border-[2px]' : ''}`}
                            onClick={() => handleSelectVehicle(item, index)}
                        >
                            <VehicleListItem vehicle={item} />
                        </div>
                    ))}

                    <button
                        className='mt-3 p-2 bg-yellow-500 w-full text-white rounded-lg'
                        onClick={handleOpenAddVehicleForm}
                    >
                        Add Vehicle
                    </button>
                </>
            )}

            {showAddVehicleForm && (
                <div className='bg-white p-5 pt-2 pb-2 rounded-lg'>
                    {/* <h2 className='text-xl mb-2 font-bold'>Add New Vehicle</h2> */}
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
                        <input
                            type='text'
                            className='border p-2 w-full rounded-xl'
                            value={newVehicle.type}
                            onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
                        />
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
                            className='p-2 bg-black text-white rounded-lg mr-2'
                            onClick={handleCloseAddVehicleForm}
                        >
                            Cancel
                        </button>
                        <button
                            className='p-2 bg-yellow-500 text-white rounded-lg'
                            onClick={handleAddVehicle}
                        >
                            Add Vehicle
                        </button>
                    </div>
                </div>
            )}

            {selectedVehicle?.name && showQRCode && (
                <div className='flex flex-col items-center fixed bottom-5 bg-white p-3 shadow-xl rounded-lg w-full md:w-[30%] border-[1px]'>
                    <h2 className='mb-2'>QR Code for {selectedVehicle.name}</h2>
                    <QRCode value={`Vehicle: ${selectedVehicle.name}`} size={256} />
                    <button
                        className='mt-3 p-2 bg-red-500 text-white rounded-lg'
                        onClick={handleCloseQRCode}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default DriverVehicleList;
