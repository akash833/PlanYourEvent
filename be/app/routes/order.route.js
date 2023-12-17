const express = require("express");

const router = express.Router();

const {
  getOrderData,
  getEventsLatestsale,
  getAllOrders,
  updateOrderById,
} = require("../controllers/order.controller");

router.post("/get-order-data",getOrderData);
router.get("/get-latest-sale", getEventsLatestsale);
router.post("/get-all-order-data", getOrderData);
router.post("/get-all-order", getAllOrders);
router.post("/arrived", updateOrderById);

module.exports = router;
