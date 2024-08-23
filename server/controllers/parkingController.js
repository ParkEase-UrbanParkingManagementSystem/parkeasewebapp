const pool = require('../db');

exports.getParkingDetails = async (req, res) => {
    const client = await pool.connect();

    try {
        const user_id = req.user;

        // Get the driver_id based on the user_id
        const driverIdQuery = await client.query(`
            SELECT driver_id FROM driver WHERE user_id = $1`, [user_id]);

        if (driverIdQuery.rows.length === 0) {
            return res.status(404).json({ message: "No driver found for this user" });
        }

        const driver_id = driverIdQuery.rows[0].driver_id;

        // Get the parking details
        const detailsQuery = await client.query(`
            SELECT
                w.fname AS warden_fname,
                w.lname AS warden_lname,
                v.vehicle_id,
                v.name AS vehicle_name,
                v.vehicle_number,
                v.type_id,
                d.driver_id,
                p.in_time,
                p.out_time,
                w.warden_id,
                u.city AS warden_city,
                u.user_id AS warden_userID,
                u.email,
                u.contact AS warden_contact,
                pl.lot_id,
                pl.name AS lot_name,
                pl.city AS lot_city,
                ta.amount_per_vehicle AS parking_toll_amount
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
                parking_lot pl ON p.lot_id = pl.lot_id
            JOIN
                toll_amount ta ON pl.lot_id = ta.lot_id AND v.type_id = ta.type_id
            WHERE
                d.driver_id = $1
                AND v.isparked = true
                AND p.out_time IS NULL
                AND p.iscompleted = false;
        `, [driver_id]);
        
        

        if (detailsQuery.rows.length === 0) {
            return res.status(200).json({ message: "No parking details found", data: null });
        }

        console.log("Ah haloooo",detailsQuery.rows[0]);

        return res.status(200).json({
            message: "Success",
            data: detailsQuery.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    } finally {
        client.release();
    }
};


exports.getAfterParkingDetails = async (req, res) => {
    const client = await pool.connect();

    try {
        const user_id = req.user;

        // Get the driver_id based on the user_id
        const driverIdQuery = await client.query(`
            SELECT driver_id FROM driver WHERE user_id = $1`, [user_id]);

        if (driverIdQuery.rows.length === 0) {
            return res.status(404).json({ message: "No driver found for this user" });
        }

        const driver_id = driverIdQuery.rows[0].driver_id;

        // Get the parking details
        const detailsQuery = await client.query(`
            SELECT
                w.fname AS warden_fname,
                w.lname AS warden_lname,
                v.vehicle_id,
                v.name AS vehicle_name,
                v.vehicle_number,
                v.type_id,
                d.driver_id,
                p.in_time,
                p.out_time,
                w.warden_id,
                u.city AS warden_city,
                u.user_id AS warden_userID,
                u.email,
                u.contact AS warden_contact,
                pl.lot_id,
                pl.name AS lot_name,
                pl.city AS lot_city
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
                parking_lot pl ON p.lot_id = pl.lot_id
            WHERE
                d.driver_id = $1
                AND v.isparked = true
                AND p.out_time IS NULL
                AND p.iscompleted = false;
        `, [driver_id]);
        

        if (detailsQuery.rows.length === 0) {
            return res.status(404).json({ message: "Could not find details of this parking instance" });
        }

        console.log("Ah haloooo",detailsQuery.rows[0]);

        return res.status(200).json({
            message: "Success",
            data: detailsQuery.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    } finally {
        client.release();
    }
};
