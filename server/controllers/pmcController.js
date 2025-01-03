const pool = require('../db');

// Function to fetch PMC details
const getPMCDetails = async (req, res) => {
    try {
        const user_id = req.user;

        const pmcDetails = await pool.query(
            "SELECT * FROM pmc WHERE user_id = $1",
            [user_id]
        );

        const userDetails = await pool.query(
            "SELECT * FROM users WHERE user_id = $1",
            [user_id]
        );

        if (pmcDetails.rows.length === 0 || userDetails.rows.length === 0) {
            return res.status(404).json({ msg: "PMC details not found" });
        }

        // Format the registered_at field to YYYY-MM-DD
        const pmc = pmcDetails.rows[0];
        pmc.registered_at = pmc.registered_at.toISOString().split('T')[0];

        const combinedDetails = {
            pmc,
            user: userDetails.rows[0],
        };
        // console.log(combinedDetails);

        res.status(200).json({
            message: "success",
            data: combinedDetails,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};


// Function to fetch the total number of PMCs
const getTotalPMCs = async (req, res) => {
    try {
        // Query to count the total number of PMCs
        const totalPMCs = await pool.query(`
            SELECT COUNT(*) AS count FROM pmc
        `);

        res.status(200).json({
            message: "Success",
            data: totalPMCs.rows[0].count
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server Error" });
    }
}



//Function to fetch all PMCs 
const getAllPMCDetails = async (req, res) => {
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



// Function to fetch all the wardens of PMC

const getAllWardens = async (req, res) => {
    try {
        const user_id = req.user;
        const wardens = await pool.query('SELECT * FROM wardens WHERE pmc_id = $1', [user_id]);

        if (wardens.rows.length === 0) {
            return res.status(404).json({ msg: "Wardens not found" });
        }

        res.json(wardens.rows); // Returning only the rows, not the whole query object

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}

const getPmcType = async (req, res) => {
    try {
        const userID = req.user;

        if (!userID) {
            return res.status(400).json({ message: "User ID is missing" });
        }

        const result = await pool.query(
            "SELECT sector FROM pmc WHERE user_id = $1",
            [userID]
        );

        // console.log(result);

        if (result.rows.length > 0) {
            res.json({ sector: result.rows[0].sector });
        } else {
            res.status(404).json({ message: "PMC type not found" });
        }
    } catch (error) {
        console.error("Error fetching PMC type:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//To get total collections per PMC
const getTotalCollectionsByPMC = async (req, res) => {
    try {
        const totalCollections = await pool.query(`
            SELECT 
                p.name AS pmc_name, 
                CURRENT_DATE AS transaction_date,
                SUM(t.amount) AS total_collected
            FROM 
                warden w
            JOIN 
                parking_instance pi ON w.warden_id = pi.warden_id
            JOIN 
                transaction t ON pi.transaction_id = t.transaction_id
            JOIN 
                pmc p ON w.pmc_id = p.pmc_id
            WHERE 
                t.date = CURRENT_DATE
            GROUP BY 
                p.name;
        `);

        res.status(200).json({
            message: "Success",
            data: totalCollections.rows
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server Error" });
    }
};

const getPMCAnalytics = async (req, res) => {
    try {
        const analytics = await pool.query(`
            SELECT 
                COUNT(DISTINCT p.pmc_id) as total_pmcs,
                COUNT(DISTINCT w.warden_id) as total_wardens,
                COUNT(DISTINCT pl.lot_id) as total_parking_lots,
                COALESCE(SUM(pl.full_capacity), 0) as total_parking_capacity,
                COUNT(DISTINCT pi.instance_id) as total_parking_instances,
                COALESCE(SUM(pi.toll_amount), 0) as total_revenue
            FROM 
                pmc p
                LEFT JOIN warden w ON p.pmc_id = w.pmc_id
                LEFT JOIN parking_lot pl ON p.pmc_id = pl.pmc_id
                LEFT JOIN parking_instance pi ON pl.lot_id = pi.lot_id
        `);

        res.status(200).json({
            message: "Success",
            data: analytics.rows[0]
        });
    } catch (error) {
        console.error('Error in getPMCAnalytics:', error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const getNotificationsPmc = async (req, res) => {
    try {
        const userID = req.user;

        if (!userID) {
            return res.status(400).json({ message: "User ID is missing" });
        }

        const result = await pool.query(
            `
            SELECT id, sender_id, title, message, created_at, is_read, role_id, target_route 
            FROM notifications 
            WHERE receiver_id = $1
            ORDER BY created_at DESC
            `,
            [userID]
        );

        if (result.rows.length > 0) {
            res.json({ notifications: result.rows });
        } else {
            res.status(404).json({ message: "No notifications found" });
        }
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const getWardenDailyEarnings = async (req, res) => {
    
    try {
      const wardenId = req.params.id;  // Assuming wardenId is passed as a parameter in the URL
  
      if (!wardenId) {
        return res.status(400).json({ message: "Warden ID is missing" });
      }
  
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0); // Get start of today
  
      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999); // Get end of today
  
      const query = `
        SELECT
          SUM(toll_amount) AS total_earnings,
          SUM(CASE WHEN method_id = 2 THEN toll_amount ELSE 0 END) AS cash_earnings,
          COUNT(DISTINCT driver_vehicle_id) AS vehicles_assisted
        FROM parking_instance
        WHERE warden_id = $1
          AND in_time >= $2
          AND in_time <= $3
          AND iscompleted = true
      `;
  
      const values = [wardenId, todayStart, todayEnd];
  
      const result = await pool.query(query, values);
  
      if (result.rows.length > 0) {
        const { total_earnings, cash_earnings, vehicles_assisted } = result.rows[0];
        res.json({
          total_earnings: total_earnings || 0,
          cash_earnings: cash_earnings || 0,
          vehicles_assisted: vehicles_assisted || 0
        });
      } else {
        res.status(404).json({ message: "No earnings found for this warden today" });
      }
    } catch (error) {
      console.error("Error fetching warden's daily earnings:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

// Function to fetch getTotalToll
const getTotalToll = async (req, res) => {
    console.log('getTotalToll calledddddddddddddddddddddddddddddddddddddddddddddddd'); 
    const { date } = req.query; // Expecting `date` in the format YYYY-MM-DD
    console.log('date:', date);

    try {
        const query = `SELECT 
            pmc.name AS pmc_name,
            pmc.pmc_id,
            COALESCE(SUM(lot_totals.total_toll), 0) AS full_toll_amount

        FROM 
            pmc
        LEFT JOIN (
            SELECT 
                pl.pmc_id,
                SUM(pi.toll_amount) AS total_toll
            FROM 
                parking_instance pi
            JOIN 
                parking_lot pl ON pi.lot_id = pl.lot_id
            WHERE 
                pi.method_id IN (1, 3)
                AND DATE(pi.in_time) = $1
            GROUP BY 
                pl.pmc_id
        ) lot_totals ON pmc.pmc_id = lot_totals.pmc_id
        GROUP BY 
            pmc.pmc_id
        ORDER BY 
            pmc.name;
        `
        const pmcResults = await pool.query(query, [date]);
        const pmcData = pmcResults.rows;

        // Fetch transaction data to check payment status
        const transactionQuery = `
        SELECT pmc_id
        FROM transaction
        WHERE DATE(date) = $1 AND admin = true
        `;
        const transactionResults = await pool.query(transactionQuery, [date]);
        const paidPmcs = new Set(transactionResults.rows.map(row => row.pmc_id));

        // Add `paid` field to each PMC
        const response = pmcData.map(pmc => ({
        ...pmc,
        paid: paidPmcs.has(pmc.pmc_id) // Check if the PMC has a corresponding payment
        }));
        console.log('response:', response);
        res.status(200).json({
            message: "Success",
            data: response
        });
    } catch (error) {
        console.error('Error in getTotalToll:', error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};




module.exports = {
    getPMCDetails,
    getAllWardens,
    getTotalPMCs,
    getAllPMCDetails,
    getTotalCollectionsByPMC,
    getPmcType,
    getPMCAnalytics,
    getNotificationsPmc,
    getWardenDailyEarnings,
    getTotalToll    
};