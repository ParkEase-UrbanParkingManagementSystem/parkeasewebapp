const express = require("express");
const router = express.Router();
const parkingLotController = require("../controllers/parkingLotController");
const authorization = require("../middleware/authorization");
const authorizeRole = require("../middleware/roleAuthorization");

router.post(
  "/add",
  authorization,
  authorizeRole([2]),
  parkingLotController.parkingLotAdd
);
router.get(
  "/",
  authorization,
  authorizeRole([2]),
  parkingLotController.getParkingLot
);
router.get(
  "/:id",
  authorization,
  authorizeRole([2]),
  parkingLotController.getAParkingLotDetails
);

module.exports = router;
