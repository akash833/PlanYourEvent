const mongoose = require("mongoose");

const arrivedCustSchemaModel = new mongoose.Schema({
  eventId: { type: mongoose.Types.ObjectId, ref: "events" },
  custName: { type: String },
  email: { type: String },
});

  module.exports = mongoose.model("arrivedCust", arrivedCustSchemaModel);
