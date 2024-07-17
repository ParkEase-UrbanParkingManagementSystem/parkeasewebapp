const express = require('express');
const router = express.Router();
const parkingLotController = require('../controllers/parkingLotController')
const authorization = require("../middleware/authorization");


router.post("/add", authorization, parkingLotController.parkingLotAdd);


module.exports = router;