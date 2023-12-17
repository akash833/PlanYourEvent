const mongoose = require("mongoose");

const orderSchemaModel = new mongoose.Schema({
  orderId: { type: mongoose.Types.ObjectId, ref: "tempOrders" },
  orderUniqueId: { type: Number, unique: true },
  eventId: { type: mongoose.Types.ObjectId, ref: "events" },
  createdAt: { type: Date, default: Date.now() },
  ticketType: { type: String },
  totalAmount: { type: Number },
  quantity: { type: Number },
  city: { type: String },
  country: { type: String },
  customerName: { type: String },
  customerEmail: {type: String},
  ticketId: { type: mongoose.Types.ObjectId },
  arrived: { type: Boolean, default: false },
  qrUrl:{type:String},
});

orderSchemaModel.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const latestOrder = await this.constructor.findOne(
        {},
        {},
        { sort: { orderUniqueId: -1 } }
      );
      const nextOrderId = (latestOrder && latestOrder.orderUniqueId) || 0;
      this.orderUniqueId = nextOrderId + 1;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model("orders", orderSchemaModel);
