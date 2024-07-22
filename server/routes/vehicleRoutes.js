const express = require('express');
const router = express.Router();
const authorization = require("../middleware/authorization");
const authorizeRole = require("../middleware/roleAuthorization");
const vehicleController = require("../controllers/vehicleController");

router.get("/", authorization, authorizeRole([1]), vehicleController.getVehicles);
router.post('/', authorization, authorizeRole([1]), addVehicle);

module.exports = router;