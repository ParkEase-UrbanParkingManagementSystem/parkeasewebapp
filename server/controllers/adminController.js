const pool = require('../db');


exports.getAcceptedParking = async (req, res) => {
    const client = await pool.connect();
  
    console.log("Request Recieved");
    console.log("Meka thamai badu Acceptedddddddddddddddddddddddddddddddd");
  
    try {
        // Query to get all parking lots where latitude and longitude are NOT NULL
        const result = await client.query(`
            SELECT lot_id, name, latitude, longitude, addressno, street1, street2, city, district, car_capacity, bike_capacity
            FROM parking_lot
            WHERE latitude IS NOT NULL AND longitude IS NOT NULL
        `);
  
        // Check if any parking lot records exist
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No parking lots found with valid latitude and longitude." });
        }
  
        // Return the parking lots as a JSON array
        console.log(result.rows);
        return res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    } finally {
        client.release();
    }
  };


  exports.getPendingParking = async (req, res) => {

    const client = await pool.connect();

    console.log("Request Received");
    console.log("Processing pending parking lots...");

    try {
        // Query to get all parking lots where latitude and longitude are NULL, joined with pmc table
        const result = await client.query(`
            SELECT 
                parking_lot.lot_id, 
                parking_lot.name, 
                parking_lot.latitude, 
                parking_lot.longitude, 
                parking_lot.addressno, 
                parking_lot.street1, 
                parking_lot.street2, 
                parking_lot.city, 
                parking_lot.district, 
                parking_lot.car_capacity, 
                parking_lot.bike_capacity, 
                parking_lot.link,
                pmc.name as pmc_name
            FROM 
                parking_lot
            LEFT JOIN 
                pmc 
            ON 
                parking_lot.pmc_id = pmc.pmc_id
            WHERE 
                parking_lot.latitude IS NULL 
            AND 
                parking_lot.longitude IS NULL
        `);

        // Check if no parking lot records exist
        if (result.rows.length === 0) {
            console.log("No pending parking lots found.");
            return res.status(200).json({ message: "No pending parking lots found." });
        }

        // Return the parking lots as a JSON array
        console.log("Pending parking lots found:", result.rows);
        return res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error retrieving pending parking lots:", error);
        res.status(500).json({ message: "Server error" });
    } finally {
        client.release();
    }
};

exports.submitParking = async (req, res) => {
    console.log("Request Received");

    const client = await pool.connect();

    console.log("Request Received for submitting parking location...");

    const { id, latitude, longitude } = req.body;

    console.log("Request Received for submitting parking location...", req.body);

    console.log(id);
    console.log(latitude);
    console.log(longitude);

    if (!id || !latitude || !longitude) {
        return res.status(400).json({ message: "id, latitude, and longitude are required." });
    }

    try {
        // Begin a transaction to ensure both operations are completed
        await client.query('BEGIN');
        
        // Update the parking lot with the provided latitude and longitude
        const updateQuery = `
            UPDATE parking_lot 
            SET latitude = $1, longitude = $2, status = 'Inactive'
            WHERE lot_id = $3
            RETURNING *;
        `;
        
        const result = await client.query(updateQuery, [latitude, longitude, id]);

        console.log("Parking location submitted successfully:");

        // If no parking lot was updated, send a 404 response
        if (result.rowCount === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ message: "Parking lot not found or already updated." });
        }

        console.log("Parking location updated successfully:", result.rows[0]);

        // Fetch the user_id of the PMC associated with this parking lot
        const pmcQuery = `
            SELECT user_id 
            FROM pmc 
            WHERE pmc_id = (SELECT pmc_id FROM parking_lot WHERE lot_id = $1)
        `;
        const pmcResult = await client.query(pmcQuery, [id]);

        if (pmcResult.rowCount === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ message: "PMC not found for this parking lot." });
        }

        const receiverId = pmcResult.rows[0].user_id;

        // Fetch the parking lot name
        const parkingLotNameQuery = `
            SELECT name 
            FROM parking_lot 
            WHERE lot_id = $1
        `;
        const parkingLotNameResult = await client.query(parkingLotNameQuery, [id]);

        if (parkingLotNameResult.rowCount === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ message: "Parking lot name not found." });
        }

        const parkingLotName = parkingLotNameResult.rows[0].name;

        // Create a notification for the PMC, including the parking lot name
        const insertNotificationQuery = `
            INSERT INTO notifications (receiver_id, sender_id, title, message, target_route)
            VALUES ($1, NULL, 'Parking Lot - Approved', 'The parking location "${parkingLotName}" has been approved from our side. You can now activate the parking.', '/pmc-dashboard')
            RETURNING *;
        `;
        const notificationResult = await client.query(insertNotificationQuery, [receiverId]);

        // Commit the transaction
        await client.query('COMMIT');

        console.log("Notification created successfully:", notificationResult.rows[0]);

        // Return the success response
        return res.status(200).json({ message: "Parking location updated successfully", parkingLot: result.rows[0], notification: notificationResult.rows[0] });

    } catch (error) {
        console.log("Error updating parking location:", error);
        console.error("Error updating parking location:", error);
        await client.query('ROLLBACK');
        res.status(500).json({ message: "Server error while updating parking location" });
    } finally {
        client.release();
    }
};




