const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_name: { type: String, unique: true },
  contact_number: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  bio: { type: String },
  image: { type: String },
  service_category: [{ type: mongoose.Types.ObjectId, ref: "master_data" }],
  tags:[{ type: mongoose.Types.ObjectId, ref: "master_data" }],
  location: { type: mongoose.Types.ObjectId, ref: "master_data" },
  otp: { type: Number },
  provider: { type: Boolean, default: false },
  preferences: {
    attending: {
      email: {
        newPopUpFeatures: { type: Boolean, default: false },
        weeklyEventGuide: { type: Boolean, default: false },
        allPopUpNewsletters: { type: Boolean, default: false },
      },
      notification: {
        anOrganizer: { type: Boolean, default: false },
        upcomingEvents: { type: Boolean, default: false },
      },
    },
    organizing: {
      email: {
        featuresAndAnnouncements: { type: Boolean, default: false },
        monthlyTipsAndTools: { type: Boolean, default: false },
        EventSalesRecap: { type: Boolean, default: false },
        PopUpNewsLettersAndUpdates: { type: Boolean, default: false },
      },
      notification: {
        orderconfirmations: { type: Boolean, default: false },
        importantReminders: { type: Boolean, default: false },
      },
    },
  },
});

module.exports = mongoose.model("user", userSchema);
