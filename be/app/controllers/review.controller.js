const { getReviews, createReviews } = require("../services/review.service");

exports.getReviews = async (req, res) => {
  try {
    const getDataById = await getReviews();
    res.status(200).send({ data: getDataById, success: true });
  } catch (err) {
    res.status(400).send({ Message: err });
  }
};

exports.createReviews = async (req, res) => {
  try {
    const reviewData = req.body;
    if (reviewData) {
      const savedreview = await createReviews(reviewData);
      res.status(201).json({ success: true, data: savedreview });
    } else {
      res.status(201).json({ success: true, message: "Please fill the data" });
      return;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error inserting data",
      error: error.message,
    });
  }
};
