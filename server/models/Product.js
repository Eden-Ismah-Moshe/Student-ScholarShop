const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productUrl: { type: String, required: true },
    currency: { type: String, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    originalPrice: { type: Number },
    priceHistory: [
      {
        price: { type: Number /*, required: true*/ },
        date: { type: Date, default: Date.now },
      },
    ],
    lowestPrice: { type: Number },
    highestPrice: { type: Number },
    averagePrice: { type: Number },
    discountRate: { type: Number },
    isOutOfStock: { type: Boolean },
    description: { type: String },
    users: [{ email: { type: String, required: true } }],
    default: [],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
