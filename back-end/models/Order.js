const mongoose = require("mongoose");
const moment = require("moment-timezone");

const formattedDate = moment()
  .tz("Asia/Ho_Chi_Minh")
  .format("YYYY/MM/DD hh:mm:ss");

// Data
const OrderSchema = mongoose.Schema(
  {
    products: {
      type: Object,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      default: "Đang xử lý",
    },
    count: {
      type: Number,
      default: 0,
    },
    date: {
      type: String,
      default: formattedDate,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    ship: {
      type: Boolean,
      default: false,
    },
    returnDate: {
      type: String,
      default: "",
    },
    takeBookDate: {
      type: String,
      default: "",
    },
  },
  { minimize: false }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
