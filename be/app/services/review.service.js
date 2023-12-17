const reviewModel = require("../models/review.model");
const mongoose = require("mongoose");

exports.getReviews = async () => {
  return await reviewModel.find({});
};

exports.createReviews = async (reviewData) => {
  try {
    const newReview = new reviewModel(reviewData);
    const savedReview = await newReview.save();
    return savedReview;
  } catch (error) {
    throw new Error("Error inserting data: " + error.message);
  }
};