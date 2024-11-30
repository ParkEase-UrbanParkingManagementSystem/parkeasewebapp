const express = require("express");
const router = express.Router();
const parkingController = require("../controllers/parkingController");
const authorization = require("../middleware/authorization");


router.get("/parking-details", authorization, parkingController.getParkingDetails);
router.get("/parked-details", authorization, parkingController.getAfterParkingDetails);
router.get("/parked-detailsMob", authorization, parkingController.getAfterParkingDetailsMobile);
router.get("/get-recent-parking-instances", authorization, parkingController.getRecentParkingInstances);
router.get("/get-recent-parking-lots-home", authorization, parkingController.getRecentParkingLotsHome);
router.get("/get-instance-details/:id", authorization, parkingController.getParkingInstanceDetails);
router.post("/pay-wallet", authorization, parkingController.payByWallet);
router.post("/pay-pp", authorization, parkingController.payByParkPoints);
router.post("/pay-cash", authorization, parkingController.payByCash);
router.get("/get-parking-status", authorization, parkingController.checkDriverStatus);
router.get("/top-up-wallet", authorization, parkingController.topUpWallet);
router.get("/get-parking-lots-map", authorization, parkingController.getParkingLotsForMap);


//HEllo


module.exports = router;
