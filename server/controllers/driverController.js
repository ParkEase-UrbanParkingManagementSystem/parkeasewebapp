const pool = require('../db');

exports.getDriverDetails = async (req, res) => {
    try {
        const user_id = req.user;

        // Join query to get combined details from both tables
        const combinedDetails = await pool.query(`
            SELECT 
                driver.*, 
                users.email, 
                users.addressNo, 
                users.street_1, 
                users.street_2, 
                users.city, 
                users.province, 
                users.role_id,
                users.contact
            FROM 
                driver
            JOIN 
                users ON driver.user_id = users.user_id
            WHERE 
                driver.user_id = $1
        `, [user_id]);

        if (combinedDetails.rows.length === 0) {
            return res.status(404).json({ msg: "Driver details not found" });
        }

        console.log(combinedDetails.rows[0])

        res.status(200).json({
            message: "Success",
            data: combinedDetails.rows[0]
        });

        

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server Error" });
    }
}

exports.getTotalDrivers = async (req, res) => {
    try {
        // Query to count the total number of drivers
        const totalDrivers = await pool.query(`
            SELECT COUNT(*) AS driver_count 
            FROM driver
        `);

        res.status(200).json({
            message: "Success",
            data: totalDrivers.rows[0].driver_count
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server Error" });
    }
}


//Fetch all drivers in the database
exports.getAllDrivers = async (req, res) => {
    try {
        const driversDetails = await pool.query(`
            SELECT 
                driver.driver_id, 
                driver.fname, 
                driver.lname, 
                driver.NIC, 
                driver.age, 
                driver.gender, 
                driver.profile_pic,
                users.email, 
                users.addressNo, 
                users.street_1, 
                users.street_2, 
                users.city, 
                users.province, 
                users.role_id
            FROM 
                driver
            JOIN 
                users ON driver.user_id = users.user_id
        `);

        res.status(200).json({
            message: "Success",
            data: driversDetails.rows
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server Error" });
    }
};

//Removing a driver from the database
exports.removeDriver = async (req, res) => {
    try {
        const { driver_id } = req.params;

        // Delete driver record
        await pool.query('DELETE FROM driver WHERE driver_id = $1', [driver_id]); //Should change this 

        res.status(200).json({
            message: "Driver removed successfully"
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server Error" });
    }
};
