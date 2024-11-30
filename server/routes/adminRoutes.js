const express = require('express');
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/get-parking-accepted", adminController.getAcceptedParking);
router.get('/get-parking-pending', adminController.getPendingParking);
router.post('/submit-parking-location', adminController.submitParking);
router.get('/get-pmc-details', adminController.getPMC);
router.get('/count', adminController.getCount);

module.exports = router;