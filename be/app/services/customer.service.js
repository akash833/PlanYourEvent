const arrivedCustModel = require("../models/customer.model");
const mongoose = require("mongoose");

exports.createArrivedCust = async (custData) => {
  try {
    
    const arrivedCust = new arrivedCustModel(custData);
    const savedEvent = await arrivedCust.save();
    return savedEvent;
  } catch (error) {
    throw new Error("Error inserting data: " + error.message);
  }
};

exports.getArrivedCust = async (_id, pageNum, pageLength) => {
 let pipeline = [];
    
 pipeline.push({
   $match: { eventId: new mongoose.Types.ObjectId(_id) },
 });
 
let getCustData = await arrivedCustModel.aggregate(pipeline).exec();

let getCustLength = getCustData.length;

const skip = (pageNum - 1) * pageLength;
let getCust = await arrivedCustModel
  .aggregate(pipeline)
  .skip(skip)
  .limit(pageLength);
return { getCust, getCustLength };
};




