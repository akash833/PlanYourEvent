const EventStaff = require("../models/event_staff.model");
const mongoose = require("mongoose");


exports.getMySchedule = async (page, pageSize, Id) => {
  let pipeline = [];
  pipeline.push({
    $match: { staffId: new mongoose.Types.ObjectId(Id) },
  });
  const skip = (page - 1) * pageSize;
  const events = await EventStaff.aggregate(pipeline)
    .skip(skip)
    .limit(pageSize);
  const schedule = await EventStaff.populate(events, [
    { path: "userId" },
    { path: "eventId" },
  ]);
  const totalEvents = await EventStaff.aggregate(pipeline);
  const length = totalEvents.length;

  return {schedule, length};
};

