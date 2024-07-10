// const Warden = require("../models/wardenModel");
const pool = require("../db");


exports.getWardens = async (req,res) => {
    try {
        

        //Query to get all the warden details
        const result = await pool.query('SELECT * FROM warden');
        
        //if no wardens are there
        if(result.rows.length === 0){
            return res.status(404).json({message: "No wardens found"})
        }

        //Send the warden details in the response
        res.status(200).json(result.rows);
        
    } catch (error) {
        console.error("Error fetching warden details:", error);
        res.status(500).json({message: "Server error"});
    }
}

exports.getWardenDetails = async (req,res) => {
    try {
        const { id } = req.params;

        //Query to get the relevant warden details
        const result = await pool.query("SELECT * FROM warden WHERE user_id = $1",[id])

        //If there are no matches
        if(result.rows.length === 0){

        return res.status(404).json({message: "No warden details available"});

        }

        //Send the warden details for the frontEnd
        res.status(200).json(result.rows);

    } catch (error) {
        console.error("Error fetching the warden's details", error);
        res.status(500).json({message: "Server Error"})
    }
}

exports.registerWarden = async (req,res) => {
    //Enhance this using COMMIT ROLLBACK BEGIN -- 0
    try {
        const pmc_id = req.user;

        const newWarden = await pool.query(
            "INSERT INTO wardens (fname, lname, nic, profile_pic, age, gender, registration_code, user_id, pmc_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [fname, lname, nic, profile_pic, age, gender, registration_code, user_id, pmc_id]
        );

        res.json(newWarden.rows[0]);

    } catch (error) {
        console.error(error.message);
    }
}
