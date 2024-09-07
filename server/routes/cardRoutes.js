const express = require('express');
const router = express.Router();
const authorization = require("../middleware/authorization");
const authorizeRole = require("../middleware/roleAuthorization");
const cardController = require("../controllers/cardController");

router.get("/", authorization, authorizeRole([1]), cardController.getCards);
router.post('/', authorization, authorizeRole([1]), cardController.addCard);

module.exports = router;