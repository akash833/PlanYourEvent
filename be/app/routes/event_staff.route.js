const express = require("express");
const router = express.Router();

const {
  getAll,
  create,
  removeData,
  updateStatusEventStaff,
  getByStaffId,
  updatePaymentStatus,
} = require("../controllers/event_staff.controller");

router.get("/all", getAll);
router.post("/create", create);
router.post("/remove-event-staff", removeData)
router.post("/update-status-event-staff", updateStatusEventStaff)
router.get("/get-staff-invitation", getByStaffId);
router.post("/update-payment-status", updatePaymentStatus);


module.exports = router;
