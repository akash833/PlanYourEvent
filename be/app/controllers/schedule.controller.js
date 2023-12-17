const { trace } = require("../routes/schedule.route");
const { getMySchedule } = require("../services/schedule.services");

exports.getMySchedule = async (req, res) => {
  try {
    const { schedule, length } = await getMySchedule(
      req.body.page,
      req.body.pageSize,
      req.user._id
    );
    res
      .status(200)
      .send({ data: schedule, total : length,  success: true });
  } catch (err) {
    res.status(400).send({ Message: err });
  }
};

