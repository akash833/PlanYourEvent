const express = require("express");
const router = express.Router();

const {
  getPublicEventDetails,
  generatePaymentLink,
  updateOrderStatus,
  getEventByOrderId
} = require("../controllers/public.controller");

router.get("/get-publicEvent-details", getPublicEventDetails);

router.post("/generate-payment-link", generatePaymentLink);

router.get("/callback-order-id/:orderId", updateOrderStatus);

router.get("/get-event-by-order-id/:orderId", getEventByOrderId);

module.exports = router;
