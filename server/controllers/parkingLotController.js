const pool  = require('../db'); // Adjust the path as needed

exports.parkingLotAdd = async (req, res) => {
    
  const client = await pool.connect();
  try {
    const pmc_pmc_user_id = req.user;

    const pmcQuery = await pool.query('SELECT pmc_id FROM pmc WHERE pmc_user_id = $1', [pmc_pmc_user_id]);

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
      district
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
      district
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
    const parkingLotId = req.params.id; // Assuming the parking lot ID is provided as a URL parameter

    const query = 'SELECT * FROM parking_lot WHERE id = $1';
    const result = await client.query(query, [parkingLotId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Parking lot not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release();
  }
};

