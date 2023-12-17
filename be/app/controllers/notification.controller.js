const { trace } = require("../routes/notification.route");
const {
  getNotification,
  createNotification,
  markNotification,
} = require("../services/notification.service");

exports.getNotification = async (req, res) => {
  try {
    const getDataById = await getNotification();
    res.status(200).send({ data: getDataById, success: true });
  } catch (err) {
    res.status(400).send({ Message: err });
  }
};

exports.createNotification = async (req, res) => {
  try {
    const notificationData = req.body;
    if (notificationData) {
      const savedNotification = await createNotification(notificationData);
      res.status(201).json({ success: true, data: savedNotification });
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

exports.markNotification = async(req, res) => {
  try {
    const userId = req.query._id;
    const savedNotification = await markNotification(userId);
    res.status(200).json({ success: true, message: "Status changed" })
  } catch (error) {
     res.status(500).json({
       success: false,
       message: "Error inserting data",
       error: error.message,
     });
  }

}
