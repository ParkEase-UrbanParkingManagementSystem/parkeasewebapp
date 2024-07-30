const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "70435944",
    host: "localhost",
    port: 5432,
    database: "parkease"
});

module.exports = pool;