const jwt = require("jsonwebtoken");
require('dotenv').config();

function jwtGenerator(user_id, role_id) {
    const payload = {
        user: user_id,
        role: role_id
    }

    return jwt.sign(payload,process.env.jwtSecret, {expiresIn: "1hr"})
}

module.exports = jwtGenerator