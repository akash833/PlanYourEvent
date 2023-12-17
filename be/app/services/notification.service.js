const notificationModel = require("../models/notification.model");
const mongoose = require("mongoose");

exports.getNotification = async () => {
  return await notificationModel.find({}).populate("targetId");
};

exports.createNotification = async (notificationData) => {
  try {
    const newNotification = new notificationModel(notificationData);
    const savedNotification = await newNotification.save();
    return savedNotification;
  } catch (error) {
    throw new Error("Error inserting data: " + error.message);
  }
};

exports.markNotification = async (userId) => {
  try {
   const updated = await notificationModel.updateMany(
     { targetId: userId },
     { $set: { markAsRead: true} });
     return { Message: "Data Updated" };
  } catch (error) {
    throw new Error("Error marking notification as read");
  }
};