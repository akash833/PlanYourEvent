const mongoose = require("mongoose");

const newEmailUpdateSchema = new mongoose.Schema({
  userId: { type: String },
  newEmail: { type: String },
  otp: { type: Number },
});

module.exports = mongoose.model("new_email_update", newEmailUpdateSchema);
