"use client";

import React, { useEffect, useState } from "react";

const LocationTileView = () => {
  const [acceptedDetails, setAcceptedDetails] = useState([]); // Initialized to empty array
  const [pendingDetails, setPendingDetails] = useState([]); // Initialized to empty array
  const [acceptedError, setAcceptedError] = useState(null);
  const [pendingError, setPendingError] = useState(null);
  const [acceptedLoading, setAcceptedLoading] = useState(true);
  const [pendingLoading, setPendingLoading] = useState(true);
  const [locationInput, setLocationInput] = useState({}); // To track latitude and longitude inputs for each parking lot

  useEffect(() => {
    const fetchAcceptedDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_KEY}/admin/get-parking-accepted`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Network response was not ok for accepted parking details"
          );
        }

        const data = await response.json();
        console.log("Mewa thamai", data);
        setAcceptedDetails(data || []); // Fallback to empty array if data is null or undefined
      } catch (err) {
        setAcceptedError(err); // Error state for accepted details
      } finally {
        setAcceptedLoading(false); // Loading state for accepted details
      }
    };

    const fetchPendingDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_KEY}/admin/get-parking-pending`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Network response was not ok for pending parking details"
          );
        }

        const data = await response.json();
        setPendingDetails(data || []); // Fallback to empty array if data is null or undefined
      } catch (err) {
        setPendingError(err); // Error state for pending details
      } finally {
        setPendingLoading(false); // Loading state for pending details
      }
    };

    // Fetch both accepted and pending details on mount
    fetchAcceptedDetails();
    fetchPendingDetails();
  }, []);

  // Handle input change for latitude and longitude
  const handleInputChange = (e, id, field) => {
    setLocationInput((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: e.target.value,
      },
    }));
  };

  // Handle submission of latitude and longitude
  const handleLocationSubmit = async (id) => {
    const latitude = locationInput[id]?.latitude || "";
    const longitude = locationInput[id]?.longitude || "";
    
    console.log("Request Received for submitting parking location...", id, latitude, longitude);

    if (!latitude || !longitude) {
      alert("Please enter both latitude and longitude");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/admin/submit-parking-location`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, latitude, longitude }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit location data");
      }

      alert("Location submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("Error submitting location");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Parking Management</h1>
      {acceptedLoading || pendingLoading ? (
        <p style={styles.loading}>Loading data...</p>
      ) : (
        <div style={styles.sections}>
          {/* Accepted Section */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Accepted Parking Lots</h2>
            <div style={styles.cardContainer}>
              {acceptedDetails.length > 0 ? (
                acceptedDetails.map((item) => (
                  <div key={item.id} style={styles.card}>
                    <h3 style={styles.cardTitle}>{item.name}</h3>
                    <p style={styles.cardText}>Location: {item.city}</p>
                    <p style={styles.cardText}>
                      Capacity: Car: {item.car_capacity} / Bike:{" "}
                      {item.bike_capacity}{" "}
                    </p>
                  </div>
                ))
              ) : (
                <p style={styles.noDataText}>
                  No accepted parking lots available.
                </p>
              )}
            </div>
          </div>

          {/* Pending Section */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Pending Parking Lots</h2>
            <div style={styles.fullWidthCardContainer}>
              {pendingDetails.length > 0 ? (
                pendingDetails.map((item) => (
                  <div key={item.id} style={styles.fullWidthCard}>
                    <div style={styles.cardContent}>
                      <div style={styles.leftContent}>
                        <h3 style={styles.cardTitle}>{item.name}</h3>
                        <p style={styles.cardText}>Location: {item.city}</p>
                        <p style={styles.cardText2}>
                          Requested By: {item.pmc_name}
                        </p>
                        {/* Input fields for latitude and longitude */}
                        <div style={styles.inputGroup}>
                          <input
                            type="text"
                            placeholder="Latitude"
                            value={locationInput[item.lot_id]?.latitude || ""}
                            onChange={(e) =>
                              handleInputChange(e, item.lot_id, "latitude")
                            }
                            style={styles.input}
                          />
                          <input
                            type="text"
                            placeholder="Longitude"
                            value={locationInput[item.lot_id]?.longitude || ""}
                            onChange={(e) =>
                              handleInputChange(e, item.lot_id, "longitude")
                            }
                            style={styles.input}
                          />
                        </div>
                        {/* Submit button */}
                        <button
                          onClick={() => handleLocationSubmit(item.lot_id)}
                          style={styles.submitButton}
                        >
                          Submit Location
                        </button>
                      </div>
                      {item.link && (
                        <div style={styles.rightContent}>
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.button}
                          >
                            Visit Link
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p style={styles.noDataText}>
                  No pending parking lots available.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f8f9fa",
  },
  heading: {
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "20px",
    color: "#333",
  },
  button: {
    display: "inline-block",
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    textDecoration: "none",
    textAlign: "center",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  loading: {
    textAlign: "center",
    fontSize: "18px",
    color: "#555",
  },
  sections: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  section: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  sectionTitle: {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#a88f03",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
  },
  card: {
    flex: "1 1 calc(33.333% - 30px)",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    minWidth: "200px",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#495057",
  },
  cardText: {
    fontSize: "16px",
    color: "#6c757d",
  },
  cardText2: {
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "10px",
    color: "#6c757d",
  },
  noDataText: {
    fontSize: "16px",
    color: "#6c757d",
    fontStyle: "italic",
  },
  inputGroup: {
    marginTop: "15px",
    display: "flex",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "150px",
  },
  submitButton: {
    display: "inline-block",
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#575756",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "15px",
  },
  fullWidthCardContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  fullWidthCard: {
    flex: "1 1 100%",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  leftContent: {
    flex: "1",
  },
  rightContent: {
    flex: "0 1 120px",
  },
};

export default LocationTileView;
