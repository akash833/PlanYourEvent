const mongoose = require("mongoose");

const eventSchemaModel = new mongoose.Schema({
  eventTitle: { type: String },
  user: { type: mongoose.Types.ObjectId, ref: "user" },
  startTime: { type: String },
  endTime: { type: String },
  eventDescription: { type: String },
  city: { type: String },
  eventPhotosUrl: [{ type: String }],
  eventTypeSubHeading: { type: String },
  ticket: [
    {
      name: { type: String },
      tickets: { type: String },
      event: { type: String },
      amount: { type: String },
      showRemainingCount: { type: Boolean, default: false },
    },
  ],
  eventType: { type: String },
  guestList: [{ para: { type: String } }],
  Address: { type: String },

  createdAt: { type: Date, default: Date.now() },
  isActive: { type: Boolean },
});

module.exports = mongoose.model("events", eventSchemaModel);
