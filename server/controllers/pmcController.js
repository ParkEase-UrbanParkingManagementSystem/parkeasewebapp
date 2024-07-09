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

        console.log(pmcDetails);

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

module.exports = {
    getPMCDetails,
};
