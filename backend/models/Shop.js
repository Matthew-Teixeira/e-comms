const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
    },
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
  },
  {
    timestamps: true,
  }
);

const Shop = mongoose.model("Shop", shopSchema);
module.exports = Shop;
