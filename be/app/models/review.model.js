const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  img: { type: String },
  name: { type: String },
  eventName: { type: String },
  review: { type: String },
  time: { type: String },
});

module.exports = mongoose.model("review", reviewSchema);
