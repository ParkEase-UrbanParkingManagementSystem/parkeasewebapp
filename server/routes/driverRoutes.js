const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');
const authorization = require('../middleware/authorization');
const authorizeRole = require('../middleware/roleAuthorization');

router.get('/details', authorization, authorizeRole([1]), driverController.getDriverDetails);
//Authroized Role should change to the role of the admin
router.get('/total-drivers', driverController.getTotalDrivers);
router.get('/all',driverController.getAllDrivers);
router.delete('/remove/:driver_id', authorization, authorizeRole([1]), driverController.removeDriver);

module.exports = router;