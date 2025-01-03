const router = require("express").Router()
const pool = require("../db")
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
// const authoziazation = require("../middleware/authorization");
const authorization = require("../middleware/authorization");
const extractAgeAndGenderFromNIC = require("../utils/extractFromNic")

//register

router.post("/registerPMC", validInfo, async (req, res) => {
    try {
        // Destructure the req.body
        const { name, email, password, regNo, addressNo, street1, street2, city, district, sector, cmc, contact } = req.body;

        // Check if the user email already exists
        const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (existingUser.rows.length > 0) {
            return res.status(409).send("Email already in use");
        }

        // Start a transaction to ensure data consistency
        await pool.query('BEGIN');

        try {
            // Bcrypt the user password
            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            const bcryptPassword = await bcrypt.hash(password, salt);
            const role_id = 2; // Assuming this is a constant value for PMC

            // Insert new user into the users table
            const newUser = await pool.query(
                "INSERT INTO users (email, password, addressNo, street_1, street_2, city, province, role_id, contact) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING user_id",
                [email, bcryptPassword, addressNo, street1, street2, city, district, role_id, contact]
            );

            const userId = newUser.rows[0].user_id;

            // Insert PMC details into the pmc table
            await pool.query(
                "INSERT INTO pmc (name, regNo, user_id, sector, cmc) VALUES ($1, $2, $3, $4, $5)",
                [name, regNo, userId, sector, cmc]
            );

            // Commit the transaction
            await pool.query('COMMIT');

            // Send a success message
            res.status(200).send("Registration successful, please log in.");
        } catch (error) {
            // Rollback the transaction in case of any error
            await pool.query('ROLLBACK');
            throw error; // Rethrow the error for centralized error handling
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


//Driver Registration

router.post("/registerDriver", async (req, res) => {
    try {
        // Destructure the req.body
        const { fname, lname, nic, email, password, contact, addressNo, street1, street2, city, district } = req.body;
        const { age, gender } = extractAgeAndGenderFromNIC(nic);

        // Check if the user email already exists
        const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (existingUser.rows.length > 0) {
            return res.status(409).send("Email already in use");
        }

        // Start a transaction to ensure data consistency
        await pool.query('BEGIN');

        try {
            // Bcrypt the user password
            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            const bcryptPassword = await bcrypt.hash(password, salt);

            const role_id = 1;

            // Insert new user into the users table
            const newUser = await pool.query(
                "INSERT INTO users (email, password, addressNo, street_1, street_2, city, province, contact, role_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING user_id",
                [email, bcryptPassword, addressNo, street1, street2, city, district, contact, role_id]
            );

            const userId = newUser.rows[0].user_id;

            // Insert driver details into the driver table
            const newDriver = await pool.query(
                "INSERT INTO driver (fname, lname, nic, age, gender, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING driver_id",
                [fname, lname, nic, age, gender, userId]
            );

            const driverId = newDriver.rows[0].driver_id;

            // Insert a record into the payparkwallet table for the driver
            await pool.query(
                "INSERT INTO payparkwallet (available_amount, driver_id) VALUES ($1, $2)",
                [0, driverId] // Initialize wallet with 0 balance
            );

            // Insert a record into the parkpoints table for the driver
            await pool.query(
                "INSERT INTO parkpoints (no_of_points, driver_id) VALUES ($1, $2)",
                [0, driverId] // Initialize park points with 0 points
            );

            // Commit the transaction
            await pool.query('COMMIT');

            // Send a success message
            res.status(200).send("Registration successful, please log in.");
        } catch (error) {
            // Rollback the transaction in case of any error
            await pool.query('ROLLBACK');
            throw error; // Rethrow the error for centralized error handling
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});



//Login

router.post("/login", validInfo, async(req,res)=> {
    try {
        
        //1 destructure the req.body
    const {email,password} = req.body;
        //2 Check if user doesnot exist (if not -> error)
    const user = await pool.query("SELECT * FROM users WHERE email = $1",[email]);

    if(user.rows.length === 0){
        return res.status(401).json("Password or Email is incorrect");
    }
        //3 check if incoming password is the same as the database password

        const validPassword = await bcrypt.compare(password, user.rows[0].password)
        
        if(!validPassword){
            return res.status(401).json("Email or password is wrong")
        }

        //4 Give them the jwt token

        const token = jwtGenerator(user.rows[0].user_id, user.rows[0].role_id);

        const role_id = user.rows[0].role_id;

        console.log(token); // Debugging decoded token

        res.status(200).json({token, role_id});

    } catch (err) {
       console.error(err.message);
       res.status(500).send("Server Error");
    }
});

router.get("/is-verify",authorization, async (req,res)=>{
    try {
        
        res.json(true);
    
    } catch (err) {
        console.error(err.message);
       res.status(500).send("Server Error");
    }
})


module.exports = router;