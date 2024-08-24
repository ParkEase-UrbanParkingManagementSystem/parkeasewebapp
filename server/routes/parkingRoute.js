const express = require("express");
const router = express.Router();
const parkingController = require("../controllers/parkingController");
const authorization = require("../middleware/authorization");


router.get("/parking-details", authorization, parkingController.getParkingDetails);
router.get("/parked-details", authorization, parkingController.getAfterParkingDetails);
router.get("/parked-detailsMob", authorization, parkingController.getAfterParkingDetailsMobile);
router.get("/get-recent-parking-instances", authorization, parkingController.getRecentParkingInstances);
router.get("/get-recent-parking-lots-home", authorization, parkingController.getRecentParkingLotsHome);
router.post("/pay-wallet", authorization, parkingController.payByWallet);
router.post("/pay-pp", authorization, parkingController.payByParkPoints);


module.exports = router;
