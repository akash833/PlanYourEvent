const custListModel = require("../models/cust_list.model");
const mongoose = require("mongoose");

exports.getCustList = async () => {
  return await custListModel.find({});
};

exports.createCustList = async (custListData) => {
  try {
    const newCustList = new custListModel(custListData);
    const savedCustList = await newCustList.save();
    return savedCustList;
  } catch (error) {
    throw new Error("Error inserting data: " + error.message);
  }
};
