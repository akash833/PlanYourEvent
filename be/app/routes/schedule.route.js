const express = require("express");
const router = express.Router();

const { getMySchedule } = require("../controllers/schedule.controller");

router.post("/check-my-schedule", getMySchedule);

module.exports = router;
