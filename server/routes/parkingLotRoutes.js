const express = require("express");
const router = express.Router();
const parkingLotController = require("../controllers/parkingLotController");
const authorization = require("../middleware/authorization");

router.post("/add", authorization, parkingLotController.parkingLotAdd);
router.get("/", authorization, parkingLotController.getParkingLot);
router.get("/revenue", authorization, parkingLotController.getRevenueByParkingLot);
router.get("/parking-lot-count", authorization, parkingLotController.getParkingLotCount);
router.get("/parking-capacity", authorization, parkingLotController.getParkingCapacity);
router.get("/peak-hours", authorization, parkingLotController.getPeakParkingHours);
router.get("/total-revenue", authorization, parkingLotController.getTotalRevenue);
router.get("/:id", authorization, parkingLotController.getAParkingLotDetails);
router.get("/revenue/:id", parkingLotController.getParkingLotRevenue);
router.get("/assigning/topark", authorization, parkingLotController.getParkingLotAssign);


router.post(
  "/inactive/:id",
  authorization,
  parkingLotController.deactivateParkingLot
);
router.post(
  "/active/:id",
  authorization,
  parkingLotController.activateParkingLot
);



module.exports = router;
