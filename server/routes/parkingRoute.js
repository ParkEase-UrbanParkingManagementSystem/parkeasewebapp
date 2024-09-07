const express = require("express");
const router = express.Router();
const parkingController = require("../controllers/parkingController");
const authorization = require("../middleware/authorization");


router.get("/parking-details", authorization, parkingController.getParkingDetails);
router.get("/parked-details", authorization, parkingController.getAfterParkingDetails);


module.exports = router;
