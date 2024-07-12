const express = require('express');
const router = express.Router();
const WardenController = require('../controllers/wardens');
const authorization = require('../middleware/authorization')
const validInfo = require('../middleware/validInfo');

// router.post("/register", WardenController.register);
router.get("/", WardenController.getWardens);
router.get("/:id", WardenController.getWardenDetails);
router.post("/registerWarden", authorization, WardenController.registerWarden);

module.exports = router;