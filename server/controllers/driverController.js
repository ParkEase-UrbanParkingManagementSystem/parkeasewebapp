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

        

        res.status(200).json({
            message: "Success",
            data: combinedDetails.rows[0]
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server Error" });
    }
}
