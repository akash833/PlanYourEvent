const {
  createEvent,
  getEvents,
  getEventsById,
  updateEventsById,
  updateIsActiveEventsById,
  deleteEventById,
  getEventsLatestsale,
  getEventsByIdFilterDateRange,
  getEventsWithOutPagination,
} = require("../services/event.service");

exports.createEvent = async (req, res) => {
  try {
    const eventData = req.body;
    const user = req.user;
    eventData.user = user._id;
    const savedEvent = await createEvent(eventData);
    res.status(201).json({ success: true, data: savedEvent });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error inserting data",
      error: error.message,
    });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const page = parseInt(req.body.page);
    const pageSize = parseInt(req.body.pageSize);
    const timeFilter = req.body.timeFilter;

    const { events, totalEvents, totalPage } = await getEvents(
      req.user._id,
      page,
      pageSize,
      timeFilter
    );
    res
      .status(200)
      .send({ data: events, totalEvents, totalPage, success: true });
  } catch (err) {
    res.status(400).send({ Message: err });
  }
};

exports.getEventsWithOutPagination = async (req, res) => {
  try {
    const { events } = await getEventsWithOutPagination(req.user._id);
    res.status(200).send({ data: events, success: true });
  } catch (err) {
    res.status(400).send({ Message: err });
  }
};

exports.getEventsById = async (req, res) => {
  try {
    const getDataById = await getEventsById(req.query._id);
    res.status(200).send({ data: getDataById, success: true });
  } catch (err) {
    res.status(400).send({ Message: err });
  }
};

exports.deleteEvent = async (req, res) => {
  let query = req.query._id;
  try {
    await deleteEventById(query);
    res.json({ status: `Delete Successfully`, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEventsById = async (req, res) => {
  try {
    let requestData = {
      _id: req.body._id,
      eventTitle: req.body.eventTitle,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      eventDescription: req.body.eventDescription,
      city: req.body.city,
      eventPhotosUrl: req.body.eventPhotosUrl,
      eventTypeSubHeading: req.body.eventTypeSubHeading,
      ticket: req.body.ticket || [],
      eventType: req.body.eventType,
      guestList: req.body.guestList,
      Address: req.body.Address,
      showRemainingCount: req.body.showRemainingCount,
      isActive: req.body.isActive
    };
    await updateEventsById(requestData);

    res.status(200).json({ Message: "Data Updated" });
  } catch (err) {
    res.status(400).send({ Message: err });
  }
};

exports.updateIsActiveEventsById = async (req, res) => {
  try {
    let requestData = {
      _id: req.body._id,
      isActive: req.body.isActive,
    };
    await updateIsActiveEventsById(requestData);

    res.status(200).json({ Message: "Data Updated" });
  } catch (err) {
    res.status(400).send({ Message: err });
  }
};

exports.getEventsLatestsale = async (req, res) => {
  try {
    const { events } = await getEventsLatestsale(req.user._id);
    res.status(200).send({ data: events, success: true });
  } catch (err) {
    res.status(400).send({ Message: err });
  }
};

exports.getEventsByIdFilterDateRange = async (req, res) => {
  try {
    const getDataById = await getEventsByIdFilterDateRange(req.body._id,req.body.startDate, req.body.endDate);
    if (getDataById) {
      res.status(200).send({ data: getDataById, success: true });
    } else {
      res.status(200).send({ data: "No Record" });
    }
  } catch (err) {
    res.status(400).send({ Message: err });
  }
};
