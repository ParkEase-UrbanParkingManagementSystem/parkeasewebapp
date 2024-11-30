import React, { useState } from 'react';
import AddressAutoComplete from '../addressautocomplete/addressautocomplete';
import {Button} from '../button/button';
import { useMySpotStore } from '@/store';

const SpotAddress = ({ onNext }) => {
    const mySpotStore = useMySpotStore();
    const [message, setMessage] = useState('');

    function onSubmit() {
        if (mySpotStore.data.address) {
            onNext();
        } else {
            setMessage('Address is required');
        }
    }

    const handleAddressSelect = (address, gpscoords) => {
        setMessage('');
        mySpotStore.updateState({
            address: address,
            gpscoords: gpscoords,
        });
    };

    return (
        <div className="grid w-full gap-1.5">
            <h2 className="text-xl sm:text-2xl py-4 font-semibold">Address</h2>
            <AddressAutoComplete
                onAddressSelect={handleAddressSelect}
                selectedAddress={mySpotStore.data.address}
            />
            <p className="text-red-500 text-sm">{message}</p>
            <div className="flex justify-between py-4">
                <Button type="button" onClick={onSubmit} variant="ghost">
                    Next
                </Button>
            </div>
        </div>
    );
}

export default SpotAddress;
