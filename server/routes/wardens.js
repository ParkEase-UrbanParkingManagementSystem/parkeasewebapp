const express = require('express');
const router = express.Router();
const WardenController = require('../controllers/wardens');
const authorization = require('../middleware/authorization')
const validInfo = require('../middleware/validInfo');
const authorizeRole = require("../middleware/roleAuthorization")


// router.post("/register", WardenController.register);
router.get("/", authorization, authorizeRole([2]), WardenController.getWardens);
router.get('/warden-count', authorization, authorizeRole([2]),WardenController.getWardensCount);
router.get("/:id", authorization, authorizeRole([2]),  WardenController.getWardenDetails);
router.post("/registerWarden", authorization, authorizeRole([2]), WardenController.registerWarden);
router.post("/assign/:id", authorization, authorizeRole([2]),WardenController.assignParkingLot)
router.post('/unassign/:id', authorization, authorizeRole([2]),WardenController.unassignParkingLot);


module.exports = router;