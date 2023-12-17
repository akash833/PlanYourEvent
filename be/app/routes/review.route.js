const express = require("express");
const router = express.Router();

const {
  getReviews,
  createReviews,
} = require("../controllers/review.controller");


router.get("/", getReviews);
router.post("/create-review", createReviews);

module.exports = router;
