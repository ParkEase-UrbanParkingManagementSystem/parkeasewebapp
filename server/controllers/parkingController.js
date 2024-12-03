const pool = require('../db');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
                p.method_id, 
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

        const notificationTitle = "Payment Successful - Parking Completed";
        const notificationMessage = "Your payment was successful. You have paid using ParkPoints.";

        await client.query(`
            INSERT INTO notifications (receiver_id, title, message)
            VALUES ($1, $2, $3)`, [user_id, notificationTitle, notificationMessage]);


        return res.status(200).json({ message: "Payment successful" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    } finally {
        client.release();
    }
}

// exports.payByParkPoints = async (req, res) => {
//     const client = await pool.connect();

//     try {
//         const user_id = req.user;
//         const { amount, method, instance_id } = req.body;

//         // Input validation
//         if (!amount || amount <= 0 || !method || !instance_id) {
//             return res.status(400).json({ message: "Invalid input data" });
//         }

//         // Start transaction
//         await client.query('BEGIN');

//         // Get the driver_id based on the user_id
//         const driverIdQuery = await client.query(`
//             SELECT driver_id FROM driver WHERE user_id = $1`, [user_id]);

//         if (driverIdQuery.rows.length === 0) {
//             throw new Error("No driver found for this user");
//         }

//         const driver_id = driverIdQuery.rows[0].driver_id;

//         // Get the parkpoints of the driver
//         const parkPointsQuery = await client.query(`
//             SELECT no_of_points FROM parkpoints WHERE driver_id = $1`, [driver_id]);

//         if (parkPointsQuery.rows.length === 0) {
//             throw new Error("No parkpoints found for this driver");
//         }

//         const parkPoints = parkPointsQuery.rows[0].no_of_points;

//         if (parkPoints < amount) {
//             throw new Error("Insufficient parkpoints");
//         }

//         // Deduct the parkpoints
//         const newParkPoints = parkPoints - amount;
//         const parkPointsUpdate = await client.query(`
//             UPDATE parkpoints SET no_of_points = $1 WHERE driver_id = $2`, [newParkPoints, driver_id]);

//         if (parkPointsUpdate.rowCount === 0) {
//             throw new Error("Failed to update parkpoints");
//         }

//         // Update parking_instance table
//         const updateQuery = await client.query(`
//             UPDATE parking_instance
//             SET iscompleted = true,
//                 method_id = $1
//             WHERE instance_id = $2
//         `, [method, instance_id]);

//         if (updateQuery.rowCount === 0) {
//             throw new Error("Parking instance not found or already updated");
//         }

//         // Send notification to the user
//         const notificationTitle = "Payment Successful - Parking Completed";
//         const notificationMessage = "Your payment was successful. You have paid using parkpoints.";

//         await client.query(`
//             INSERT INTO notifications (receiver_id, title, message)
//             VALUES ($1, $2, $3)`, [user_id, notificationTitle, notificationMessage]);

//         // Commit transaction
//         await client.query('COMMIT');

//         return res.status(200).json({ message: "Payment successful" });

//     } catch (error) {
//         console.error(error);

//         // Rollback transaction on error
//         await client.query('ROLLBACK');
//         res.status(500).json({ message: error.message || "Server error" });
//     } finally {
//         // Release client
//         client.release();
//     }
// };


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

        // Add 5 parkpoints to the parkpoints table
        const parkPointsUpdateQuery = await client.query(`
            UPDATE parkpoints
            SET no_of_points = no_of_points + 5
            WHERE driver_id = $1
        `, [driver_id]);

        if (parkPointsUpdateQuery.rowCount === 0) {
            return res.status(404).json({ message: "Failed to update parkpoints for this driver" });
        }

        // Add a notification for successful payment
        const notificationTitle = "Payment Successful - Parking Completed";
        const notificationMessage = "Your payment was successful. You have paid using PayPark Wallet.";

        await client.query(`
            INSERT INTO notifications (receiver_id, title, message)
            VALUES ($1, $2, $3)`, [user_id, notificationTitle, notificationMessage]);

        return res.status(200).json({ message: "Payment successful and 5 parkpoints added!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    } finally {
        client.release();
    }
};


//Pay by Cash

