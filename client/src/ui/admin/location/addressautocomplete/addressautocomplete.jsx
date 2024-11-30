'use client';

import React, { useEffect, useRef, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { libs } from "../../../../lib/utils";
import Input from "../input/input";

const AddressAutoComplete = ({ onAddressSelect, selectedAddress }) => {
    const [autoComplete, setAutoComplete] = useState(null);

    const { isLoaded } = useJsApiLoader({
        nonce: "477d4456-f7b5-45e2-8945-5f17b3964752",
        googleMapsApiKey: "AIzaSyBoxehPHj1ptymdJCDWBbbzFYC-ccf-1uQ",
        libraries: libs,
    });

    const placesAutoCompleteRef = useRef(null);

    useEffect(() => {
        if (isLoaded) {
            const colomboBounds = new google.maps.LatLngBounds(
                new google.maps.LatLng({ lat: 6.92327119768736, lng: 79.85663723059875 })
            );

            const gAutoComplete = new google.maps.places.Autocomplete(placesAutoCompleteRef.current, {
                bounds: colomboBounds,
                fields: ["formatted_address", "geometry"],
                componentRestrictions: {
                    country: ["lk"],
                },
            });

            gAutoComplete.addListener("place_changed", () => {
                const place = gAutoComplete.getPlace();
                const position = place.geometry?.location;
                onAddressSelect(place.formatted_address, {
                    lat: position?.lat(),
                    lng: position?.lng(),
                });
            });

            setAutoComplete(gAutoComplete);
        }
    }, [isLoaded, onAddressSelect]);

    useEffect(() => {
        setTimeout(() => {
            document.body.style.pointerEvents = "";
        }, 0);
    }, []);

    return <Input ref={placesAutoCompleteRef} defaultValue={selectedAddress} />;
};

export default AddressAutoComplete;
