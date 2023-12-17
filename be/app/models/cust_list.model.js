const mongoose = require("mongoose");

const custListSchema = new mongoose.Schema({
  custId: { type: String },
  dateJoin: { type: String },
  name: { type: String },
  ticketOrder: { type: String },
  location: { type: String },
  lastOrder: { type: String },
  time: { type: String },
  totalSpent: { type: String },
});

module.exports = mongoose.model("customerList", custListSchema);