exports.payByCash = async (req, res) => {
    const client = await pool.connect();

    try {
        const user_id = req.user;
        const { method, instance_id } = req.body; // Ensure instance_id is included in the request body

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

        // Add 5 parkpoints to the parkpoints table
        const parkPointsUpdateQuery = await client.query(`
            UPDATE parkpoints
            SET no_of_points = no_of_points + 5
            WHERE driver_id = $1
        `, [driver_id]);

        if (parkPointsUpdateQuery.rowCount === 0) {
            return res.status(404).json({ message: "Failed to update parkpoints for this driver" });
        }

        // Add a notification for successful payment
        const notificationTitle = "Payment Successful - Parking Completed";
        const notificationMessage = "Your payment was successful. You have paid using cash.";

        await client.query(`
            INSERT INTO notifications (receiver_id, title, message)
            VALUES ($1, $2, $3)`, [user_id, notificationTitle, notificationMessage]);

        return res.status(200).json({ message: "Payment successful and 5 parkpoints added!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    } finally {
        client.release();
    }
};


//Checking Driver status

exports.checkDriverStatus = async (req, res) => {
    const client = await pool.connect();

    console.log("Checking driver status");

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
                p.iscompleted,
                p.out_time
            FROM
                driver_vehicle dv
            JOIN
                vehicle v ON dv.vehicle_id = v.vehicle_id
            JOIN
                driver d ON dv.driver_id = d.driver_id
            JOIN
                parking_instance p ON dv.driver_vehicle_id = p.driver_vehicle_id
            WHERE
                d.driver_id = $1
        `, [driver_id]);

        if (detailsQuery.rows.length === 0) {
            return res.status(200).json({ message: "No parking details found", data: "available" });
        }

        let isParked = false;
        let isPayment = false;

        for (let record of detailsQuery.rows) {
            if (!record.iscompleted && record.out_time === null) {
                isParked = true;
                break; // If parked, no need to check further
            }
            if (!record.iscompleted && record.out_time !== null) {
                isPayment = true;
                break; // If in payment, no need to check further
            }
        }

        if (isParked) {
            return res.status(200).json({ message: "Driver is in parking lot", data: "parked" });
        } else if (isPayment) {
            return res.status(200).json({ message: "Driver is in payment state", data: "payment" });
        } else {
            return res.status(200).json({ message: "Driver is available", data: "available" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    } finally {
        client.release();
    }
}






//-----------

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
                pl.images AS images,
                pl.bike_capacity_available AS bike_available,
                pl.car_capacity_available AS car_available
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

        // console.log(recentParkingQuery.rows);

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

exports.getRecentParkingInstances = async (req, res) => {
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
                p.out_time,
                p.in_time,
                p.instance_id,
                p.toll_amount AS cost,
                pl.lot_id,
                pl.name AS lot_name,
                pl.bike_capacity,
                pl.car_capacity,
                pl.addressNO,
                pl.street1,
                pl.street2,
                pl.city,
                pl.district,
                pl.description,
                pl.status,
                pl.sketch,
                pl.images,
                v.name AS vehicle_name,
                v.vehicle_number AS licensePlate,
                v.type_id
                
            FROM
                driver_vehicle dv
            JOIN
                parking_instance p ON dv.driver_vehicle_id = p.driver_vehicle_id
            JOIN
                parking_lot pl ON p.lot_id = pl.lot_id
            JOIN
                vehicle v ON dv.vehicle_id = v.vehicle_id    
            WHERE
                dv.driver_id = $1
                AND p.out_time IS NOT NULL
                AND p.iscompleted = true
            ORDER BY
                p.out_time DESC
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

exports.getParkingInstanceDetails = async (req, res) => {
    const client = await pool.connect();

    try {
        const user_id = req.user;
        const { id } = req.params;
        console.log(id);

        // Get the driver_id based on the user_id
        const driverIdQuery = await client.query(`
            SELECT driver_id FROM driver WHERE user_id = $1`, [user_id]);

        console.log(driverIdQuery.rows);

        if (driverIdQuery.rows.length === 0) {
            return res.status(404).json({ message: "No driver found for this user" });
        }

        const driver_id = driverIdQuery.rows[0].driver_id;

        console.log(driver_id);

        // Get the parking instance details
        const instanceQuery = await client.query(`
            SELECT
            dv.driver_id,
                p.instance_id,
                p.out_time,
                p.in_time,
                p.toll_amount AS cost,
                pl.lot_id,
                pl.name AS lot_name,
                pl.bike_capacity,
                pl.car_capacity,
                pl.addressNO,
                pl.street1,
                pl.street2,
                pl.city,
                pl.district,
                pl.description,
                pl.status,
                pl.sketch,
                pl.images,
                v.name AS vehicle_name,
                v.type_id,
                v.vehicle_number AS licensePlate,
                w.warden_id,
                w.fname AS warden_fname,
                w.lname AS warden_lname,
                w.profile_pic AS warden_profile_pic,
                u.contact AS warden_contact,
                u.city AS warden_city,
                pm.name AS payment_method
            FROM
                driver_vehicle dv
            JOIN
                parking_instance p ON dv.driver_vehicle_id = p.driver_vehicle_id
            JOIN
                parking_lot pl ON p.lot_id = pl.lot_id
            JOIN
                vehicle v ON dv.vehicle_id = v.vehicle_id    
            JOIN
                warden w ON p.warden_id = w.warden_id
            JOIN
                payment_method pm ON p.method_id = pm.method_id    
            JOIN
                users u ON w.user_id = u.user_id
            WHERE
                dv.driver_id = $1
                AND p.instance_id = $2
        `, [driver_id, id]);

        if (instanceQuery.rows.length === 0) {
            // console.log(instanceQuery.rows);
            return res.status(404).json({ message: "No parking instance found" });
        }

        const parkingLotId = instanceQuery.rows[0].lot_id;
        const wardenId = instanceQuery.rows[0].warden_id;

        // Get the average rating for the parking lot
        const lotRatingQuery = await client.query(`
            SELECT
                COALESCE(AVG(rating), 0) AS average_lot_rating
            FROM
                parkinglotreviews
            WHERE
                lot_id = $1
        `, [parkingLotId]);

        // Get the average rating for the warden
        const wardenRatingQuery = await client.query(`
            SELECT
                COALESCE(AVG(rating), 0) AS average_warden_rating
            FROM
                wardenreviews
            WHERE
                warden_id = $1
        `, [wardenId]);

        console.log(instanceQuery.rows[0]);

        console.log(instanceQuery.rows[0],
            lotRatingQuery.rows[0].average_lot_rating,
            wardenRatingQuery.rows[0].average_warden_rating)

        return res.status(200).json({
            message: "Success",
            data: {
                instanceDetails: instanceQuery.rows[0],
                averageLotRating: lotRatingQuery.rows[0].average_lot_rating,
                averageWardenRating: wardenRatingQuery.rows[0].average_warden_rating
            }
            
        });
        

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    } finally {
        client.release();
    }
}

// --------------------------------------------------------------------------Haven't tested yet---------------------------------------------------------------------------------------------------------

exports.topUpWallet = async (req, res) => {
    console.log("Top up walletttttttttttttttt");
    const client = await pool.connect();

    try {
        console.log("111111111111111111111");
        const user_id = req.user;
        const { session_id } = req.body;

        if (!session_id) {
            console.log('22222222222222222222222222222222222');
            return res.status(400).json({ message: "Stripe session ID is required" });
        }

        // Verify the Stripe session
        const session = await stripe.checkout.sessions.retrieve(session_id);
        console.log("333333333333333");
        console.log(session_id);

        if (session.payment_status !== 'paid') {
            console.log("44444444444444");
            return res.status(400).json({ message: "Payment not completed" });
        }

        const amount = session.amount_total / 100; // Convert from cents to whole currency units
        console.log("555555555555555");
        console.log(amount);
        console.log(user_id);

        // Get the driver_id based on the user_id
        const driverIdQuery = await client.query(`
            SELECT driver_id FROM driver WHERE user_id = $1`, [user_id]);

        if (driverIdQuery.rows.length === 0) {
            return res.status(404).json({ message: "No driver found for this user" });
        }

        const driver_id = driverIdQuery.rows[0].driver_id;
        console.log("driver foundddddddddddddddddddddddddddddddddddddddddddddddddddddddddd");
        console.log(driver_id);

        // Get the current wallet balance of the driver
        const walletQuery = await client.query(`
            SELECT available_amount FROM payparkwallet WHERE driver_id = $1`, [driver_id]);

        if (walletQuery.rows.length === 0) {
            return res.status(404).json({ message: "No wallet found for this driver" });
        }

        const walletAmount = parseFloat(walletQuery.rows[0].available_amount);

        // Add the amount to the current wallet balance
        const newWalletAmount = walletAmount + amount;

        // Update the wallet with the new balance
        await client.query(`
            UPDATE payparkwallet SET available_amount = $1 WHERE driver_id = $2`, [newWalletAmount, driver_id]);

            
        // Extract date and time from the session (Stripe sessions include `created` timestamp in UNIX format)
        // const transactionDate = new Date(session.created * 1000).toISOString().split("T")[0]; // Format as YYYY-MM-DD
        // const transactionTime = new Date(session.created * 1000).toISOString().split("T")[1]; // Format as HH:MM:SS
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
            INSERT INTO transaction (date, time, amount, pmc_id, driver_id)
            VALUES ($1, $2, $3, $4, $5)
        `, [transactionDate, transactionTime, amount, null, driver_id]);

        // Add a notification for the top-up
        const notificationTitle = "Wallet Top-Up Successful";
        const notificationMessage = `Your wallet has been successfully topped up with ${amount} units.`;

        await client.query(`
            INSERT INTO notifications (receiver_id, title, message)
            VALUES ($1, $2, $3)`, [user_id, notificationTitle, notificationMessage]);

        return res.status(200).json({ message: "Wallet top-up successful!", newBalance: newWalletAmount });

    } catch (error) {
        console.error("Error in topUpWallet:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    } finally {
        client.release();
    }
};

exports.getParkingLotsForMap = async (req, res) => {
    const client = await pool.connect();
  
    console.log("Request Recieved");
    console.log("Meka thamai badu kaaallllaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  
    try {
        // Query to get all parking lots where latitude and longitude are NOT NULL
        const result = await client.query(`
            SELECT lot_id, name, latitude, longitude, addressno, street1, street2, city, district
            FROM parking_lot
            WHERE latitude IS NOT NULL AND longitude IS NOT NULL AND status='active'
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


  exports.getParkingLotsForMapWeb = async (req, res) => {
    const client = await pool.connect();
    const { search } = req.query; // Extract search query parameter
  
    
  
    try {
      // SQL query to get parking lots based on search query
      let query = `
        SELECT lot_id, name, latitude, longitude, addressno, street1, street2, city, district, bike_capacity, car_capacity, car_capacity_available, bike_capacity_available,images
        FROM parking_lot
        WHERE latitude IS NOT NULL AND longitude IS NOT NULL AND status='active'
      `;
      
      // If search query is provided, filter parking lots by name or address
      if (search) {
        query += ` AND (name ILIKE $1 OR city ILIKE $1 OR district ILIKE $1)`;
      }
  
      const result = await client.query(query, search ? [`%${search}%`] : []);
  
      // Check if any parking lot records exist

      console.log(result.rows);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "No parking lots found with valid latitude and longitude." });
      }
  
      // Return the parking lots as a JSON array
      return res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    } finally {
      client.release();
    }
  };
  








  exports.subscriptionPayment = async (req, res) => {
    console.log("In subscriptionPaymentttttttt");
    const client = await pool.connect();

    try {
        console.log("1111111111111111111111111111111111111111111111");
        const user_id = req.user;
        const { session_id } = req.body;

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
        console.log(user_id);

        // Get the driver_id based on the user_id
        const pmcIdQuery = await client.query(`
            SELECT pmc_id FROM pmc WHERE user_id = $1`, [user_id]);

        if (pmcIdQuery.rows.length === 0) {
            return res.status(404).json({ message: "No driver found for this user" });
        }

        const pmc_id = pmcIdQuery.rows[0].pmc_id;
        console.log(pmc_id);

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
            INSERT INTO transaction (date, time, amount, pmc_id, driver_id)
            VALUES ($1, $2, $3, $4, $5)
        `, [transactionDate, transactionTime, amount, pmc_id, null]);

        return res.status(200).json({ message: "Wallet top-up successful!"});

    } catch (error) {
        console.error("Error in topUpWallet:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    } finally {
        client.release();
    }
};


exports.getAverageParkingDuration = async (req, res) => {
  try {
    // Get the user ID from the authenticated request
    const user_id = req.user;
    if (!user_id) {
      console.error("User ID is undefined");
      return res.status(400).json({ message: "Valid User ID is required" });
    }

    // Retrieve the PMC ID for the authenticated user
    const pmcQuery = await pool.query(
      "SELECT pmc_id FROM pmc WHERE user_id = $1",
      [user_id]
    );

    if (pmcQuery.rows.length === 0) {
      return res.status(404).json({ message: "PMC not found for this user" });
    }

    const pmc_id = pmcQuery.rows[0].pmc_id;

    // SQL Query to calculate the average parking duration
    const query = `
      SELECT 
        AVG(EXTRACT(EPOCH FROM (out_time - in_time))) AS avg_parking_duration 
      FROM parking_instance
      WHERE lot_id IN (
        SELECT lot_id 
        FROM parking_lot 
        WHERE pmc_id = $1
      ) AND out_time IS NOT NULL;
    `;

    const result = await pool.query(query, [pmc_id]);

    const avgParkingDuration = result.rows[0]?.avg_parking_duration || 0;

    return res.status(200).json({
      message: "Success",
      data: { avgParkingDuration },
    });
  } catch (error) {
    console.error("Error fetching average parking duration:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



