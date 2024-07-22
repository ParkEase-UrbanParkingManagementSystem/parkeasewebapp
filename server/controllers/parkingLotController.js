const pool = require("../db"); // Adjust the path as needed

exports.parkingLotAdd = async (req, res) => {
  const client = await pool.connect();
  try {
    const pmc_pmc_user_id = req.user;

    const pmcQuery = await pool.query(
      "SELECT pmc_id FROM pmc WHERE pmc_user_id = $1",
      [pmc_pmc_user_id]
    );

    const pmc_id = pmcQuery.rows[0].pmc_id;

    const {
      name,
      bikeCapacity,
      twCapacity,
      carCapacity,
      xlVehicleCapacity,
      addressNo,
      street1,
      street2,
      city,
      district,
    } = req.body;

    const insertQuery = `
      INSERT INTO parking_lot (pmc_id, name, bike_capacity, tw_capacity, car_capacity, xlvehicle_capacity, addressno, street1, street2, city, district)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *;
    `;

    const values = [
      pmc_id,
      name,
      bikeCapacity,
      twCapacity,
      carCapacity,
      xlVehicleCapacity,
      addressNo,
      street1,
      street2,
      city,
      district,
    ];

    const result = await client.query(insertQuery, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release();
  }
};

exports.getParkingLot = async (req, res) => {
  // Connect to the database
  const client = await pool.connect();
  
  try {
    // Assuming the pmc_id is provided in the request body
    const pmcId = req.user;
    
    // Check if pmc_id is provided
    if (!pmcId) {
      return res.status(400).json({ error: "PMC ID is required" });
    }
    
    // Query to get parking lots controlled by the PMC user and the assigned warden name
    const query = `
      SELECT 
        pl.name, 
        pl.bike_capacity, 
        pl.car_capacity, 
        pl.xlvehicle_capacity,
        wp.name
      FROM parking_lot pl
      LEFT JOIN warden_parking_lot wp ON pl.lot_id = wp.lot_id
      WHERE pl.pmc_id = $1
    `;
    
    // Execute the query
    const result = await client.query(query, [pmcId]);
    
    // Check if any parking lots are found
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No parking lots found for this PMC" });
    }
    
    // Return the parking lot details with the assigned warden name
    res.status(200).json(result.rows);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Release the database client
    client.release();
  }
};
