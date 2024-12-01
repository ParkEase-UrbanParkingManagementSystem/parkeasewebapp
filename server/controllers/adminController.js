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
        // Update the parking lot with the provided latitude and longitude
        const updateQuery = `
            UPDATE parking_lot 
            SET latitude = $1, longitude = $2
            WHERE lot_id = $3
            RETURNING *;
        `;
        
        const result = await client.query(updateQuery, [latitude, longitude, id]);

        console.log("Parking location submitted successfully:");

        // If no parking lot was updated, send a 404 response
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Parking lot not found or already updated." });
        }

        console.log("Parking location updated successfully:", result.rows[0]);
        return res.status(200).json({ message: "Parking location updated successfully", parkingLot: result.rows[0] });

    } catch (error) {
        console.log("Error updating parking location:", error);
        console.error("Error updating parking location:", error);
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





