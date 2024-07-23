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
      INSERT INTO parking_lot (pmc_id, name, bike_capacity, tw_capacity, car_capacity, xlvehicle_capacity, addressno, street_1, street_2, city, district)
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

    const queryPMC = "SELECT pmc_id FROM pmc WHERE user_id = $1";

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
        w.fname,
        w.lname
      FROM parking_lot pl
      LEFT JOIN warden_parking_lot wpl ON pl.lot_id = wpl.lot_id
      LEFT JOIN warden w ON wpl.warden_id = w.warden_id
      WHERE pl.pmc_id = $1
    `;

    const result = await client.query(query, [pmc_id]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No parking lots found for this PMC" });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release();
  }
};

exports.getParkingLotDetails = async (req, res) => {
  try {
    const user_id = req.user;

    const parkinglotDetails = await pool.query(
      `SELECT * FROM parking_lot WHERE pmc_id = $1`,
      [user_id]
    );

    const wardenID = await pool.query(
      `SELECT wp.warden_id
       FROM warden_parking_lot wp
       INNER JOIN parking_lot pl ON pl.lot_id = wp.lot_id
       WHERE pl.pmc_id = $1`,
      [user_id]
    );

    const warden_ID = wardenID.rows[0].warden_id;

    const wardenDetails = await pool.query(`SELECT fname, lname FROM warden WHERE warden_id = $1,`[warden_ID]);

    const slotPrices = await pool.query("SELECT * FROM slot_price");

    if (parkinglotDetails.rows.length === 0) {
      return res.status(404).json({ msg: "Parking Lot details not found" });
    }

    const combinedDetails = parkinglotDetails.rows.map((lot) => {
      const warden = wardenDetails.rows.find((w) => w.lot_id === lot.lot_id);
      return {
        lot,
        warden,
        slotPrices: slotPrices.rows,
      };
    });

    res.status(200).json({
      message: "success",
      data: combinedDetails,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
