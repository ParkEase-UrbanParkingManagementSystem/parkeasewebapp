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

        console.log("Hello");
        
        //Query to get driver details

        const result = await pool.query(
            "SELECT vehicle.vehicle_id, vehicle.vehicle_number, vehicle.name, vehicle.type_id FROM driver_vehicle JOIN vehicle ON driver_vehicle.vehicle_id = vehicle.vehicle_id WHERE driver_vehicle.driver_id = $1",
            [driver_id]
        );

        if(result.rows.length===0){
            return res.status(404).json({message: "No vehicles found for this driver"})
        }

        return res.status(200).json({
            message:"Success",
            data: result.rows
        })
        

    } catch (error) {
        console.error(error);
    }
}

const addVehicle = async (req, res) => {
    try {
        const user_id = req.user; // Assuming req.user contains the user_id of the logged-in user
        const { vehicle_number, name, type_id } = req.body;

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

        return res.status(201).json({
            message: "Vehicle added successfully",
            data: { vehicle_id, vehicle_number, name, type_id }
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