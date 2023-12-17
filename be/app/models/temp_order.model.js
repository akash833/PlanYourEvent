const mongoose = require("mongoose");

const tempOrderSchemaModel = new mongoose.Schema({
  orderId: { type: Number, unique: true },
  eventId: { type: mongoose.Types.ObjectId, ref: "events" },
  createdAt: { type: Date, default: Date.now() },
  ticketType: { type: String },
  totalAmount: { type: Number },
  quantity: { type: Number },
  city: { type: String },
  country: { type: String },
  customerName: { type: String },
  customerEmail:{type:String},
  ticketId: { type: mongoose.Types.ObjectId },
  stripeId: { type: String },
  qrUrl : {type:String}
});

tempOrderSchemaModel.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const latestOrder = await this.constructor.findOne(
        {},
        {},
        { sort: { orderId: -1 } }
      );
      const nextOrderId = (latestOrder && latestOrder.orderId) || 0;
      this.orderId = nextOrderId + 1;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model("tempOrders", tempOrderSchemaModel);
