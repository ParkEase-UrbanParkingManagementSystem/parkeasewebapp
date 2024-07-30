// const Warden = require("../models/wardenModel");
const extractAgeAndGenderFromNIC = require ('../utils/extractFromNic');
const bcrypt = require('bcryptjs');


const pool = require("../db");
const jwt = require("jsonwebtoken");


exports.getWardens = async (req, res) => {
  try {
      const user_id = req.user;

      // Query to find PMC associated with the user
      const pmcQuery = await pool.query('SELECT pmc_id FROM pmc WHERE user_id = $1', [user_id]);

      if (pmcQuery.rows.length === 0) {
          return res.status(404).json({ message: "PMC not found for this user" });
      }

      const pmc_id = pmcQuery.rows[0].pmc_id;

      // Query to get user details

      const result = await pool.query(`
       SELECT w.*, u.*, pl.name AS parking_lot_name
          FROM warden w
          JOIN users u ON w.user_id = u.user_id
          LEFT JOIN warden_parking_lot wpl ON w.warden_id = wpl.warden_id
          LEFT JOIN parking_lot pl ON wpl.lot_id = pl.lot_id
          WHERE w.pmc_id = $1
    `, [pmc_id]);
    
    if (result.rows.length === 0) {
        return res.status(404).json({ message: "No wardens found for this PMC" });
    }

    return res.status(200).json({
      message: "success",
      data: result.rows
    });

      // Send the combined details in the response
      res.status(200).json({
          message: "Success",
          data: combinedDetails
      });

  } catch (error) {
      console.error("Error fetching warden details:", error);
      res.status(500).json({ message: "Server error" });
  } finally {
      // Always release the pool connection if necessary
      // Ensure your pool setup manages connections correctly
  }
};

exports.unassignParkingLot = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Start a transaction
      await pool.query('BEGIN');
  
      // Update the warden's isassigned column to false
      const updateWardenQuery = `
        UPDATE warden
        SET isassigned = false
        WHERE warden_id = $1
        RETURNING *;
      `;
  
      const updateResult = await pool.query(updateWardenQuery, [id]);
  
      if (updateResult.rows.length === 0) {
        await pool.query('ROLLBACK');
        return res.status(404).json({ message: 'Warden not found' });
      }
  
      // Delete the warden's entry from warden_parking_lot table
      const deleteWardenParkingLotQuery = `
        DELETE FROM warden_parking_lot
        WHERE warden_id = $1
        RETURNING *;
      `;
  
      const deleteResult = await pool.query(deleteWardenParkingLotQuery, [id]);
  
      // Commit the transaction
      await pool.query('COMMIT');
  
      res.status(200).json({
        message: 'Parking lot unassigned successfully',
        warden: updateResult.rows[0],
        deletedWardenParkingLot: deleteResult.rows[0]
      });
    } catch (error) {
      // Rollback the transaction in case of error
      await pool.query('ROLLBACK');
      console.error('Error unassigning parking lot:', error);
      res.status(500).json({ message: 'Failed to unassign parking lot' });
    }
};

  exports.getWardenDetails = async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({ message: 'Warden ID is required' });
    }
  
    try {
      // Query to get warden details
      const wardenQuery = `
        SELECT 
          warden.*, 
          users.*, 
          parking_lot.name AS parking_lot_name
        FROM 
          warden
        JOIN 
          users ON warden.user_id = users.user_id
        LEFT JOIN 
          warden_parking_lot ON warden.warden_id = warden_parking_lot.warden_id
        LEFT JOIN 
          parking_lot ON warden_parking_lot.lot_id = parking_lot.lot_id
        WHERE 
          warden.warden_id = $1;
      `;
  
      // Query to get warden reviews
      const reviewsQuery = `
        SELECT 
          wr.*, 
          d.fname AS driver_fname, 
          d.lname AS driver_lname, 
          d.profile_pic 
        FROM 
          wardenreviews wr
        JOIN 
          driver d ON wr.driver_id = d.driver_id
        WHERE 
          wr.warden_id = $1 
        ORDER BY 
          wr.created_at DESC;
      `;
  
      // Execute both queries concurrently
      const [wardenResult, reviewsResult] = await Promise.all([
        pool.query(wardenQuery, [id]),
        pool.query(reviewsQuery, [id])
      ]);
  
      // Check if warden exists
      if (wardenResult.rows.length === 0) {
        return res.status(404).json({ message: 'Warden not found' });
      }
  
      // Extract data from the query results
      const warden = wardenResult.rows[0];
      const reviews = reviewsResult.rows;
  
      // Combine warden details with reviews
      const response = {
        ...warden,
        reviews
      };
      
      console.log(response)
      res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching warden details and reviews:', error);
      if (!res.headersSent) {
        res.status(500).json({ message: 'Internal Server Error' });
      }
  }
};

