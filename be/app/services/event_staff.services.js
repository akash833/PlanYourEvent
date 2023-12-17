const EventStaffModel = require("../models/event_staff.model");
const EventModel = require("../models/event.model");
const mongoose = require("mongoose");


exports.createEventStaffData = async (event_staff_data, user) => {
  console.log("here");
  const event = await EventModel.findOne({user});
  event_staff_data.eventId = event_staff_data.eventId || event._id;
  const isExists = await EventStaffModel.findOne({ eventId: event_staff_data.eventId, staffId: event_staff_data.staffId });
  if (!isExists){
    return await EventStaffModel.create(event_staff_data);
  } else {
    return false;
  }
};

exports.addEventStaffData = async (event_staff_data) => {
  const event = await EventModel.findById(event_staff_data.eventId.toString());
  event_staff_data.userId = event.user;
  const isExists = await EventStaffModel.findOne({
    eventId: event_staff_data.eventId,
    staffId: event_staff_data.staffId,
    offer: event_staff_data.offer,
  });
  if (!isExists){
    return await EventStaffModel.create(event_staff_data);
  } else {
    return false;
  }
};

exports.getEventStaffData = async (eventId) => {
  return await EventStaffModel.find({ eventId })
    .populate("eventId")

    .populate({
      path: "staffId",
      populate: {
        path: "service_category",
      },
    })
    .populate({
      path: "staffId",
      populate: {
        path: "tags",
      },
    })
    .populate("userId");
};

exports.removeEventStaffData = async(_id) => {
  if(_id){
    return await EventStaffModel.findByIdAndDelete(_id);
  }else {
    return{message: 'Staff is not exists.'} 

  }
}

exports.updateStatusEventStaff = async (data) => {
  const isStatus = await EventStaffModel.findOne({ eventId: data.eventId, staffId: data.staffId });
  if(isStatus){
    await EventStaffModel.updateOne({ staffId: data.staffId, eventId: data.eventId }, { $set: { status: data.status } });
    return { Message: "Data Updated" };
  }else {
    // res .status(409).send({message: 'Staff is not exists.'})
    return{message: 'Staff is not exists.'} 
  }

};

exports.getByStaffId = async (user) => {
  let pipeline = [];
  pipeline.push({
    $match: { staffId: new mongoose.Types.ObjectId(user) },
  });

  const staff = await EventStaffModel.aggregate(pipeline);
  const populatedStaff = await EventStaffModel.populate(staff, {
    path: "eventId",
  });

  return populatedStaff;

};

