// const Warden = require("../models/wardenModel");
const extractAgeAndGenderFromNIC = require ('../utils/extractFromNic');


const pool = require("../db");
const jwt = require("jsonwebtoken");


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

exports.registerWarden = async (req, res) => {
    console.log("Hellow");
    const client = await pool.connect();
  
    try {
      const {
        email,
        password,
        fname,
        lname,
        nic,
        addressNo,
        street1,
        street2,
        city,
        province
      } = req.body;


      const pmc_user_id = req.user; // Assuming pmc_id is taken from the authenticated user's context
      console.log(pmc_user_id);

      //Getting details from NIC

      

      const pmcQuery = await pool.query('SELECT pmc_id FROM pmc WHERE user_id = $1', [pmc_user_id]);
      pmc_id = pmcQuery.rows[0].pmc_id;

        // Extract age and gender from NIC
        const { age, gender } = extractAgeAndGenderFromNIC(nic);

    //   console.log("Ane", pmc_id);

      await client.query('BEGIN');
  
      // Insert into users table and get the generated user_id
      const newWardenUser = await client.query(
        "INSERT INTO users (email, password, addressNo, street_1, street_2, city, province) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING user_id",
        [email, password, addressNo, street1, street2, city, province]
      );
  
      const user_id = newWardenUser.rows[0].user_id;
  
      // Insert into wardens table using the generated user_id
      const newWardenPMC = await client.query(
        "INSERT INTO warden (fname, lname, nic, age, gender, user_id, pmc_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [fname, lname, nic, age, gender, user_id, pmc_id]
      );
  
      await client.query('COMMIT');
  
      const combinedDetails = {
        user: newWardenUser.rows[0],
        warden: newWardenPMC.rows[0]
      };
  
      res.json(combinedDetails);
  
    } catch (error) {
      await client.query('ROLLBACK');
      console.error(error.message);
      res.status(500).json({ msg: "Server Error" });
    } finally {
      client.release();
    }
  };
  
