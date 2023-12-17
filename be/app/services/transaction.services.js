const EventStaffModel = require("../models/event_staff.model");
const Event = require("../models/event.model");
const User = require("../models/user.model");
const Transaction = require("../models/transaction.model");
const mongoose = require("mongoose");

exports.transaction = async (eventId, amount) => {
  let pipeline = [];
  
  pipeline.push({
    $match: {
      _id: new mongoose.Types.ObjectId(eventId),
    },
  });

  let findEvent = await Event.aggregate(pipeline);
  let finalTransactionData = {
    userId: findEvent[0].user,
    amount: amount,
    type: "Credit",
    description: "Ticket Sold"
  };
  const newTransaction = new Transaction(finalTransactionData);
  const savedTransaction = await newTransaction.save();
  return savedTransaction;
};

exports.payToStaff = async (requestData) => {
  let pipeline = [];
  let transactionPipeline = [];
  pipeline.push({
    $match: {
      eventId: new mongoose.Types.ObjectId(requestData.eventId),
      staffId: new mongoose.Types.ObjectId(requestData.staffId),
    },
  });

    transactionPipeline.push({
      $match: {
        userId: new mongoose.Types.ObjectId(requestData.userId),
      },
    });

  const isExists = await EventStaffModel.findOne({
    eventId: requestData.eventId,
    staffId: requestData.staffId,
  });

  var eventStaff = await EventStaffModel.aggregate(pipeline);
  var staff = await User.findById(requestData.staffId);
  console.log("staff", staff)
  var offer = eventStaff[0].offer;

  let organizerData = {
    userId: requestData.userId,
    amount: offer.price,
    type: "Debit",
    description: `Paid ${staff.user_name}`
  };

  console.log("organizerData", organizerData)

  let workerData = {
    userId: requestData.staffId,
    amount: offer.price,
    type: "Credit",
    description: "Organizer Paid"
  };

  const user = await Transaction.aggregate(transactionPipeline);
  const filterCreditAmount = user.filter((e) => e.type === "Credit");
  const filterDebitAmount = user.filter((e) => e.type === "Debit");
  const totalCreditAmount = filterCreditAmount.reduce(
    (total, obj) => total + obj.amount,
    0
  );
  const totalDebitAmount = filterDebitAmount.reduce(
    (total, obj) => total + obj.amount,
    0
  );

  const availableBalance = totalCreditAmount - totalDebitAmount

  if (availableBalance >= offer.price) {
     const organizerTransaction = new Transaction(organizerData);
     const savedOrganizerTransaction = await organizerTransaction.save();

     const workerTransaction = new Transaction(workerData);
     const savedWorkerTransaction = await workerTransaction.save();

      if (isExists) {
        await EventStaffModel.updateOne(
          { staffId: requestData.staffId, eventId: requestData.eventId },
          { $set: { payStatus: "paid" } }
        );
      } 
     return { savedOrganizerTransaction, savedWorkerTransaction };
  }else {
    return "You Have Not Sufficient Balance"
  }

 
};

exports.getTransactions = async (userId, page, pageSize) => {
  let transactionPipeline = [];
  transactionPipeline.push({
    $match: {
      userId: new mongoose.Types.ObjectId(userId),
    },
  });
  const skip = (page - 1) * pageSize;
  const transactions = await Transaction.aggregate(transactionPipeline)
    .skip(skip)
    .limit(pageSize);
  const total = await Transaction.aggregate(transactionPipeline);

  const filterCreditAmount = total.filter((e) => e.type === "Credit");
  const filterDebitAmount = total.filter((e) => e.type === "Debit");
  const totalCreditAmount = filterCreditAmount.reduce(
    (total, obj) => total + parseInt(obj.amount),
    0
  );
  const totalDebitAmount = filterDebitAmount.reduce(
    (total, obj) => total + parseInt(obj.amount),
    0
  );

  const availableBalance = totalCreditAmount - totalDebitAmount;

  const totalTransactions = total.length
  return { transactions, totalTransactions, availableBalance };
};