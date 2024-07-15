const express = require('express');
const router = express.Router();
const PMCController = require('../controllers/pmcController');
const authorization = require("../middleware/authorization");

router.get("/details", authorization, PMCController.getPMCDetails);
router.get("/wardens", authorization, PMCController.getAllWardens);

module.exports = router;
    
