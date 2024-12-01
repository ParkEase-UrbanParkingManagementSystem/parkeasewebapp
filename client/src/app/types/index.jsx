// Example LatLng object
const LatLng = {
    lat: 0, // Latitude (number)
    lng: 0, // Longitude (number)
};

// Example ListSpotProps object
const ListSpotPropsType = {
    onNext: () => { }, // Function to proceed to the next step
    onPrev: () => { }, // (Optional) Function to return to the previous step
};

// Example Price object
const Price = {
    hourly: 10, // Hourly rate (number)
};

// ParkingLocationStatus as a plain object
const ParkingLocationStatus = {
    AVAILABLE: "AVAILABLE",
    FULL: "FULL",
    NOTAVAILABLE: "NOTAVAILABLE",
};

// Example UpdateLocationParams object
const UpdateLocationParams = {
    address: "", // Address as a string
    numberofspots: 0, // Number of spots as a number
    price: {
        hourly: 0, // Hourly rate (number)
    },
};

// MapAddressType as a plain object
const MapAddressType = {
    PARKINGLOCATION: "PARKINGLOCATION",
    DESTINATION: "DESTINATION",
    ADMIN: "ADMIN",
};

// Example MapParams object
const MapParams = {
    id: "", // Unique ID as a string
    gpscoords: LatLng, // GPS coordinates as a LatLng object
    address: "", // Address as a string
    numberofspots: 0, // (Optional) Number of spots as a number
    bookedspots: 0, // (Optional) Number of booked spots as a number
    price: Price, // (Optional) Price as a Price object
    type: "", // (Optional) Type as a string
    status: "", // (Optional) Status as a string
    radius: 0, // (Optional) Radius as a number
};

// BookingStatus as a plain object
const BookingStatus = {
    CANCELLED: "CANCELLED",
    BOOKED: "BOOKED",
    PENDING: "PENDING_PAYMENT",
};

// Example ActionResponse object
const ActionResponse = {
    code: 200, // HTTP response code (number)
    message: "Success", // Response message as a string
    data: null, // (Optional) Additional data
    error: null, // (Optional) Error information
};
