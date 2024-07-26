const express = require("express");
const router = express.Router();
const parkingController = require("../controllers/parkingController");
const authorization = require("../middleware/authorization");


router.get("/parking-details", authorization, parkingController.getParkingDetails);


module.exports = router;
