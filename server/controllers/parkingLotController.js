const pool  = require('../db'); // Adjust the path as needed

exports.parkingLotAdd = async (req, res) => {
    
  const client = await pool.connect();
  try {
    const pmc_user_id = req.user;

    const pmcQuery = await pool.query('SELECT pmc_id FROM pmc WHERE user_id = $1', [pmc_user_id]);

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
