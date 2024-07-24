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
  STRING_AGG(CONCAT(w.fname, ' ', w.lname), ', ') AS wardens
FROM parking_lot pl
LEFT JOIN warden_parking_lot wpl ON pl.lot_id = wpl.lot_id
LEFT JOIN warden w ON wpl.warden_id = w.warden_id
WHERE pl.pmc_id = $1
GROUP BY pl.lot_id;

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

    const pmcIDResult = await pool.query(
      `SELECT pmc_id FROM pmc WHERE user_id = $1`,
      [user_id]
    );
    const PMC_ID = pmcIDResult.rows[0]?.pmc_id;

    if (!PMC_ID) {
      return res.status(404).json({ msg: "PMC ID not found" });
    }

    const parkingLotDetailsResult = await pool.query(
      `SELECT * FROM parking_lot WHERE pmc_id = $1`,
      [PMC_ID]
    );

    if (parkingLotDetailsResult.rows.length === 0) {
      return res.status(404).json({ msg: "Parking Lot details not found" });
    }

    const wardenIDResult = await pool.query(
      `SELECT wp.warden_id
       FROM warden_parking_lot wp
       INNER JOIN parking_lot pl ON pl.lot_id = wp.lot_id
       WHERE pl.pmc_id = $1`,
      [PMC_ID]
    );

    let wardenDetailsResult = { rows: [] };

    if (wardenIDResult.rows.length > 0) {
      const warden_ID = wardenIDResult.rows[0].warden_id;
      wardenDetailsResult = await pool.query(
        `SELECT fname, lname FROM warden WHERE warden_id = $1`,
        [warden_ID]
      );
    }

    const slotPricesResult = await pool.query("SELECT * FROM slot_price");

    const combinedDetails = parkingLotDetailsResult.rows.map((lot) => {
      const warden =
        wardenDetailsResult.rows.length > 0
          ? wardenDetailsResult.rows[0]
          : null;
      return {
        lot,
        warden,
        slotPrices: slotPricesResult.rows,
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

exports.getAParkingLotDetails = async (req, res) => {
  const lotId = req.params.id;

  try {
    const lotQuery = `
      SELECT 
        l.*, 
        w.fname, w.lname,
        s.*
      FROM parking_lot l
      LEFT JOIN warden_parking_lot wp ON l.lot_id = wp.lot_id
      LEFT JOIN warden w ON wp.warden_id = w.warden_id
      LEFT JOIN slot_price s ON l.lot_id = s.lot_id
      WHERE l.lot_id = $1;
    `;
    const lotResult = await pool.query(lotQuery, [lotId]);

    if (lotResult.rows.length === 0) {
      return res.status(404).json({ message: "Parking lot not found" });
    }

    // Initialize variables to store parking lot details and slot prices
    const parkingLotDetails = {
      lot: null,
      warden: null,
      slotPrices: [],
    };

    // Iterate through the query results
    lotResult.rows.forEach((row) => {
      if (!parkingLotDetails.lot) {
        // Set the parking lot details (only once)
        parkingLotDetails.lot = {
          lot_id: row.lot_id,
          name: row.name,
          addressno: row.addressno,
          street_1: row.street_1,
          street_2: row.street_2,
          city: row.city,
          district: row.district,
          bike_capacity: row.bike_capacity,
          car_capacity: row.car_capacity,
          xlVehicle_capacity: row.xlVehicle_capacity,
          full_capacity: row.full_capacity,
          description: row.description,
          status: row.status,
        };

        parkingLotDetails.warden = {
          fname: row.fname,
          lname: row.lname,
        };
      }

      // Add slot price details to the array
      if (row.slot_id) {
        parkingLotDetails.slotPrices.push({
          slot_id: row.slot_id,
          type: row.type,
          amount_per_slot: row.amount_per_slot,
        });
      }
    });

    res.json({ data: parkingLotDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server error" });
  }
};
