const express = require('express');
const router = express.Router();
const WardenController = require('../controllers/wardens');

// router.post("/register", WardenController.register);
router.get("/", WardenController.getWardens);
router.get("/:id", WardenController.getWardenDetails);

module.exports = router;