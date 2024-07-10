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
            "SELECT * FROM users WHERE user_id = $1", [user_id]
        );

        if (pmcDetails.rows.length === 0 || userDetails.rows.length === 0) {
            return res.status(404).json({ msg: "PMC details not found" });
        }

        const combinedDetails = {

        pmc:  pmcDetails.rows[0],
        user:  userDetails.rows[0]

        }

        res.json(combinedDetails);
        console.log(combinedDetails);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
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

module.exports = {
    getPMCDetails,
    getAllWardens
};
