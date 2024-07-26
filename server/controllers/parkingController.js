const pool = require('../db');

exports.getParkingDetails = async (req,res) => {
    try {
        user_id = req.user;

        const driverIdQuery = await pool.query(`
            SELECT driver_id from driver WHERE user_id = $1`,[user_id]);

            if(driverIdQuery.rows.length ===0 ){
                return res.status(404),json({message:"No user found"})
            }

            const driver_id = driverIdQuery.rows[0].driver_id

        const detailsQuery = await pool.query(`SELECT
                    v.* AS vehicle_details,
                    d.* AS driver_details,
                    p.* AS parking_instance_details,
                    w.* AS warden_details,
                    u.* AS user_details,
                    pl.* AS parking_lot_details
                        FROM
                            driver_vehicle dv
                        JOIN
                            vehicle v ON dv.vehicle_id = v.vehicle_id
                        JOIN
                            driver d ON dv.driver_id = d.driver_id
                        JOIN
                            parking_instance p ON dv.driver_vehicle_id = p.driver_vehicle_id
                        JOIN
                            warden w ON p.warden_id = w.warden_id
                        JOIN
                            users u ON w.user_id = u.user_id
                        JOIN
                            parking_lot pl ON p.parking_lot_id = pl.parking_lot_id
                        WHERE
                            d.driver_id = $1
                            AND v.isparked = 1;
                    `, [driver_id])

        if(detailsQuery.rows.length === 0){
            return res.status(404).json({message: "Could not find details of this parking instance"})
        }

        return res.status(200).json({
            message: "Success",
            data: detailsQuery.rows[0]
        });
                    
    } catch (error) {
        console.error(error)
    }
}