const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: String,
  orderAmount: Number,
  orderDate: { type: Date, default: Date.now },
  invoiceFileUrl: String,
});

module.exports = mongoose.model("Order", orderSchema);
