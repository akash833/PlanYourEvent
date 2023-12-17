const Event = require("../models/event.model");
const User = require("../models/user.model");
const tempOrder = require("../models/temp_order.model");
const Order = require("../models/orders.model");
const mongoose = require("mongoose");
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");
const { Buffer } = require("buffer");
const stripe = require("stripe")(process.env.MERCHANT_KEY);
const { addTempOrder, addFinalOrder } = require("../services/order.service");
const nodemailer = require("nodemailer");

exports.getPublicEventDetails = async (_id) => {
  let pipeline = [];

  pipeline.push({
    $match: {
      _id: new mongoose.Types.ObjectId(_id),
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

  let eventData = await Event.aggregate(pipeline);

  let orderList = eventData[0].orderInfo;

  let ticketList = eventData[0].ticket;

  const ticketIdToQuantityMap = {};

  orderList.forEach((order) => {
    const { ticketId, quantity } = order;
    if (ticketIdToQuantityMap[ticketId]) {
      ticketIdToQuantityMap[ticketId] += quantity;
    } else {
      ticketIdToQuantityMap[ticketId] = quantity;
    }
  });

  ticketList.forEach((ticket) => {
    const { _id, tickets } = ticket;
    if (ticketIdToQuantityMap[_id]) {
      const orderedQuantity = ticketIdToQuantityMap[_id];
      ticket.remainingTickets = parseInt(tickets) - orderedQuantity;
    } else {
      ticket.remainingTickets = parseInt(tickets);
    }
  });

  eventData[0].ticket = ticketList;

  let user = await User.findById(eventData[0].user);

  return { eventData, user };
};

exports.generateQrCode = async (_id) => {
  let qrCode = await QRCode.toDataURL(_id.toString());
  let qrUrl = await this.storeQrImage(qrCode);
  return qrUrl;
};

exports.storeQrImage = async (base64) => {
  const imageData = base64.split(";base64,").pop();
  const imageBuffer = Buffer.from(imageData, "base64");
  const imageFormat = "png";
  const imagesDirectory = path.join(__dirname, "../images");
  if (!fs.existsSync(imagesDirectory)) {
    fs.mkdirSync(imagesDirectory);
  }
  const timestamp = Date.now();
  const imageFileName = `image_${timestamp}.${imageFormat}`;
  const imagePath = path.join(imagesDirectory, imageFileName);
  fs.writeFileSync(imagePath, imageBuffer);
  return imageFileName;
};

exports.generatePaymentLink = async (data) => {
  let eventDetail = await Event.findOne({ _id: data.eventId });

  let ticketDetail = eventDetail.ticket.find(
    (obj) => obj._id.toString() === data.ticketId
  );

  data.totalAmount = parseInt(ticketDetail.amount) * data.quantity;

  data.ticketType = ticketDetail.name;

  let orderData = await addTempOrder(data);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        quantity: data.quantity,
        price_data: {
          currency: "USD",
          unit_amount: parseInt(ticketDetail.amount) * 100,
          product_data: {
            name: data.customerName,
          },
        },
      },
    ],
    mode: "payment",
    customer_email: data.customerEmail, //
    payment_method_types: ["card"],
    success_url: process.env.CALLBACK_URL + "/" + orderData.orderId,
    cancel_url: process.env.CALLBACK_URL + "/" + orderData.orderId,
  });

  await tempOrder.updateOne(
    { _id: orderData._id },
    { $set: { stripeId: session.id } }
  );

  return session.url;
};

const sendMailWithQR = async ({finalOrder,qrUrl}) => {
  const userName = finalOrder.customerName;
  const userEmail = finalOrder.customerEmail;
  const quantity = finalOrder.quantity;
  const ticketType = finalOrder.ticketType;
  const ticketAmount = finalOrder.totalAmount;
  const imagePath = `${process.env.BASE_URL}${qrUrl}`;
  const sendBy = process.env.EMAIL;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
var emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Email Title</title>
    <style>
        .qr-code{
            width: 200px;
            height: 200px;
        }
    </style>
</head>
<body>
    <div><p>Hi ${userName},</p></div>
    <div><p>Thank you for booking ${quantity} ${ticketType} tickets with Popup. Your ticket QR code is here:</p></div>
    <div class="qr-code">
        <img src="${imagePath}" alt="QR Code">
    </div>
    <div><p>Total Amount: $${ticketAmount}</p></div>
    <div><p>Thanks and regards</p></div>
    <div><p>Team Popup</p></div>
</body>
</html>
`;


  var mailOptions = {
    from: sendBy,
    to: userEmail,
    subject: "Your ticket is booked successfully",
    html: emailHtml,
    attachments: [
      {
        filename: "qr-code.png",
        path: imagePath,
        cid: "unique-image-id",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
  }
};

exports.updateOrderStatus = async ({ orderId }) => {
  let orderData = await tempOrder.findOne({ orderId: orderId });
  let orderStatus = await this.getOrderStatus(orderData.stripeId);
  let finalOrder = await addFinalOrder(orderData._id);
  
  if (orderStatus === "paid") {
    let isExist = await this.checkOrderExists(orderData._id);
    if (isExist) {
      let qrUrl = await this.generateQrCode(finalOrder._id);
      await tempOrder.updateOne(
        { _id: orderData._id },
        { $set: { qrUrl: qrUrl } }
      );
      sendMailWithQR({ finalOrder, qrUrl});
    }
  }
  return { orderStatus, orderId: finalOrder._id };
};

exports.getOrderStatus = async (stripeId) => {
  const paymentData = await stripe.checkout.sessions.retrieve(stripeId);
  let paymentStatus = paymentData.payment_status;
  return paymentStatus;
};

exports.checkOrderExists = async (orderId) => {
  let orderData = await Order.findOne({ orderId: orderId });
  return orderData ? true : false;
};

exports.getEventByOrderId = async (orderId) => {
  return await Order.findById(orderId).populate("eventId").populate("orderId");
};