exports.getPMC = async (req, res) =>{
    try {
        const pmcDetails = await pool.query(`
            SELECT 
                pmc.pmc_id, 
                pmc.name, 
                pmc.regNo, 
                users.email, 
                users.addressNo, 
                users.street_1, 
                users.street_2, 
                users.city, 
                users.province
            FROM 
                pmc
            JOIN 
                users ON pmc.user_id = users.user_id
        `);

        console.log(pmcDetails.rows);

        if (pmcDetails.rows.length === 0) {
            return res.status(404).json({ msg: "No PMCs found" });
        }

        res.status(200).json({
            message: "Success",
            data: pmcDetails.rows
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server Error" });
    }
};

exports.getCount = async (req, res) => {

    try {
        // Query to get the count of drivers
        const driverCountRes = await pool.query('SELECT COUNT(*) FROM driver');
        const driverCount = parseInt(driverCountRes.rows[0].count, 10);

        // Query to get the count of PMCs
        const pmcCountRes = await pool.query('SELECT COUNT(*) FROM pmc');
        const pmcCount = parseInt(pmcCountRes.rows[0].count, 10);

        // Query to get the count of wardens
        const wardenCountRes = await pool.query('SELECT COUNT(*) FROM warden');
        const wardenCount = parseInt(wardenCountRes.rows[0].count, 10);

        // Query to get the count of parking lots
        const parkingLotCountRes = await pool.query('SELECT COUNT(*) FROM parking_lot');
        const parkingLotCount = parseInt(parkingLotCountRes.rows[0].count, 10);

        // Query to get the count of parking instances
        const parkingInstanceCountRes = await pool.query('SELECT COUNT(*) FROM parking_instance WHERE iscompleted = FALSE');
        const parkingInstanceCount = parseInt(parkingInstanceCountRes.rows[0].count, 10);

        // Sending the response with the counts
        console.log("Driver Count", driverCount, "PMC Count", pmcCount, "Warden Count", wardenCount, "Parking Lot Count", parkingLotCount, "Parking Instance Count", parkingInstanceCount);
        res.status(200).json({
            message: "Success",
            data: {
                driverCount,
                pmcCount,
                wardenCount,
                parkingLotCount,
                parkingInstanceCount
            }
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server Error" });
    }
};


exports.inactivePMC = async (req, res) => {
    console.log("Request Received");

    const { pmc_id } = req.body; // Get the pmc_id from the request body

    if (!pmc_id) {
        return res.status(400).json({ msg: 'PMC ID is required' });
    }

    try {
        // Begin a transaction to ensure atomicity
        await pool.query('BEGIN');

        // First, update the parking lots associated with the given pmc_id to 'inactive'
        const parkingLotResult = await pool.query(`
            UPDATE parking_lot
            SET status = 'banned'
            WHERE pmc_id = $1
            RETURNING lot_id, status
        `, [pmc_id]);

        // If no parking lots are found for this PMC
        if (parkingLotResult.rows.length === 0) {
            await pool.query('ROLLBACK'); // Rollback the transaction if no parking lots found
            return res.status(404).json({ msg: 'No parking lots found for this PMC' });
        }

        // Commit the transaction
        await pool.query('COMMIT');

        // Respond with the success message
        res.status(200).json({
            message: 'Related parking lots marked as inactive successfully',
            data: parkingLotResult.rows
        });
    } catch (error) {
        console.error(error.message);
        await pool.query('ROLLBACK'); // Rollback the transaction in case of an error
        res.status(500).json({ msg: 'Server Error' });
    }
};

exports.activePMC = async (req, res) => {
    console.log("Request Received for activation");

    const { pmc_id } = req.body; // Get the pmc_id from the request body

    if (!pmc_id) {
        return res.status(400).json({ msg: 'PMC ID is required' });
    }

    try {
        // Begin a transaction to ensure atomicity
        await pool.query('BEGIN');

        // First, update the parking lots associated with the given pmc_id to 'active'
        const parkingLotResult = await pool.query(`
            UPDATE parking_lot
            SET status = 'active'
            WHERE pmc_id = $1
            RETURNING lot_id, status
        `, [pmc_id]);

        // If no parking lots are found for this PMC
        if (parkingLotResult.rows.length === 0) {
            await pool.query('ROLLBACK'); // Rollback the transaction if no parking lots found
            return res.status(404).json({ msg: 'No parking lots found for this PMC' });
        }

        // Commit the transaction
        await pool.query('COMMIT');

        // Respond with the success message
        res.status(200).json({
            message: 'Related parking lots marked as active successfully',
            data: parkingLotResult.rows
        });
    } catch (error) {
        console.error(error.message);
        await pool.query('ROLLBACK'); // Rollback the transaction in case of an error
        res.status(500).json({ msg: 'Server Error' });
    }
};

exports.getPMCAts = async (req, res) => {
    const { slug } = req.query; // Retrieve the slug (pmc_id) from the query parameters

    if (!slug) {
        return res.status(400).json({ msg: "PMC ID (slug) is required" });
    }

    try {
        const pmcDetails = await pool.query(`
            SELECT 
                pmc.pmc_id,
                pmc.name,
                pmc.regno,
                users.email,
                users.addressno,
                users.street_1,
                users.street_2,
                users.city,
                users.province,
                COUNT(parking_lot.lot_id) AS parking_lot_count,
                COALESCE(SUM(CASE WHEN pi.method_id = 1 THEN pi.toll_amount ELSE 0 END), 0) AS wallet_revenue,
                COALESCE(SUM(CASE WHEN pi.method_id = 2 THEN pi.toll_amount ELSE 0 END), 0) AS cash_revenue,
                COALESCE(SUM(CASE WHEN pi.method_id = 3 THEN pi.toll_amount ELSE 0 END), 0) AS parkpoints_revenue
            FROM 
                pmc
            LEFT JOIN 
                users ON pmc.user_id = users.user_id
            LEFT JOIN 
                parking_lot ON pmc.pmc_id = parking_lot.pmc_id
            LEFT JOIN 
                parking_instance pi ON parking_lot.lot_id = pi.lot_id
            WHERE 
                pmc.pmc_id = $1
            GROUP BY 
                pmc.pmc_id, users.user_id
        `, [slug]);

        if (pmcDetails.rows.length === 0) {
            return res.status(404).json({ msg: "PMC details not found" });
        }

        res.status(200).json({
            message: "Success",
            data: pmcDetails.rows[0], // Return the specific PMC details
        });
    } catch (error) {
        console.error("Error fetching PMC details:", error.message);
        res.status(500).json({ msg: "Server Error" });
    }
};

exports.adminToPMC = async (req, res) => {
    
    console.log("In subscriptionPaymentttttttt");
    const client = await pool.connect();

    try {
        console.log("1111111111111111111111111111111111111111111111");
        // const user_id = req.user;
        // const { session_id , pmc_id} = req.body;
        // const { amount, pmc_id } = req.body;
        const session_id = req.body.session_id;
        const pmc_id = req.body.pmc_id;
        console.log("NEWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW");
        console.log(session_id);
        console.log("pmc id id",pmc_id);



        if (!session_id) {
            return res.status(400).json({ message: "Stripe session ID is required" });
        }

        // Verify the Stripe session
        const session = await stripe.checkout.sessions.retrieve(session_id);
        console.log(session_id);

        if (session.payment_status !== 'paid') {
            return res.status(400).json({ message: "Payment not completed" });
        }

        const amount = session.amount_total / 100; // Convert from cents to whole currency units
        console.log(amount);
        // console.log(user_id);

        const sessionCreated = session.created; // Example UNIX timestamp from Stripe
        const sriLankaOffset = 5.5 * 60 * 60 * 1000; // Offset for UTC+5:30 in milliseconds
        
        // Convert to Sri Lanka time
        const sriLankaTime = new Date(sessionCreated * 1000 + sriLankaOffset);
        
        // Format the output
        const transactionDate = sriLankaTime.toISOString().split("T")[0]; // YYYY-MM-DD
        const transactionTime = sriLankaTime.toISOString().split("T")[1].split(".")[0]; // HH:MM:SS
        
        console.log(`Sri Lanka Date: ${transactionDate}`); // e.g., 2024-12-01
        console.log(`Sri Lanka Time: ${transactionTime}`); // e.g., 16:39:32

        // Insert into the transaction table
        await client.query(`
            INSERT INTO transaction (date, time, amount, pmc_id, admin)
            VALUES ($1, $2, $3, $4, $5)
        `, [transactionDate, transactionTime, amount, pmc_id, 1]);



        return res.status(200).json({ message: "Wallet top-up successful!"});



        // return res.status(200).json({ message: "Wallet top-up successful!" });

    } catch (error) {
        console.error("Error in topUpWallet:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    } finally {
        client.release();
    }
};


exports.getRevenueByPMC = async (req, res) => {
    const client = await pool.connect();

    console.log("Request Received for PMC Revenue");

    try {
        const query = `
            SELECT 
                pmc.name AS pmc_name, 
                transaction.date, 
                transaction.amount
            FROM 
                transaction
            INNER JOIN 
                pmc 
            ON 
                transaction.pmc_id = pmc.pmc_id
            WHERE 
                transaction.pmc_id IS NOT NULL
            ORDER BY 
                transaction.date DESC, pmc.name ASC;
        `;

        const result = await client.query(query);

        // Check if any records are found
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No revenue records found for PMCs." });
        }

        // Return the PMC revenue details as JSON
        console.log(result.rows);
        return res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    } finally {
        client.release();
    }
};










