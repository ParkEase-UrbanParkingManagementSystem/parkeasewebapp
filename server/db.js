const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "dilki",
    host: "localhost",
    port: 5432,
    database: "parkease"
});

module.exports = pool;