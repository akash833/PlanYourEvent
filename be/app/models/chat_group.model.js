const mongoose = require("mongoose");

const chatGroupSchema = new mongoose.Schema({
  name: { type: String },
  image: { type: String },
  isOneToOne: { type: Boolean , default: true },
  members: [
    {
      userId: { type: mongoose.Types.ObjectId, ref: "user" },
    },
  ],
  lastMessage: { type: mongoose.Types.ObjectId, ref: "groupMessage" }
});

module.exports = mongoose.model("chatGroup", chatGroupSchema);
