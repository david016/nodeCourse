const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    // type: String,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
