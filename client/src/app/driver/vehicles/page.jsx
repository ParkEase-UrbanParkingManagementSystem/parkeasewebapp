"use client";

import styles from "../vehicles/page.module.css";
import { useState, useEffect } from "react";
import Navbar from "../../../ui/homenavbar/homenavbar";

const Vehicles = () => {
  const [newVehicle, setNewVehicle] = useState({
    name: "",
    type: "",
    number: "",
  });
  const [vehicleDetails, setVehicleDetails] = useState([]);

  const handleAddVehicle = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/vehicle`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({
            vehicle_number: newVehicle.number,
            name: newVehicle.name,
            type_id: newVehicle.type,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add vehicle");
      }

      // Reset form fields and refresh vehicle list
      setNewVehicle({ name: "", type: "", number: "" });
      fetchVehicles();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setNewVehicle({ name: "", type: "", number: "" });
  };

  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/vehicle`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch vehicles");
      }

      const data = await response.json();
      setVehicleDetails(data.data || []); // Default to an empty array if no data is returned
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const getImageUrl = (typeId) => {
    switch (typeId) {
      case 1:
        return "/images/car.png";
      case 2:
        return "/images/motorcycle.png";
      case 3:
        return "/images/threewheel.jpg";
      case 4:
        return "/images/large_vehicle.jpg";
      default:
        return "/images/default_vehicle.jpg";
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <Navbar />
      </div>
      <div className={styles.content}>
        {/* Left Side: Add Vehicle Form */}
        <div className={styles.left}>
          <div className="mt-4 bg-white rounded-xl shadow-lg p-16">
            <div className="mb-3">
              <label className="block mb-2 text-md font-semibold	">
                Vehicle Name:
              </label>
              <input
                type="text"
                className="border p-2 w-full rounded-xl"
                value={newVehicle.name}
                onChange={(e) =>
                  setNewVehicle({ ...newVehicle, name: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="block mb-2 text-md font-semibold	">
                Vehicle Type:
              </label>
              <select
                className="border p-2 w-full rounded-xl"
                value={newVehicle.type}
                onChange={(e) =>
                  setNewVehicle({ ...newVehicle, type: e.target.value })
                }
              >
                <option value="">Select Type:</option>
                <option value="1">Car</option>
                <option value="2">Bike</option>
                <option value="3">Threewheeler</option>
                <option value="4">Large Vehicle</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block mb-2 text-md font-semibold	">
                Vehicle Number:
              </label>
              <input
                type="text"
                className="border p-2 w-full rounded-xl"
                value={newVehicle.number}
                onChange={(e) =>
                  setNewVehicle({ ...newVehicle, number: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col justify-center">
              <button
                className="p-2 bg-black text-white rounded-lg mr-2 mt-3"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="p-2 text-white rounded-lg mr-2 mt-2"
                style={{ backgroundColor: "#ffb403" }}
                onClick={handleAddVehicle}
              >
                Add Vehicle
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Vehicle List */}
        <div className={styles.right}>
          <div className="mt-4">
            <h2 className="text-[20px] font-bold mb-3">Vehicle List</h2>
            <div className="max-h-[400px] overflow-y-auto">
              {vehicleDetails.length === 0 ? (
                <p>No vehicles added yet.</p>
              ) : (
                <ul className="grid grid-cols-2 gap-4">
                  {vehicleDetails.map((vehicle, index) => (
                    <li
                      key={index}
                      className="p-4 border-[2px] border-black-500 rounded-lg flex items-center space-x-4"
                    >
                      <img
                        src={getImageUrl(vehicle.type_id)}
                        alt={vehicle.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <p className="text-lg font-bold">{vehicle.name}</p>
                        <p>Vehicle Number: {vehicle.vehicle_number}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
