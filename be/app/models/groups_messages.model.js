const mongoose = require("mongoose");

const groupMessageSchema = new mongoose.Schema({
  groupId: { type: mongoose.Types.ObjectId, ref: "chatGroup" },
  senderId: { type: mongoose.Types.ObjectId, ref: "user" },
  eventId: { type: mongoose.Types.ObjectId, ref: "events" },
  message: String, // Plain text message,
  offer: {
    hours: Number,
    price: Number,
  },
  type: String, // TEXT , AUDIO, VIDEO, OFFER_SENT,
  action_performed: { type: Boolean, default: false },
  action: String, //ACCEPTED, REJECTED
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("groupMessage", groupMessageSchema);
