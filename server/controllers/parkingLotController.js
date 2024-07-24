const pool = require("../db"); // Adjust the path as needed

exports.parkingLotAdd = async (req, res) => {
  const client = await pool.connect();
  try {
    const pmc_pmc_user_id = req.user;

    if (!pmc_pmc_user_id) {
      return res.status(400).json({ error: "User ID is missing from request" });
    }

    const pmcQuery = await pool.query(
      "SELECT pmc_id FROM pmc WHERE user_id = $1",
      [pmc_pmc_user_id]
    );

    if (pmcQuery.rows.length === 0) {
      return res.status(404).json({ error: "PMC ID not found" });
    }

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
  const client = await pool.connect();

  try {
    const user_id = req.user;

    if (!user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const queryPMC = 'SELECT pmc_id FROM pmc WHERE user_id = $1';

    const resultPMC = await client.query(queryPMC, [user_id]);

    if (resultPMC.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const pmc_id = resultPMC.rows[0].pmc_id;
    

    // Query to get parking lots controlled by the PMC user and the assigned warden name
    const query = `
     SELECT 
  pl.name, 
  pl.bike_capacity, 
  pl.car_capacity, 
  pl.xlvehicle_capacity,
  STRING_AGG(CONCAT(w.fname, ' ', w.lname), ', ') AS wardens
FROM parking_lot pl
LEFT JOIN warden_parking_lot wpl ON pl.lot_id = wpl.lot_id
LEFT JOIN warden w ON wpl.warden_id = w.warden_id
WHERE pl.pmc_id = $1
GROUP BY pl.lot_id;

    `;

    const result = await client.query(query, [pmc_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No parking lots found for this PMC" });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release();
  }
};

