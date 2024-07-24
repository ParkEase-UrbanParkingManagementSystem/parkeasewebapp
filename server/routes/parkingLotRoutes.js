const express = require("express");
const router = express.Router();
const parkingLotController = require("../controllers/parkingLotController");
const authorization = require("../middleware/authorization");

router.post("/add", authorization, parkingLotController.parkingLotAdd);
router.get("/", authorization, parkingLotController.getParkingLot);
router.get(
    "/:id",
    authorization,
    parkingLotController.getAParkingLotDetails
  );

module.exports = router;

