const pool = require('../db');

const postParkingReview = async (req, res) => {
    const { driver_id, lot_id, rating, review } = req.body;
    const { user_id } = req.user; // Assuming authorization middleware attaches user info to req.user
  
    if (!lot_id || !rating || !review) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    try {
      const result = await pool.query(
        `INSERT INTO parkinglotreviews (driver_id, lot_id, rating, review, created_at) 
         VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *`,
        [driver_id, lot_id, rating, review]
      );
  
      return res.status(201).json({ message: 'Parking review submitted successfully', review: result.rows[0] });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  //Warden Review post

  const postWardenReview = async (req, res) => {
    const { driver_id, warden_id, rating, review } = req.body;
  
    if (!warden_id || !rating || !review) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    try {
      const result = await pool.query(
        `INSERT INTO wardenreviews (driver_id, warden_id, rating, review, created_at) 
         VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *`,
        [driver_id, warden_id, rating, review]
      );
  
      return res.status(201).json({ message: 'Warden review submitted successfully', review: result.rows[0] });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
//Get parking lot reviews
  
  const getParkingLotReviews = async (req, res) => {
    const { lot_id } = req.params;
  
    if (!lot_id) {
      return res.status(400).json({ message: 'Missing lot_id parameter' });
    }
  
    try {
        const result = await pool.query(
            `SELECT pr.*, 
                    d.fname AS driver_fname, 
                    d.lname AS driver_lname, 
                    d.profile_pic 
             FROM parkinglotreviews pr 
             JOIN driver d ON pr.driver_id = d.driver_id
             WHERE pr.lot_id = $1 
             ORDER BY pr.created_at DESC`,
            [lot_id]
          );
          
  
      return res.status(200).json({ reviews: result.rows });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  module.exports = {
    postParkingReview,
    postWardenReview,
    getParkingLotReviews
  };
