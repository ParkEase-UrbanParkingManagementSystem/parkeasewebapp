const router = require("express").Router()
const pool = require("../db")
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authoziazation = require("../middleware/authorization");
const authorization = require("../middleware/authorization");

//register

router.post("/register",validInfo, async (req,res)=>{
    try {

        //1. Destructure the req.body(name,email,password)

        const {name,email,password} = req.body

        //2. Check if the user exists

        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (user.rows.length !== 0) {
            return res.status(409).send("Email already in use"); 
        }
        

        //3 Bcrypt the user password

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        //4. Enter new user inside our database

        const newUser = await pool.query("INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *",[name,email,bcryptPassword]);

        // res.json(newUser.rows[0])

        //5 Genarating JWT token

        const token = jwtGenerator(newUser.rows[0].user_id);
        
        res.json({token});

        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

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