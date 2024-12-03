const pool = require("../db"); // Adjust the path as needed
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

exports.parkingLotAdd = [
  upload.fields([
    { name: "sketch", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]), // Up to 10 images
  async (req, res) => {
    const client = await pool.connect();
    try {
      const pmc_pmc_user_id = req.user;

      if (!pmc_pmc_user_id) {
        return res
          .status(400)
          .json({ error: "User ID is missing from request" });
      }

      const pmcQuery = await client.query(
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
        carCapacity,
        addressNo,
        street1,
        street2,
        city,
        district,
        link,
        description,
        bikePrice,
        carPrice,
        threeWheelerPrice,
        lorryPrice,
      } = req.body;

      bike_capacity_available = bikeCapacity;
      car_capacity_available = carCapacity;

      const fullCapacity = Number(bikeCapacity) + Number(carCapacity);

      const formatImagePaths = (paths) =>
        paths.map((path) => path.replace(/\\/g, "/"));
      const imagePaths = formatImagePaths(
        req.files["images"] ? req.files["images"].map((file) => file.path) : []
      );
      const sketchPath = req.files["sketch"]
        ? req.files["sketch"][0].path.replace(/\\/g, "/")
        : null;

      console.log(imagePaths);
      console.log(sketchPath);

      const insertParkingLotQuery = `
        INSERT INTO parking_lot (
          pmc_id, name, bike_capacity, car_capacity, full_capacity,
          addressno, street1, street2, city, district, link, description, sketch, images, bike_capacity_available, car_capacity_available, status
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, 'not_approved')
        RETURNING lot_id;
      `;

      const parkingLotValues = [
        pmc_id,
        name,
        bikeCapacity,
        carCapacity,
        fullCapacity,
        addressNo,
        street1,
        street2,
        city,
        district,
        link,
        description,
        sketchPath,
        JSON.stringify(imagePaths),
        bike_capacity_available,
        car_capacity_available,
      ];

      const parkingLotResult = await client.query(
        insertParkingLotQuery,
        parkingLotValues
      );
      const lot_id = parkingLotResult.rows[0].lot_id;

      const insertTollAmountQuery = `
        INSERT INTO toll_amount (lot_id, type_id, amount_per_vehicle)
        VALUES 
          ($1, 1, $2),
          ($1, 2, $3),
          ($1, 3, $4),
          ($1, 4, $5)
        RETURNING *;
      `;

      const tollAmountValues = [
        lot_id,
        carPrice,
        bikePrice,
        threeWheelerPrice,
        lorryPrice,
      ];

      await client.query(insertTollAmountQuery, tollAmountValues);

      // Insert a notification for the added parking lot awaiting admin approval
      const insertNotificationQuery = `
        INSERT INTO notifications (receiver_id, sender_id, title, message, target_route)
        VALUES ($1, NULL, 'Parking Lot - Added', 'The parking location has been added, but it is awaiting approval from the admin.', '/pmc-dashboard')
        RETURNING *;
      `;
      await client.query(insertNotificationQuery, [pmc_pmc_user_id]);

      res
        .status(201)
        .json({ message: "Parking lot and prices added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      client.release();
    }
  },
];


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

  console.log("ID", id);

  if (!id) {
    return res.status(400).json({ message: "Lot ID is required or Invalid" });
  }

  try {
    // Query to get parking lot details, reviews, and vehicle type prices
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
        l.sketch,
        l.images,
        (SELECT COUNT(*) FROM parkinglotreviews WHERE lot_id = l.lot_id) AS review_count,
        t.type_name AS vehicle_type_name,
        ta.amount_per_vehicle
      FROM parking_lot l
      LEFT JOIN warden_parking_lot wp ON l.lot_id = wp.lot_id
      LEFT JOIN warden w ON wp.warden_id = w.warden_id
      LEFT JOIN parkinglotreviews r ON l.lot_id = r.lot_id
      LEFT JOIN driver d ON r.driver_id = d.driver_id
      LEFT JOIN toll_amount ta ON l.lot_id = ta.lot_id
      LEFT JOIN vehicle_type t ON ta.type_id = t.vehicle_type_id
      WHERE l.lot_id = $1;
    `;

    const lotResult = await pool.query(lotQuery, [id]);

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

    const slotPricesMap = new Map();
    const reviewsSet = new Map(); // To track unique reviews

    lotResult.rows.forEach((row) => {
      if (!parkingLotDetails.lot) {
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
          car_capacity_available: row.car_capacity_available,
          bike_capacity_available: row.bike_capacity_available,
          full_capacity: row.full_capacity,
          description: row.description,
          status: row.status,
          review_count: row.review_count,
          car_available: row.car_capacity_available,
          bike_available: row.bike_capacity_available,
          latitude: row.latitude,
          longitude: row.longitude,
          sketch: row.sketch,
          images: Array.isArray(row.images)
            ? row.images
            : typeof row.images === "string"
            ? row.images.split(",")
            : [],
        };

        parkingLotDetails.warden = {
          fname: row.warden_fname,
          lname: row.warden_lname,
        };
      }

      // Add reviews to the set
      if (row.review_id && !reviewsSet.has(row.review_id)) {
        reviewsSet.set(row.review_id, {
          id: row.review_id,
          driver_id: row.driver_id,
          rating: row.review_rating,
          review: row.review_text,
          created_at: row.review_created_at,
          driver_fname: row.driver_fname,
          driver_lname: row.driver_lname,
          
        });
      }
      // Add slot prices to the map
      if (row.vehicle_type_name && row.amount_per_vehicle) {
        slotPricesMap.set(row.vehicle_type_name, row.amount_per_vehicle);
      }
    });

    // Convert map to array for slotPrices
    parkingLotDetails.slotPrices = Array.from(slotPricesMap.entries()).map(
      ([type_name, amount_per_vehicle]) => ({
        type_name,
        amount_per_vehicle,
      })
    );

    // Convert reviews set to array
    parkingLotDetails.reviews = Array.from(reviewsSet.values());

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
    await pool.query("BEGIN");

    // Update the parking lot's status column to 'Inactive'
    const updateParkingLotQuery = `
      UPDATE parking_lot
      SET status = 'Inactive'
      WHERE lot_id = $1
      RETURNING *;
    `;

    const updateResult = await pool.query(updateParkingLotQuery, [id]);

    if (updateResult.rows.length === 0) {
      await pool.query("ROLLBACK");
      return res.status(404).json({ message: "Parking lot not found" });
    }

    // Commit the transaction
    await pool.query("COMMIT");

    res.status(200).json({
      message: "Parking lot status updated to Inactive successfully",
      parkingLot: updateResult.rows[0],
    });
  } catch (error) {
    // Rollback the transaction in case of error
    await pool.query("ROLLBACK");
    console.error("Error updating parking lot status:", error);
    res.status(500).json({ message: "Failed to update parking lot status" });
  }
};

exports.activateParkingLot = async (req, res) => {
  const { id } = req.params;

  try {
    // Start a transaction
    await pool.query("BEGIN");

    // Update the parking lot's status column to 'Active'
    const updateParkingLotQuery = `
      UPDATE parking_lot
      SET status = 'active'
      WHERE lot_id = $1
      RETURNING *;
    `;

    const updateResult = await pool.query(updateParkingLotQuery, [id]);

    if (updateResult.rows.length === 0) {
      await pool.query("ROLLBACK");
      return res.status(404).json({ message: "Parking lot not found" });
    }

    // Commit the transaction
    await pool.query("COMMIT");

    res.status(200).json({
      message: "Parking lot status updated to Active successfully",
      parkingLot: updateResult.rows[0],
    });
  } catch (error) {
    // Rollback the transaction in case of error
    await pool.query("ROLLBACK");
    console.error("Error updating parking lot status:", error);
    res.status(500).json({ message: "Failed to update parking lot status" });
  }
};

exports.getParkingLotCount = async (req, res) => {
  const client = await pool.connect();

  try {
    const user_id = req.user;

    if (!user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Query to fetch the PMC ID associated with the user
    const queryPMC = "SELECT pmc_id FROM pmc WHERE user_id = $1";
    const resultPMC = await client.query(queryPMC, [user_id]);

    if (resultPMC.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const pmc_id = resultPMC.rows[0].pmc_id;

    // Query to fetch the total count of parking lots for this PMC
    const queryCount = `
      SELECT COUNT(*) AS total_parking_lots
      FROM parking_lot
      WHERE pmc_id = $1 AND status = 'active';
    `;

    const resultCount = await client.query(queryCount, [pmc_id]);

    const totalParkingLots = resultCount.rows[0]?.total_parking_lots || 0;

    res.status(200).json({ data: { totalParkingLots } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release();
  }
};

exports.getParkingCapacity = async (req, res) => {
  try {
    const user_id = req.user;

    if (!user_id) {
      console.error("User ID is undefined");
      return res.status(400).json({ message: "Valid User ID is required" });
    }

    // Get PMC ID for the user
    const pmcQuery = await pool.query(
      "SELECT pmc_id FROM pmc WHERE user_id = $1",
      [user_id]
    );

    if (pmcQuery.rows.length === 0) {
      return res.status(404).json({ message: "PMC not found for this user" });
    }

    const pmc_id = pmcQuery.rows[0].pmc_id;

    // Query to get the total car and bike capacity separately
    const queryText = `
          SELECT 
              SUM(car_capacity) AS total_car_capacity,
              SUM(bike_capacity) AS total_bike_capacity
          FROM parking_lot
          WHERE pmc_id = $1
      `;

    // Fetch the total capacities
    const result = await pool.query(queryText, [pmc_id]);

    const totalCarCapacity = parseInt(
      result.rows[0]?.total_car_capacity || "0",
      10
    );
    const totalBikeCapacity = parseInt(
      result.rows[0]?.total_bike_capacity || "0",
      10
    );

    return res.status(200).json({
      message: "Success",
      data: { totalCarCapacity, totalBikeCapacity },
    });
  } catch (error) {
    console.error("Error fetching parking capacities:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getRevenueByParkingLot = async (req, res) => {
  try {
    // Get the user ID from the authenticated request
    const user_id = req.user;
    if (!user_id) {
      return res.status(400).json({ message: "Valid User ID is required" });
    }

    // Retrieve the PMC ID for the authenticated user
    const pmcQuery = await pool.query(
      "SELECT pmc_id FROM pmc WHERE user_id = $1",
      [user_id]
    );

    if (pmcQuery.rows.length === 0) {
      return res.status(404).json({ message: "PMC not found for this user" });
    }

    const pmc_id = pmcQuery.rows[0].pmc_id;

    // Query to get revenue data
    const query = `
      SELECT 
        p_l.name AS parking_lot_name,
        SUM(p_i.toll_amount) AS total_revenue
      FROM parking_instance p_i
      JOIN parking_lot p_l ON p_i.lot_id = p_l.lot_id
      WHERE p_l.pmc_id = $1
      GROUP BY p_l.name
      ORDER BY total_revenue DESC;
    `;

    const result = await pool.query(query, [pmc_id]);

    return res.status(200).json({
      message: "Success",
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getPeakParkingHours = async (req, res) => {
  try {
    const user_id = req.user;

    if (!user_id) {
      return res.status(400).json({ message: "Valid User ID is required" });
    }

    // Get PMC ID for the user
    const pmcQuery = await pool.query(
      "SELECT pmc_id FROM pmc WHERE user_id = $1",
      [user_id]
    );

    if (pmcQuery.rows.length === 0) {
      return res.status(404).json({ message: "PMC not found for this user" });
    }

    const pmc_id = pmcQuery.rows[0].pmc_id;

    // Query to count vehicles by hour
    const query = `
      SELECT 
        EXTRACT(HOUR FROM in_time) AS hour,
        COUNT(*) AS vehicle_count
      FROM parking_instance
      WHERE lot_id IN (
          SELECT lot_id FROM parking_lot WHERE pmc_id = $1
      )
      GROUP BY hour
      ORDER BY hour;
    `;

    const result = await pool.query(query, [pmc_id]);

    return res.status(200).json({
      message: "Success",
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching peak parking hours:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getTotalRevenue = async (req, res) => {
  try {
    const user_id = req.user;

    if (!user_id) {
      return res.status(400).json({ message: "Valid User ID is required" });
    }

    // Get PMC ID for the user
    const pmcQuery = await pool.query(
      "SELECT pmc_id FROM pmc WHERE user_id = $1",
      [user_id]
    );

    if (pmcQuery.rows.length === 0) {
      return res.status(404).json({ message: "PMC not found for this user" });
    }

    const pmc_id = pmcQuery.rows[0].pmc_id;

    // Query to calculate the total revenue
    const revenueQuery = await pool.query(
      `SELECT COALESCE(SUM(toll_amount), 0) AS total_revenue
       FROM parking_instance
       WHERE lot_id IN (
         SELECT lot_id FROM parking_lot WHERE pmc_id = $1
       );`,
      [pmc_id]
    );

    const totalRevenue = parseFloat(revenueQuery.rows[0]?.total_revenue || 0);

    return res.status(200).json({
      message: "Success",
      data: { totalRevenue },
    });
  } catch (error) {
    console.error("Error fetching total revenue:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


exports.getParkingLotRevenue = async (req, res) => {

console.log("Badu awa mcahannacnannnnnnnnnnnnnnnnnnnnn")

  const { id } = req.params; // lot_id from the route parameter

  console.log("Parking Lot ID:", id);

  if (!id) {
    return res.status(400).json({ message: "Parking Lot ID is required or invalid" });
  }

  try {
    // Query to calculate daily, monthly, and yearly revenue
    const revenueQuery = `
      SELECT 
        COALESCE(SUM(CASE WHEN DATE(in_time) = CURRENT_DATE THEN toll_amount ELSE 0 END), 0) AS daily_revenue,
        COALESCE(SUM(CASE WHEN DATE_TRUNC('month', in_time) = DATE_TRUNC('month', CURRENT_DATE) THEN toll_amount ELSE 0 END), 0) AS monthly_revenue,
        COALESCE(SUM(CASE WHEN DATE_TRUNC('year', in_time) = DATE_TRUNC('year', CURRENT_DATE) THEN toll_amount ELSE 0 END), 0) AS yearly_revenue
      FROM parking_instance
      WHERE lot_id = $1 AND iscompleted = true;
    `;

    const revenueResult = await pool.query(revenueQuery, [id]);

    if (revenueResult.rows.length === 0) {
      return res.status(404).json({ message: "No revenue data found for this parking lot" });
    }

    // Extract revenue details
    const { daily_revenue, monthly_revenue, yearly_revenue } =
      revenueResult.rows[0];

    const revenueDetails = {
      parking_lot_id: id,
      daily_revenue: parseFloat(daily_revenue),
      monthly_revenue: parseFloat(monthly_revenue),
      yearly_revenue: parseFloat(yearly_revenue),
    };

    console.log("Revenue Details:", revenueDetails);

    res.json({ data: revenueDetails });
  } catch (error) {
    console.error("Error fetching revenue details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




