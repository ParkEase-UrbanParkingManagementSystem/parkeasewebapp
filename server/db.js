const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "1245",
    host: "localhost",
    port: 5432,
    database: "parkease"
});

module.exports = pool;