exports.registerWarden = async (req, res) => {
  const client = await pool.connect();

  try {
    const {
      email,
      password,
      fname,
      lname,
      nic,
      addressNo,
      street1,
      street2,
      city,
      province,
      contact // Added contact number
    } = req.body;

    const pmc_user_id = req.user; // Assuming pmc_id is taken from the authenticated user's context

    // Extract age and gender from NIC
    const { age, gender } = extractAgeAndGenderFromNIC(nic);
    const role_id = 3;

    const pmcQuery = await pool.query('SELECT pmc_id FROM pmc WHERE user_id = $1', [pmc_user_id]);
    const pmc_id = pmcQuery.rows[0].pmc_id;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await client.query('BEGIN');

    // Insert into users table and get the generated user_id
    const newWardenUser = await client.query(
      "INSERT INTO users (email, password, addressNo, street_1, street_2, city, province, contact, role_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING user_id",
      [email, hashedPassword, addressNo, street1, street2, city, province, contact, role_id]
    );

    const user_id = newWardenUser.rows[0].user_id;

    // Insert into wardens table using the generated user_id
    const newWardenPMC = await client.query(
      "INSERT INTO warden (fname, lname, nic, age, gender, user_id, pmc_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [fname, lname, nic, age, gender, user_id, pmc_id]
    );

    await client.query('COMMIT');

    const combinedDetails = {
      user: newWardenUser.rows[0],
      warden: newWardenPMC.rows[0]
    };

    res.json(combinedDetails);

  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  } finally {
    client.release();
  }
};

exports.assignParkingLot = async (req, res) => {
  const { id } = req.params;
  const { parkingLot } = req.body;

  if (!id) {
      return res.status(400).json({ message: 'Warden ID is required' });
  }

  if (!parkingLot) {
      return res.status(400).json({ message: 'Parking lot is required' });
  }

  const client = await pool.connect();

  try {
      // Query to get the lot_id from parking_lot
      const lotQuery = await client.query(
          `SELECT lot_id FROM parking_lot WHERE name = $1`,
          [parkingLot]
      );

      if (lotQuery.rows.length === 0) {
          return res.status(404).json({ message: 'Parking lot not found' });
      }

      const lot_id = lotQuery.rows[0].lot_id;

      // Check if the warden is already assigned to another parking lot
      const currentAssignmentQuery = await client.query(
          `SELECT * FROM warden_parking_lot WHERE warden_id = $1`,
          [id]
      );

      if (currentAssignmentQuery.rows.length > 0) {
          // Warden is already assigned to a parking lot, update the existing record
          await client.query(
              `UPDATE warden_parking_lot
               SET lot_id = $1, assigned_date = CURRENT_DATE, assigned_time = CURRENT_TIME
               WHERE warden_id = $2`,
              [lot_id, id]
          );

          // Update the warden table's isassigned column
          await client.query(
              `UPDATE warden
               SET isassigned = TRUE
               WHERE warden_id = $1`,
              [id]
          );

          return res.status(200).json({ message: 'Parking lot updated successfully' });
      } else {
          // Warden is not assigned, insert a new record
          await client.query(
              `INSERT INTO warden_parking_lot (warden_id, lot_id, assigned_date, assigned_time)
               VALUES ($1, $2, CURRENT_DATE, CURRENT_TIME)`,
              [id, lot_id]
          );

          // Update the warden table's isassigned column
          await client.query(
              `UPDATE warden
               SET isassigned = TRUE
               WHERE warden_id = $1`,
              [id]
          );

          return res.status(200).json({ message: 'Parking lot assigned successfully' });
      }
  } catch (error) {
      console.error('Error assigning parking lot:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  } finally {
      client.release();
  }
};

