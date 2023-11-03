const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Không được để trống"],
    },
    author: {
      type: String,
      required: [true, "Không được để trống"],
    },
    description: {
      type: String,
      required: [true, "Không được để trống"],
    },
    quantity: {
      type: String,
      required: [true, "Không được để trống"],
    },
    publisher: {
      type: String,
      required: [true, "Không được để trống"],
    },
    totalPage: {
      type: String,
      required: [true, "Không được để trống"],
    },
    category: {
      type: String,
      required: [true, "Không được để trống"],
    },
    pictures: {
      type: Array,
      required: true,
    },
  },
  { minimize: false }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
