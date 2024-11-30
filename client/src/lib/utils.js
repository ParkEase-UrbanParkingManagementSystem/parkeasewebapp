import { Library } from "@googlemaps/js-api-loader";
import { clsx } from "clsx";
import { compareAsc, differenceInMinutes, getHours, getMinutes } from "date-fns";
import { twMerge } from "tailwind-merge";

// Define libraries for Google Maps API
export const libs = ["core", "maps", "places", "marker"];

// Utility function for merging class names
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Format a monetary amount for display
export function formatAmountForDisplay(amount, currency = "LKR") {
  const numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  });

  const formattedAmount = numberFormat.format(amount);
  return formattedAmount === "NaN" ? "" : formattedAmount;
}

// Format a monetary amount for Stripe
export function formatAmountForStripe(amount, currency = "LKR") {
  const numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  });

  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;

  for (const part of parts) {
    if (part.type === "decimal") {
      zeroDecimalCurrency = false;
    }
  }

  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}

// Extract street information from an address
export function getStreetFromAddress(address) {
  return address.split(",")[0];
}

// Build a map info card for parking
export const buildMapInfoCardContent = (title, address, totalSpots, price) => {
  return `
    <div class="map_infocard_content">
      <div class="map_infocard_title">${title}</div>
      <div class="map_infocard_body">
        <div>${address}</div>
        <hr />
        <div>Total spots: ${totalSpots}</div>
        <div>Hourly price: ${formatAmountForDisplay(price, "LKR")}</div>
      </div>
    </div>
  `;
};

// Build a map info card for destination
export const buildMapInfoCardContentForDestination = (title, address) => {
  return `
    <div class="map_infocard_content">
      <div class="map_infocard_title">${title}</div>
      <div class="map_infocard_body">
        <div>${address}</div>
      </div>
    </div>`;
};

// Create a parking pin element
export const parkingPin = (type) => {
  const glyphImg = document.createElement("div");
  glyphImg.innerHTML = `
    <div class="map_pin_container">
      <img src='http://localhost:3000/${type}.png' />
    </div>
  `;

  const pinElement = new google.maps.marker.PinElement({
    glyph: glyphImg,
  });

  return pinElement;
};

// Create a parking pin element with an index
export const parkingPinWithIndex = (type, index) => {
  const glyphImg = document.createElement("div");
  glyphImg.innerHTML = `
    <div class="map_pin_container">
      <div class="map_pin_id"><span>${index}</span></div>
      <img src='http://localhost:3000/${type}.png' />
    </div>
  `;

  const pinElement = new google.maps.marker.PinElement({
    glyph: glyphImg,
  });

  return pinElement;
};

// Create a destination pin element
export const destinationPin = (type) => {
  const glyphImg = document.createElement("img");
  glyphImg.src = `http://localhost:3000/${type}.png`;
  const pinElement = new google.maps.marker.PinElement({
    glyph: glyphImg,
  });

  return pinElement;
};

// Generate time slots within a given time range
export function getTimeSlots(startTime = "00:00", endTime = "23:45") {
  const timeArray = [];
  const parsedStartTime = new Date(`2000-01-01T${startTime}:00`);
  const parsedEndTime = new Date(`2000-01-01T${endTime}:00`);

  let currentTime = parsedStartTime;
  while (currentTime <= parsedEndTime) {
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const ampm = currentTime.getHours() < 12 ? "AM" : "PM";
    const timeString = `${hours}:${minutes} ${ampm}`;
    timeArray.push({
      time: `${hours}:${minutes}`,
      display: timeString,
    });

    currentTime.setMinutes(currentTime.getMinutes() + 30);
  }

  return timeArray;
}

// Compare two bookings based on their start time
export function sortcomparer(b1, b2) {
  return compareAsc(b1.starttime, b2.starttime);
}

// Calculate the block length in minutes
export function blockLength(starttime, endtime) {
  return differenceInMinutes(endtime, starttime);
}

// Calculate the block position based on start time
export function blockPostion(starttime) {
  const h = getHours(starttime);
  const m = getMinutes(starttime);
  return h * 60 + m;
}
