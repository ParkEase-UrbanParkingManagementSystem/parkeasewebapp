import { create } from "zustand";
// import { LatLng } from "../types";

export const useMySpotStore = create((set) => ({
    data: {
        address: "",
        gpscoords: {
            lat: 0,
            lng: 0,
        },
        numberofspots: 1,
        price: {
            hourly: 0,
        },
    },

    updateState: (data) =>
        set((state) => ({
            data: { ...state.data, ...data },
        })),

    restart: () =>
        set({
            data: {
                address: "",
                gpscoords: {
                    lat: 0,
                    lng: 0,
                },
                numberofspots: 1,
                price: {
                    hourly: 0,
                },
            },
        }),
}));
