const express = require('express');
const router = express.Router();
const PMCController = require('../controllers/pmcController');
const authorization = require("../middleware/authorization");
const authorizeRole = require("../middleware/roleAuthorization");

router.get("/details", authorization, authorizeRole([2]), PMCController.getPMCDetails);
router.get("/wardens", authorization, authorizeRole([2]), PMCController.getAllWardens);
router.get("/total-pmcs", PMCController.getTotalPMCs);
router.get('/all-pmcs', PMCController.getAllPMCDetails);
router.get('/total-collections', PMCController.getTotalCollectionsByPMC);
router.get("/pmctype", authorization, authorizeRole([2]), PMCController.getPmcType);
router.get('/analytics', PMCController.getPMCAnalytics);
router.get('/notifications', authorization, PMCController.getNotificationsPmc);
router.get('/warden/earnings/:id', authorization ,PMCController.getWardenDailyEarnings);

module.exports = router;
    
