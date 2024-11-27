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


const markRead = async (req, res) => {
    try {
        const user_id = req.user;
        const { id } = req.body;
        console.log(user_id);
        const result = await pool.query(
            "UPDATE notifications SET is_read = TRUE WHERE receiver_id = $1 AND id = $2",
            [user_id, id]
        );
        res.status(200).json({ message: "Notification marked as read" });
    } catch (error) {
        console.error(error);
    }
}

const markReadAll = async (req, res) => {
    try {
        const user_id = req.user;
        const result = await pool.query(
            "UPDATE notifications SET is_read = TRUE WHERE receiver_id = $1",
            [user_id]
        );
        res.status(200).json({ message: "All notifications marked as read" });
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getNotifications,
    markRead,
    markReadAll
}