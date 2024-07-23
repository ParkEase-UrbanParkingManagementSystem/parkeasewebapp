const pool = require('../db');

exports.getDriverDetails = async (req, res) => {
        try {

            const user_id = req.user;

            const driverDetails = await pool.query(
                "SELECT * FROM driver WHERE user_id = $1",[user_id]);
            
            const userDetails = await pool.query(
                "SELECT * FROM users WHERE user_id = $1",[user_id]);

            if(driverDetails.rows.length === 0 || userDetails.rows.length === 0){
                res.status(404).json({msg: "Driver details not found"});
            }    

            const combinedDetails = {
                driver : driverDetails.rows[0],
                user: userDetails.rows[0]
            }

            console.log(combinedDetails)

            res.status(200).json({
                message: "Success",
                data: combinedDetails
            });

        } catch (error) {
            console.error(error.message);
        }
}