const pool = require('../db');

const getVehicles = async (req,res) => {
    try {
        const user_id = req.user;

        //Getting the driverID from the userID

        const driverDetails = await pool.query
            ("SELECT driver_id FROM driver WHERE user_id = $1", [user_id]);

        if(driverDetails.rows.length ===0 ){
            return res.status(404).json({message: "Driver not found for this user"});
        }    
        
        const driver_id = driverDetails.rows[0].driver_id;

        
        //Query to get driver details

        const result = await pool.query(
            "SELECT vehicle.vehicle_id, vehicle.vehicle_number, vehicle.name, vehicle.type_id FROM driver_vehicle JOIN vehicle ON driver_vehicle.vehicle_id = vehicle.vehicle_id WHERE driver_vehicle.driver_id = $1",
            [driver_id]
        );

        if(result.rows.length===0){
            return res.status(404).json({message: "No vehicles found for this driver"});
        }

        
        return res.status(200).json({
            message:"Success",
            data: result.rows,
            driver_id: driver_id
        })
        

    } catch (error) {
        console.error(error);
    }
}

const addVehicle = async (req, res) => {
    try {
        const user_id = req.user; // Assuming req.user contains the user_id of the logged-in user
        const { vehicle_number, name, type_id } = req.body;

        console.log("Request received");

        // Fetch the username of the current user (second user)
        const currentUserQuery = await pool.query(
            "SELECT fname, lname FROM driver JOIN users ON driver.user_id = users.user_id WHERE users.user_id = $1",
            [user_id]
        );
        

        if (currentUserQuery.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const currentUserFirstname = currentUserQuery.rows[0].fname;
        const currentUserLastname = currentUserQuery.rows[0].lname;
        const currentUsername = `${currentUserFirstname} ${currentUserLastname}`;

        // Check if the vehicle already exists
        const existingVehicleQuery = await pool.query(
            `SELECT v.vehicle_id, dv.driver_id, u.user_id 
             FROM vehicle v
             JOIN driver_vehicle dv ON v.vehicle_id = dv.vehicle_id
             JOIN driver d ON dv.driver_id = d.driver_id
             JOIN users u ON d.user_id = u.user_id
             WHERE v.vehicle_number = $1
             ORDER BY v.vehicle_id ASC
             LIMIT 1`,
            [vehicle_number]
        );

        if (existingVehicleQuery.rows.length > 0) {
            // Vehicle already exists, notify the first user
            const { user_id: firstUserId } = existingVehicleQuery.rows[0];
            const notificationTitle = "Vehicle Number Re-Registered";
            const notificationMessage = `A user named ${currentUsername} has added your vehicle (${vehicle_number}) to their account.`;

            await pool.query(
                "INSERT INTO notifications (receiver_id, title, message) VALUES ($1, $2, $3)",
                [firstUserId, notificationTitle, notificationMessage]
            );
        }

        // Getting the driverID from the userID
        const driverDetails = await pool.query(
            "SELECT driver_id FROM driver WHERE user_id = $1",
            [user_id]
        );

        if (driverDetails.rows.length === 0) {
            return res.status(404).json({ message: "Driver not found for this user" });
        }

        const driver_id = driverDetails.rows[0].driver_id;

        // Inserting the new vehicle
        const newVehicle = await pool.query(
            "INSERT INTO vehicle (vehicle_number, name, type_id) VALUES ($1, $2, $3) RETURNING vehicle_id",
            [vehicle_number, name, type_id]
        );

        const vehicle_id = newVehicle.rows[0].vehicle_id;

        // Associating the new vehicle with the driver
        await pool.query(
            "INSERT INTO driver_vehicle (driver_id, vehicle_id) VALUES ($1, $2)",
            [driver_id, vehicle_id]
        );

        // Sending a notification to the current user
        const notificationTitle = "Vehicle Added";
        const notificationMessage = `Your ${name} (${vehicle_number}) has been successfully added. Now you can park using this vehicle.`;

        await pool.query(
            "INSERT INTO notifications (receiver_id, title, message) VALUES ($1, $2, $3)",
            [user_id, notificationTitle, notificationMessage]
        );

        return res.status(201).json({
            message: "Vehicle added successfully",
            data: { vehicle_id, vehicle_number, name, type_id },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};







module.exports = {
    getVehicles,
    addVehicle
}