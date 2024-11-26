const pool = require("../db");


const getNotifications = async (req, res) => {
    try {
        const user_id = req.user;
        console.log(user_id);
        const result = await pool.query(
            "SELECT * FROM notifications WHERE receiver_id = $1 ORDER BY id DESC",
            [user_id]
        );
        console.log(result.rows);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getNotifications
}