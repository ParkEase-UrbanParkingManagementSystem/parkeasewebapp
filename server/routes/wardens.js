const express = require('express');
const router = express.Router();
const WardenController = require('../controllers/wardens');

router.post("/register", WardenController.register);