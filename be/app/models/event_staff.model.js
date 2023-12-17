const mongoose = require("mongoose");

const eventStaffSchema = new mongoose.Schema({
  eventId: { type: mongoose.Types.ObjectId, ref: "events" },
  userId: { type: mongoose.Types.ObjectId, ref: "user" },
  staffId: { type: mongoose.Types.ObjectId, ref: "user" },
  status: { type: String, default: "New" },
  offer:{ },
  payStatus: { type: String, default: 'unpaid'}
});

module.exports = mongoose.model("event_staff", eventStaffSchema);
