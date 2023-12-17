const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId },
  amount: { type: Number },
  date: { type: Date, default:Date.now },
  type: { type: String },
  description: { type: String}
});

module.exports = mongoose.model("transaction", transactionSchema);
