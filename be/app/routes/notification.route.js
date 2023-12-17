const express = require("express");
const router = express.Router();

const {
  getNotification,
  createNotification,
  markNotification,
} = require("../controllers/notification.controller");


router.get("/", getNotification);
router.post("/create-notification", createNotification);
router.post("/mark-notification", markNotification)

module.exports = router;
