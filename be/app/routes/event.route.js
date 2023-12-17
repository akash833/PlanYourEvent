const express = require("express");
const router = express.Router();
// const eventController = require("../controllers/event.controller");
const {
  createEvent,
  getEvents,
  getEventsById,
  updateEventsById,
  updateIsActiveEventsById,
  deleteEvent,
  getEventsByIdFilterDateRange,
  getEventsWithOutPagination
} = require("../controllers/event.controller");


router.post("/", createEvent);
router.post('/get-event', getEvents);
router.get("/get-eventById", getEventsById);
router.post("/update-eventById", updateEventsById);
router.post("/update-isActive-eventById", updateIsActiveEventsById);
router.post("/delete-event", deleteEvent);
router.post('/get-eventById-filterDateRange', getEventsByIdFilterDateRange);
router.get('/get-event-without-pagination', getEventsWithOutPagination);


module.exports = router;