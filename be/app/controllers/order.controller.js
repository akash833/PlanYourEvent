const {
  getOrderData,
  getEventsLatestsale,
  getAllOrders,
  updateOrderById
} = require("../services/order.service");

exports.getOrderData = async (req, res) => {
  try {
    const orderData = await getOrderData(req.body);
    res.status(200).send({ data: orderData, success: true });
  } catch (err) {
    res.status(400).send({ success: false, message: "Something went wrong" });
  }
};

exports.getEventsLatestsale = async (req, res) => {
  try {
    const orderData = await getEventsLatestsale(req.user._id);
    res.status(200).send({ data: orderData, success: true });
  } catch (err) {
    res.status(400).send({ success: false, message: "Something went wrong" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const { allOrders, totalOrders, totalPage, allEventsOrders } =
      await getAllOrders(
        req.user._id,
        req.body.page,
        req.body.pageSize,
        req.body.timeFilter,
      );
    res.status(200).send({ data: allOrders, totalOrders, totalPage, allEventsOrders, success: true });
  } catch (err) {
    res.status(400).send({ Message: err });
  }
};


exports.updateOrderById = async (req, res) => {
  try {
    let requestData = {
      _id: req.body._id,
      arrived: req.body.arrived,
    };
    await updateOrderById(requestData);

    res.status(200).json({ Message: "Data Updated" });
  } catch (err) {
    res.status(400).send({ Message: err });
  }
};