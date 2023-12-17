const tempOrder = require("../models/temp_order.model");
const Order = require("../models/orders.model");
const Event = require("../models/event.model");
const mongoose = require("mongoose");
const { transaction } = require("../services/transaction.services");


exports.addTempOrder = async (orderData) => {
  try {
    const newOrder = new tempOrder(orderData);
    const savedOrder = await newOrder.save();
    return savedOrder;
  } catch (error) {
    throw new Error("Error inserting data: " + error.message);
  }
};

exports.addFinalOrder = async (order_id) => {
  try {
    let orderData = await tempOrder.findOne({ _id: order_id });
    let finalOrderData = {
      orderId: order_id,
      eventId: orderData.eventId,
      ticketType: orderData.ticketType,
      totalAmount: orderData.totalAmount,
      quantity: orderData.quantity,
      city: orderData.city,
      country: orderData.country,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      ticketId: orderData.ticketId,
      qrUrl: orderData.qrUrl,
    };
    const newOrder = new Order(finalOrderData);
    const savedOrder = await newOrder.save();
    await transaction(orderData.eventId, orderData.totalAmount);
    return savedOrder;
  } catch (error) {
    throw new Error("Error inserting data: " + error.message);
  }
};

exports.getOrderData = async (requestData) => {
  let pipeline = [];
  pipeline.push({
    $match: {
      eventId: new mongoose.Types.ObjectId(requestData.eventId),
    },
  });

  let orderData = await Order.aggregate(pipeline);

  return orderData;
};

exports.getEventsLatestsale = async (user) => {
  const events = await Event.find({ user });
  const allEvents = events.map((e) => e._id);
  const allOrders = await Order.find({ eventId: { $in: allEvents } })
    .sort({ createdAt: -1 })
    .populate("eventId");

  const firstFiveEvents = allOrders.slice(0, 5);
  return firstFiveEvents;
};

exports.getAllOrders = async (user, page, pageSize, timeFilter) => {
  try {
    const event = await Event.find({ user });
    const allEvents = event.map((e) => e._id);
    const skip = (page - 1) * pageSize;

    let orderQuery = { eventId: { $in: allEvents } };

    if (timeFilter === "month") {
      orderQuery.createdAt = {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      };
    } else if (timeFilter === "week") {
      const today = new Date();
      const firstDayOfWeek = new Date(
        today.setDate(today.getDate() - today.getDay())
      );
      orderQuery.createdAt = { $gte: firstDayOfWeek };
    } else if (timeFilter === "year") {
      orderQuery.createdAt = { $gte: new Date(new Date().getFullYear(), 0, 1) };
    }

    const allEventsOrders = (await Order.find(orderQuery)).length;
    const allOrders = await Order.find(orderQuery)
      .populate("eventId")
      .skip(skip)
      .limit(pageSize);
    const totalOrders = allOrders.length;
    const totalPage = Math.ceil(totalOrders / pageSize);

    return { allOrders, totalOrders, totalPage, allEventsOrders };
  } catch (err) {
    res.status(400).send({ Message: err });
  }
};


exports.updateOrderById = async (data) => {
  await Order.findByIdAndUpdate(data._id, {
    $set: {
      arrived: data.arrived,
    },
  });
  return { Message: "Data Updated" };
};