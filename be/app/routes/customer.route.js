const express = require("express");
const router = express.Router();
// const eventController = require("../controllers/event.controller");
const {
  createArrivedCust,
  getAllArrivedCust,
} = require("../controllers/customer.controller");

router.post("/", createArrivedCust);
router.post("/get-arrived-data", getAllArrivedCust);

module.exports = router;