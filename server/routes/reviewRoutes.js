const express = require('express');
const router = express.Router();
const authorization = require("../middleware/authorization");
const authorizeRole = require("../middleware/roleAuthorization");
const reviewController =  require("../controllers/reviewController")

router.post("/parking", authorization, authorizeRole([1]), reviewController.postParkingReview);
router.get("/parking", authorization, authorizeRole([1]), reviewController.getParkingLotReviews);
router.post("/warden", authorization, authorizeRole([1]), reviewController.postWardenReview)


module.exports = router;
    