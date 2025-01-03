const express = require('express');
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/get-parking-accepted", adminController.getAcceptedParking);
router.get('/get-parking-pending', adminController.getPendingParking);
router.post('/submit-parking-location', adminController.submitParking);
router.get('/get-pmc-details', adminController.getPMC);
router.get('/count', adminController.getCount);
router.post('/inactive-pmc', adminController.inactivePMC);
router.post('/active-pmc', adminController.activePMC);
router.get('/get-pmc-ats', adminController.getPMCAts);
router.post('/admin-to-pmc', adminController.adminToPMC);
router.get('/get-admin-revenue', adminController.getRevenueByPMC);

module.exports = router;