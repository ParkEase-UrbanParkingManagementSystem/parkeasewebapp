const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');
const authorization = require('../middleware/authorization');
const authorizeRole = require('../middleware/roleAuthorization');

router.get('/details', authorization, authorizeRole([1]), driverController.getDriverDetails);

module.exports = router;