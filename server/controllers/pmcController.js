const pool = require("../db");

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
    console.log(combinedDetails);

    res.status(200).json({
      message: "success",
      data: combinedDetails,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
// Function to fetch all the wardens of PMC

const getAllWardens = async (req, res) => {
  try {
    const user_id = req.user;
    const wardens = await pool.query(
      "SELECT * FROM wardens WHERE pmc_id = $1",
      [user_id]
    );

    if (wardens.rows.length === 0) {
      return res.status(404).json({ msg: "Wardens not found" });
    }

    res.json(wardens.rows); // Returning only the rows, not the whole query object
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

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

    console.log(result);

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

  
module.exports = {
  getPMCDetails,
  getAllWardens,
  getPmcType,
};
