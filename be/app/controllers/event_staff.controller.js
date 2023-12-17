const {
  createEventStaffData,
  getEventStaffData,
  removeEventStaffData,
  updateStatusEventStaff,
  getByStaffId,
  findEventByStaffId,
} = require("../services/event_staff.services");
const { payToStaff } = require("../services/transaction.services");
const { getEventsById } = require("../services/event.service");

exports.create = async (req, res) => {
  try {
    console.log(req.user);
    const event = await createEventStaffData(req.body, req.user._id);
    if (event) {
      res.json({ data: event, status: "success" });
    } else {
      res.status(409).send({ message: "Staff is already exists." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  let query = req.query.eventId;
  try {
    const getEventStaff = await getEventStaffData(query);
    res.json({ data: getEventStaff, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeData = async (req, res) => {
  let query = req.query._id;
  try {
    await removeEventStaffData(query);
    res.json({ status: "Delete Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatusEventStaff = async (req, res) => {
  try {
    let requestData = {
      staffId: req.body.staffId,
      eventId: req.body.eventId,
      status: req.body.status,
    };
    await updateStatusEventStaff(requestData);
    res.status(200).json({ Message: "Data Updated" });
  } catch (err) {
    res.status(400).send({ Message: err });
  }
};

exports.getByStaffId = async (req, res) => {
  try {
    const getStaffIdData = await getByStaffId(req.user._id);
    res.json({ data: getStaffIdData, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findEventByStaffId = async (req, res) => {
  let query = req.query.staffId;
  try {
    const getStaffIdData = await findEventByStaffId(query);
    res.json({ data: getStaffIdData, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePaymentStatus = async (req, res) => {
  try {
    let requestData = {
      staffId: req.body.staffId,
      eventId: req.body.eventId,
      userId: req.user._id,
    };
    // await updatePaymentStatus(requestData);
    const { savedOrganizerTransaction, savedWorkerTransaction } =
      await payToStaff(requestData);
   if (savedOrganizerTransaction && savedWorkerTransaction) {
     res.status(200).send({
       data: [savedOrganizerTransaction, savedWorkerTransaction],
       success: true,
       Message: "Payment Status Updated 😊",
     });
   } else {
     res.status(200).send({ Message: "You have not sufficient balance", success: false});
   }
  } catch (err) {
    res.status(400).send({ Message: err });
  }
};
