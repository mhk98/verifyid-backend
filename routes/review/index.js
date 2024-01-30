const router = require("express").Router();
const review = require("../../controllers/review/review.controller");

router.get("/", review.getAllReview);
router.post("/", review.createReview);

module.exports = router;
