const {
  getPublicEventDetails,
  generatePaymentLink,
  updateOrderStatus,
  getEventByOrderId
} = require("../services/public.service");

exports.getPublicEventDetails = async (req, res) => {
  try {
    const { eventData, user } = await getPublicEventDetails(req.query._id);
    res.status(200).send({ data:  {eventData, user }, success: true });
  } catch (err) {
    res.status(400).send({ Message: err });
  }
};

exports.generatePaymentLink = async (req, res) => {
  try {
    const paymentLink = await generatePaymentLink(req.body);
    res.status(200).send({ data: paymentLink, success: true });
  } catch (err) {
    res.status(400).send({ Message: err });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const updateResponse = await updateOrderStatus(req.params);
    var orderId = req.params.orderId;
    // res.status(200).send({ data: updateResponse, success: true });
    res.redirect(process.env.API_URL +  '/ticket-confirm?orderId=' + updateResponse.orderId);
  } catch (err) {
    res.status(400).send({ Message: err });
  }
};

exports.getEventByOrderId = async (req, res) => {
  try {
    const order = await getEventByOrderId(req.params.orderId);
    res.status(200).send({ data: order, success: true });
  } catch (err) {
    res.status(400).send({ Message: err });
  }
};

