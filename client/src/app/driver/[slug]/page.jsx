"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ParkingLotDetails() {
  const router = useRouter();
  const [parkingLot, setParkingLot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { slug } = useParams();

  useEffect(() => {
    if (!slug) return;

    const fetchParkingLotDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_KEY}/parkinglots/${slug}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );
        const data = await response.json();

        if (response.ok) {
          setParkingLot(data.data);
        } else {
          setError("Failed to fetch parking lot details.");
        }
      } catch (err) {
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchParkingLotDetails();
  }, [slug, router]);

  if (loading)
    return <div className="text-center text-gray-600 p-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;
  if (!parkingLot)
    return (
      <div className="text-center text-gray-600 p-8">
        No details found for this parking lot.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFD981] to-[#D1D2D5] font-sans p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            {parkingLot?.lot?.images && parkingLot?.lot?.images?.length > 0 ? (
              <div className="relative h-64 md:h-full">
                <img
                  src={`${process.env.NEXT_PUBLIC_API_KEY}/${parkingLot?.lot?.images[0]}`}
                  alt={parkingLot.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ) : (
              <div className="h-64 md:h-full flex items-center justify-center bg-gray-200">
                <p className="text-gray-600">No image available</p>
              </div>
            )}
          </div>
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {parkingLot?.lot?.name}
            </h1>
            <p className="text-gray-600 mb-6">
              {parkingLot?.lot?.addressno}, {parkingLot?.lot?.street1},{" "}
              {parkingLot?.lot?.street2}, {parkingLot?.lot?.city},{" "}
              {parkingLot?.lot?.district}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-2">Bike Capacity</h2>
                <p className="text-2xl font-semibold text-green-600">
                  {parkingLot?.lot?.bike_capacity_available}/
                  {parkingLot?.lot?.bike_capacity}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-2">Car Capacity</h2>
                <p className="text-2xl font-semibold text-green-600">
                  {parkingLot?.lot?.car_capacity_available}/
                  {parkingLot?.lot?.car_capacity}
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h2 className="text-xl font-semibold mb-4">Parking Tolls</h2>
              <div className="grid grid-cols-2 gap-4">
                {parkingLot?.slotPrices?.map((price) => (
                  <div key={price.type_name} className="flex justify-between">
                    <span>{price.type_name}</span>
                    <span className="font-semibold">
                      Rs. {price.amount_per_vehicle}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {parkingLot?.reviews && parkingLot.reviews.length > 0 && (
          <div className="p-6 mt-6 bg-gray-100 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Reviews
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {parkingLot.reviews.map((review) => (
                <div key={review.id} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center mb-2">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {review.profile_pic ? (
                        <Image
                          src={review.profile_pic}
                          alt={`${review.driver_fname} ${review.driver_lname}`}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                      ) : (
                        <span className="text-gray-600">
                          {review.driver_fname?.[0]}
                          {review.driver_lname?.[0]}
                        </span>
                      )}
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-gray-800">
                        {review.driver_fname} {review.driver_lname}
                      </p>
                      <p className="text-yellow-500">
                        {"⭐".repeat(review.rating)}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.review}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
