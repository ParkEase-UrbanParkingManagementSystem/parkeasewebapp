const router = require("express").Router()
const pool = require("../db")
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
// const authoziazation = require("../middleware/authorization");
const authorization = require("../middleware/authorization");

//register

router.post("/registerPMC", validInfo, async (req, res) => {
    try {
        // Destructure the req.body
        const { name, email, password, regNo, addressNo, street1, street2, city, district } = req.body;

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

            const role_id = 3;

            // Insert new user into the users table
            const newUser = await pool.query(
                "INSERT INTO users (email, password, addressNo, street_1, street_2, city, province,role_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING user_id",
                [email, bcryptPassword, addressNo, street1, street2, city, district, role_id]
            );

            const userId = newUser.rows[0].user_id;

            // Insert PMC details into the pmc table
            const newPMC = await pool.query(
                "INSERT INTO pmc (name, regNo, user_id) VALUES ($1, $2, $3) RETURNING *",
                [name, regNo, userId]
            );

            // Commit the transaction
            await pool.query('COMMIT');

            // Generating JWT token
            const token = jwtGenerator(userId);

            res.json({ token });
        } catch (error) {
            // Rollback the transaction in case of any error
            await pool.query('ROLLBACK');
            throw error; // Rethrow the error for centralized error handling
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}  );

//Register Driver

router.post("/registerDriver", async(req,res)=>{
    try {
        // Destructure the req.body
        const { fname, lname, nic, email, password, contact, addressNo, street1, street2, city, district } = req.body;

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
                "INSERT INTO users (email, password, addressNo, street_1, street_2, city, province,contact,role_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING user_id",
                [email, bcryptPassword, addressNo, street1, street2, city, district, contact, role_id]
            );

            const userId = newUser.rows[0].user_id;

            // Insert PMC details into the pmc table
            const newPMC = await pool.query(
                "INSERT INTO driver (fname, lname, nic, age, gender, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
                [fname, lname, nic, age, gender, userId]
            );

            // Commit the transaction
            await pool.query('COMMIT');

            // Generating JWT token
            const token = jwtGenerator(userId);

            res.json({ token });
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

        const token = jwtGenerator(user.rows[0].user_id);

        res.json({token});

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