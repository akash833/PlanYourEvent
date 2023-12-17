const Event = require("../models/event.model");
const Order = require("../models/orders.model");
const mongoose = require("mongoose");

exports.createEvent = async (eventData) => {
  try {
    const newEvent = new Event(eventData);
    const savedEvent = await newEvent.save();
    return savedEvent;
  } catch (error) {
    throw new Error("Error inserting data: " + error.message);
  }
};

exports.getEvents = async (user, page, pageSize, timeFilter) => {
  let pipeline = [];

  pipeline.push({
    $match: { user: new mongoose.Types.ObjectId(user) },
  });

  pipeline.push({
    $lookup: {
      from: "event_staffs",
      localField: "_id",
      foreignField: "eventId",
      as: "totalStaff",
    },
  });

  pipeline.push({
    $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "eventId",
      as: "orderInfo",
    },
  });

  const orderQuery = {}; // Define the orderQuery object

  if (timeFilter === "month") {
    // Filter events for the current month
    orderQuery.createdAt = {
      $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    };
  } else if (timeFilter === "week") {
    // Filter events for the current week
    const today = new Date();
    const firstDayOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    orderQuery.createdAt = { $gte: firstDayOfWeek };
  } else if (timeFilter === "year") {
    // Filter events for the current year
    orderQuery.createdAt = { $gte: new Date(new Date().getFullYear(), 0, 1) };
  }

  pipeline.push({
    $match: orderQuery, // Apply the time-based filter
  });

  pipeline.push({
    $sort: { createdAt: -1 },
  });

  const skip = (page - 1) * pageSize;
  let Events = await Event.aggregate(pipeline);
  let totalEvents = Events.length;
  let events = await Event.aggregate(pipeline).skip(skip).limit(pageSize);

  for (let index = 0; index < events.length; index++) {
    let event = events[index];
    const { orderInfo, ticket } = event;
    const { totalSoldTickets, totalRevenue } = orderInfo.reduce(
      (acc, order) => ({
        totalSoldTickets: acc.totalSoldTickets + order.quantity,
        totalRevenue: acc.totalRevenue + order.totalAmount,
      }),
      { totalSoldTickets: 0, totalRevenue: 0 }
    );
    const totalAvailableTickets = ticket.reduce(
      (total, currentTicket) => total + parseInt(currentTicket.tickets),
      0
    );
    const unsoldTickets = totalAvailableTickets - totalSoldTickets;

    event.soldTickets = totalSoldTickets;
    event.totalRevenue = totalRevenue;
    event.unsoldTickets = unsoldTickets;
  }

  const allEvents = events.length;
  const totalPage = Math.ceil(allEvents / pageSize);

  return { events, totalEvents, totalPage };
};

exports.getEventsWithOutPagination = async (user) => {
  let pipeline = [];

  pipeline.push({
    $match: { user: new mongoose.Types.ObjectId(user) },
  });

  pipeline.push({
    $lookup: {
      from: "event_staffs",
      localField: "_id",
      foreignField: "eventId",
      as: "totalStaff",
    },
  });

  pipeline.push({
    $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "eventId",
      as: "orderInfo",
    },
  });
  let events = await Event.aggregate(pipeline);
  //  let events = await Event.find({user});

  for (let index = 0; index < events.length; index++) {
    let event = events[index];
    const { orderInfo } = event;
    const { totalRevenue } = orderInfo.reduce(
      (acc, order) => ({
        totalRevenue: acc.totalRevenue + order.totalAmount,
      }),
      { totalRevenue: 0 }
    );
    event.totalRevenue = totalRevenue;
  }

  return { events };
};

exports.getEventsById = async (_id) => {
  let pipeline = [];

  pipeline.push({ $match: { _id: new mongoose.Types.ObjectId(_id) } });

  pipeline.push({
    $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "eventId",
      as: "orderInfo",
    },
  });

  let eventData = await Event.aggregate(pipeline);

  const { orderInfo, ticket } = eventData[0];

  const { totalSoldTickets, totalRevenue } = orderInfo.reduce(
    (acc, order) => ({
      totalSoldTickets: acc.totalSoldTickets + order.quantity,
      totalRevenue: acc.totalRevenue + order.totalAmount,
    }),
    { totalSoldTickets: 0, totalRevenue: 0 }
  );

  const totalAvailableTickets = ticket.reduce(
    (total, currentTicket) => total + parseInt(currentTicket.tickets),
    0
  );

  const unsoldTickets = totalAvailableTickets - totalSoldTickets;

  eventData[0].soldTickets = totalSoldTickets;
  eventData[0].totalRevenue = totalRevenue;
  eventData[0].unsoldTickets = unsoldTickets;

  return eventData[0];
};

exports.deleteEventById = async (_id) => {
  if (_id) {
    return await Event.findByIdAndDelete(_id);
  } else {
    return { message: "Event Not Found" };
  }
};

exports.updateEventsById = async (data) => {
  await Event.findByIdAndUpdate(data._id, {
    $set: {
      eventTitle: data.eventTitle,
      startTime: data.startTime,
      endTime: data.endTime,
      eventDescription: data.eventDescription,
      city: data.city,
      eventPhotosUrl: data.eventPhotosUrl,
      eventTypeSubHeading: data.eventTypeSubHeading,
      ticket: data.ticket || [],
      eventType: data.eventType,
      guestList: data.guestList,
      Address: data.Address,
      showRemainingCount: data.showRemainingCount,
      isActive : data.isActive
    },
  });
  return { Message: "Data Updated" };
};

exports.updateIsActiveEventsById = async (data) => {
  await Event.findByIdAndUpdate(data._id, {
    $set: {
      isActive: data.isActive,
    },
  });
  return { Message: "Data Updated" };
};

exports.getEventsByIdFilterDateRange = async (_id, startDate, endDate) => {
  let pipeline = [];

  pipeline.push({ $match: { _id: new mongoose.Types.ObjectId(_id) } });

  pipeline.push({
    $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "eventId",
      as: "orderInfo",
    },
  });

  const StartDate = new Date(startDate);
  const EndDate = new Date(endDate);
  EndDate.setDate(EndDate.getDate() + 1);

  pipeline.push({
    $addFields: {
      orderInfo: {
        $filter: {
          input: "$orderInfo",
          as: "order",
          cond: {
            $and: [
              { $gte: ["$$order.createdAt", StartDate] },
              { $lte: ["$$order.createdAt", EndDate] },
            ],
          },
        },
        // $match: {
        //   createdAt: { $gte: startDate, $lte: endDate },
        // },
      },
    },
  });

  // pipeline.push({
  //   $match: {
  //     createdAt: { $gte: startDate, $lte: endDate },
  //   },
  // });

  let eventData = await Event.aggregate(pipeline);

  const { orderInfo, ticket } = eventData[0];

  const { totalSoldTickets, totalRevenue } = orderInfo.reduce(
    (acc, order) => ({
      totalSoldTickets: acc.totalSoldTickets + order.quantity,
      totalRevenue: acc.totalRevenue + order.totalAmount,
    }),
    { totalSoldTickets: 0, totalRevenue: 0 }
  );

  const totalAvailableTickets = ticket.reduce(
    (total, currentTicket) => total + parseInt(currentTicket.tickets),
    0
  );

  const unsoldTickets = totalAvailableTickets - totalSoldTickets;

  eventData[0].soldTickets = totalSoldTickets;
  eventData[0].totalRevenue = totalRevenue;
  eventData[0].unsoldTickets = unsoldTickets;

  return eventData[0];
};
