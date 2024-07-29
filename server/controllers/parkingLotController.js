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
      description,
    } = req.body;

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
      description,
    } = req.body;

    // Calculate full_capacity
    const fullCapacity  = bikeCapacity + twCapacity + carCapacity + xlVehicleCapacity;

    const insertQuery = `
      INSERT INTO parking_lot (pmc_id, name, bike_capacity, tw_capacity, car_capacity, xlvehicle_capacity, full_Capacity, addressno, street1, street2, city, district, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *;
    `;

    const values = [
      pmc_id,
      name,
      bikeCapacity,
      twCapacity,
      carCapacity,
      xlVehicleCapacity,
      fullCapacity,
      addressNo,
      street1,
      street2,
      city,
      district,
      description,
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

    const insertQuery = `
      INSERT INTO parking_lot (pmc_id, name, bike_capacity, tw_capacity, car_capacity, xlvehicle_capacity, addressno, street1, street2, city, district, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
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
      description,
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
          pl.lot_id,
          pl.name, 
          pl.bike_capacity, 
          pl.car_capacity, 
          pl.xlvehicle_capacity,
          pl.tw_capacity,
          pl.description,
          pl.status,
          STRING_AGG(CONCAT(w.fname, ' ', w.lname), ' , ') AS wardens
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


exports.getAParkingLotDetails = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Lot ID is required or Invalid' });
  }

  try {
    // Query to get parking lot details and related data
    const lotQuery = `
  SELECT 
    l.*, 
    w.fname AS warden_fname, 
    w.lname AS warden_lname,
    r.id AS review_id,
    r.driver_id, 
    r.rating AS review_rating, 
    r.review AS review_text, 
    r.created_at AS review_created_at,
    d.fname AS driver_fname, 
    d.lname AS driver_lname,
    d.profile_pic AS driver_profile_pic,
    (SELECT COUNT(*) FROM parkinglotreviews WHERE lot_id = l.lot_id) AS review_count
  FROM parking_lot l
  LEFT JOIN warden_parking_lot wp ON l.lot_id = wp.lot_id
  LEFT JOIN warden w ON wp.warden_id = w.warden_id
  LEFT JOIN parkinglotreviews r ON l.lot_id = r.lot_id
  LEFT JOIN driver d ON r.driver_id = d.driver_id
  WHERE l.lot_id = $1;
`;


    const lotResult = await pool.query(lotQuery, [id]);

    console.log(lotResult.rows);

    if (lotResult.rows.length === 0) {
      return res.status(404).json({ message: "Parking lot not found" });
    }

    // Initialize variables to store parking lot details, slot prices, and reviews
    const parkingLotDetails = {
      lot: null,
      warden: null,
      slotPrices: [],
      reviews: [],
    };

    lotResult.rows.forEach((row) => {
      if (!parkingLotDetails.lot) {
        // Set the parking lot details (only once)
        parkingLotDetails.lot = {
          lot_id: row.lot_id,
          name: row.name,
          addressno: row.addressno,
          street1: row.street1,
          street2: row.street2,
          city: row.city,
          district: row.district,
          bike_capacity: row.bike_capacity,
          car_capacity: row.car_capacity,
          tw_capacity: row.tw_capacity,
          xlvehicle_capacity: row.xlvehicle_capacity,
          full_capacity: row.full_capacity,
          description: row.description,
          status: row.status,
          review_count: row.review_count
        };

        parkingLotDetails.warden = {
          fname: row.warden_fname,
          lname: row.warden_lname,
        };
      }

      // Add reviews to the array
      if (row.review_id) {
        parkingLotDetails.reviews.push({
          id: row.review_id,
          driver_id: row.driver_id,
          rating: row.review_rating,
          review: row.review_text,
          created_at: row.review_created_at,
          driver_fname: row.driver_fname,
          driver_lname: row.driver_lname,
          profile_pic: row.driver_profile_pic
        });
      }
    });

    // Fetch slot prices
    const slotPricesQuery = `SELECT * FROM slot_price;`; // Note: Adjusted query to fetch all slot prices
    const slotPricesResult = await pool.query(slotPricesQuery);

    parkingLotDetails.slotPrices = slotPricesResult.rows.map((row) => ({
      slot_id: row.slot_id,
      type: row.type,
      amount_per_slot: row.amount_per_slot,
    }));

    console.log(parkingLotDetails);
    res.json({ data: parkingLotDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

exports.deactivateParkingLot = async (req, res) => {
  const { id } = req.params;

  try {
    // Start a transaction
    await pool.query('BEGIN');

    // Update the parking lot's status column to 'Inactive'
    const updateParkingLotQuery = `
      UPDATE parking_lot
      SET status = 'Inactive'
      WHERE lot_id = $1
      RETURNING *;
    `;

    const updateResult = await pool.query(updateParkingLotQuery, [id]);

    if (updateResult.rows.length === 0) {
      await pool.query('ROLLBACK');
      return res.status(404).json({ message: 'Parking lot not found' });
    }

    // Commit the transaction
    await pool.query('COMMIT');

    res.status(200).json({
      message: 'Parking lot status updated to Inactive successfully',
      parkingLot: updateResult.rows[0]
    });
  } catch (error) {
    // Rollback the transaction in case of error
    await pool.query('ROLLBACK');
    console.error('Error updating parking lot status:', error);
    res.status(500).json({ message: 'Failed to update parking lot status' });
  }
};

exports.activateParkingLot = async (req, res) => {
  const { id } = req.params;

  try {
    // Start a transaction
    await pool.query('BEGIN');

    // Update the parking lot's status column to 'Active'
    const updateParkingLotQuery = `
      UPDATE parking_lot
      SET status = 'active'
      WHERE lot_id = $1
      RETURNING *;
    `;

    const updateResult = await pool.query(updateParkingLotQuery, [id]);

    if (updateResult.rows.length === 0) {
      await pool.query('ROLLBACK');
      return res.status(404).json({ message: 'Parking lot not found' });
    }

    // Commit the transaction
    await pool.query('COMMIT');

    res.status(200).json({
      message: 'Parking lot status updated to Active successfully',
      parkingLot: updateResult.rows[0]
    });
  } catch (error) {
    // Rollback the transaction in case of error
    await pool.query('ROLLBACK');
    console.error('Error updating parking lot status:', error);
    res.status(500).json({ message: 'Failed to update parking lot status' });
  }
};






