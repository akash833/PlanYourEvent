const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  img: { type: String },
  name: { type: String },
  description: { type: String },
  type: { type: String },
  targetId: { type: mongoose.Types.ObjectId, ref: "user" },
  time: { type: String },
  markAsRead: { type: Boolean , default: false}
});

module.exports = mongoose.model("notification", notificationSchema);
