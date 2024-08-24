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



exports.getAfterParkingDetailsMobile = async (req, res) => {
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
                p.instance_id,
                p.in_time,
                p.out_time,
                p.toll_amount,
                w.warden_id,
                u.city AS warden_city,
                u.user_id AS warden_userID,
                u.email,
                u.contact AS warden_contact,
                pl.lot_id,
                pl.name AS lot_name,
                pl.city AS lot_city,
                pp.no_of_points AS parkpoints,
                pw.available_amount AS wallet
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
                parkpoints pp ON d.driver_id = pp.driver_id
            JOIN
                payparkwallet pw ON d.driver_id = pw.driver_id    
            WHERE
                d.driver_id = $1
                AND p.out_time IS NOT NULL
                AND p.iscompleted = false;
        `, [driver_id]);
        

        if (detailsQuery.rows.length === 0) {
            console.log("Data na machan")
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

exports.payByParkPoints = async (req, res) => {
    const client = await pool.connect();

    try {
        const user_id = req.user;
        const {amount, method, instance_id } = req.body;

        // Get the driver_id based on the user_id
        const driverIdQuery = await client.query(`
            SELECT driver_id FROM driver WHERE user_id = $1`, [user_id]);

        if (driverIdQuery.rows.length === 0) {
            return res.status(404).json({ message: "No driver found for this user" });
        }

        const driver_id = driverIdQuery.rows[0].driver_id;

        // Get the parkpoints of the driver
        const parkPointsQuery = await client.query(`
            SELECT no_of_points FROM parkpoints WHERE driver_id = $1`, [driver_id]);

        if (parkPointsQuery.rows.length === 0) {
            return res.status(404).json({ message: "No parkpoints found for this driver" });
        }

        const parkPoints = parkPointsQuery.rows[0].no_of_points;

        if (parkPoints < amount) {
            return res.status(400).json({ message: "Insufficient parkpoints" });
        }

        // Deduct the parkpoints
        const newParkPoints = parkPoints - amount;
        await client.query(`
            UPDATE parkpoints SET no_of_points = $1 WHERE driver_id = $2`, [newParkPoints, driver_id]);

            // Update parking_instance table
        const updateQuery = await client.query(`
            UPDATE parking_instance
            SET iscompleted = true,
                method_id = $1
            WHERE instance_id = $2
        `, [method, instance_id]);
        console.log(instance_id)

        if (updateQuery.rowCount === 0) {
            return res.status(404).json({ message: "Parking instance not found or already updated" });
        }

        return res.status(200).json({ message: "Payment successful" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    } finally {
        client.release();
    }
}

exports.payByWallet = async (req, res) => {
    const client = await pool.connect();

    try {
        const user_id = req.user;
        const { amount, method, instance_id } = req.body; // Ensure instance_id is included in the request body

        if (!instance_id) {
            return res.status(400).json({ message: "Instance ID is required" });
        }

        // Get the driver_id based on the user_id
        const driverIdQuery = await client.query(`
            SELECT driver_id FROM driver WHERE user_id = $1`, [user_id]);

        if (driverIdQuery.rows.length === 0) {
            return res.status(404).json({ message: "No driver found for this user" });
        }

        const driver_id = driverIdQuery.rows[0].driver_id;

        // Get the wallet amount of the driver
        const walletQuery = await client.query(`
            SELECT available_amount FROM payparkwallet WHERE driver_id = $1`, [driver_id]);

        if (walletQuery.rows.length === 0) {
            return res.status(404).json({ message: "No wallet found for this driver" });
        }

        const walletAmount = walletQuery.rows[0].available_amount;

        if (walletAmount < amount) {
            return res.status(400).json({ message: "Insufficient wallet balance" });
        }

        // Deduct the wallet amount
        const newWalletAmount = walletAmount - amount;
        await client.query(`
            UPDATE payparkwallet SET available_amount = $1 WHERE driver_id = $2`, [newWalletAmount, driver_id]);

        // Update parking_instance table
        const updateQuery = await client.query(`
            UPDATE parking_instance
            SET iscompleted = true,
                method_id = $1
            WHERE instance_id = $2
        `, [method, instance_id]);
        

        if (updateQuery.rowCount === 0) {
            return res.status(404).json({ message: "Parking instance not found or already updated" });
        }

        return res.status(200).json({ message: "Payment successful" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    } finally {
        client.release();
    }
}

exports.getRecentParkingLotsHome = async (req, res) => {
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

        // Get the recent parking lots
        const recentParkingQuery = await client.query(`
            SELECT
                MAX(p.out_time) AS out_time,
                MAX(p.in_time) AS in_time,
                pl.lot_id AS lot_id,
                pl.name AS lot_name,
                pl.bike_capacity AS bike_capacity,
                pl.car_capacity AS car_capacity,
                pl.addressNO AS addressNO,
                pl.street1 AS street1,
                pl.street2 AS street2,
                pl.city AS city,
                pl.district AS district,
                pl.description AS description,
                pl.status AS status,
                pl.sketch AS sketch,
                pl.images AS images
            FROM
                driver_vehicle dv
            JOIN
                parking_instance p ON dv.driver_vehicle_id = p.driver_vehicle_id
            JOIN
                parking_lot pl ON p.lot_id = pl.lot_id
            WHERE
                dv.driver_id = $1
                AND p.out_time IS NOT NULL
                AND p.iscompleted = true
            GROUP BY
                pl.lot_id
            ORDER BY
                MAX(p.out_time) DESC
            LIMIT 3;
        `, [driver_id]);
        
        

        if (recentParkingQuery.rows.length === 0) {
            return res.status(200).json({ message: "No recent parking lots found", data: [] });
        }

        console.log(recentParkingQuery.rows);

        return res.status(200).json({
            message: "Success",
            data: recentParkingQuery.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    } finally {
        client.release();
    }
}
