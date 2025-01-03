const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');
const authorization = require('../middleware/authorization');
const authorizeRole = require('../middleware/roleAuthorization');

router.get('/details', authorization, authorizeRole([1]), driverController.getDriverDetails);
router.get('/parking-analytics', authorization, authorizeRole([1]), driverController.getParkingAnalytics);

router.get('/getWalletBalance', authorization, authorizeRole([1]), driverController.getWalletBalance);
router.get('/getParkPoints', authorization, authorizeRole([1]), driverController.getParkPointsBalance);

//Authroized Role should change to the role of the admin
router.get('/total-drivers', driverController.getTotalDrivers);
router.get('/all',driverController.getAllDrivers);
router.delete('/remove/:driver_id', authorization, authorizeRole([1]), driverController.removeDriver);
router.get('/analytics', driverController.getDriverAnalytics);
router.get('/topup-history', authorization, driverController.getDriverTransactions);




module.exports = router;