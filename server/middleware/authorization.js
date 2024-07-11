const jwt = require("jsonwebtoken");
require("dotenv").config(); // This gives access to environment variables

module.exports = async (req, res, next) => {
    try {
        // Get the token from the header
        const jwtToken = req.header("token");

        // If no token is found, return a 403 response
        if (!jwtToken) {
            return res.status(403).json("You are not authorized");
        }

        // Verify the token and extract the payload
        const payload = jwt.verify(jwtToken, process.env.jwtSecret);

        // Attach the user ID from the token payload to the request object
        req.user = payload.user;
        
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(403).json("Token is not valid");
    }
};
