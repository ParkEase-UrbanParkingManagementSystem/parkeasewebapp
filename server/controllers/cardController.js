const pool = require('../db');

const getCards = async (req,res) => {
    try {
        const user_id = req.user;

        //Getting the driverID from the userID

        const driverDetails = await pool.query
            ("SELECT driver_id FROM driver WHERE user_id = $1", [user_id]);

        if(driverDetails.rows.length ===0 ){
            return res.status(404).json({message: "Driver not found for this user"});
        }    
        
        const driver_id = driverDetails.rows[0].driver_id;

        
        //Query to get driver details

        const result = await pool.query(
            "SELECT card.card_id, card.card_number, card.card_name, card.type_id FROM driver_card JOIN card ON driver_card.card_id = card.card_id WHERE driver_card.driver_id = $1",
            [driver_id]
        );

        if(result.rows.length===0){
            return res.status(404).json({message: "No cards found for this driver"})
        }


        return res.status(200).json({
            message:"Success",
            data: result.rows,
            driver_id: driver_id
        })
        

    } catch (error) {
        console.error(error);
    }
}

const addCard = async (req, res) => {
    
    try {
        const user_id = req.user; // Assuming req.user contains the user_id of the logged-in user
        const { type_id, card_number, card_name, expiration_date, CVV } = req.body;

        // Getting the driverID from the userID
        const driverDetails = await pool.query(
            "SELECT driver_id FROM driver WHERE user_id = $1",
            [user_id]
        );

        if (driverDetails.rows.length === 0) {
            return res.status(404).json({ message: "Driver not found for this user" });
        }

        const driver_id = driverDetails.rows[0].driver_id;

        // Inserting a new card
        const newVehicle = await pool.query(
            "INSERT INTO vehicle (vehicle_number, name, type_id) VALUES ($1, $2, $3, $4, $5) RETURNING card_id",
            [type_id, card_number, card_name, expiration_date, CVV]
        );

        const card_id = newCard.rows[0].card_id;

        // Associating the new card with the driver
        await pool.query(
            "INSERT INTO driver_card (driver_id, card_id) VALUES ($1, $2)",
            [driver_id, card_id]
        );

        return res.status(201).json({
            message: "Card details recorded successfully",
            data: { card_id, type_id, card_number, card_name, expiration_date, CVV }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};





module.exports = {
    getCards,
    addCard
}