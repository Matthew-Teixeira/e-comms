const { Product, Shop } = require("../models");

const createProduct = async (req, res) => {
  try {
    const { name, price, image } = req.body;
    const { shopId } = req.params;

    const newProduct = await Product.create({
      name,
      price,
      image,
      shopId,
    });

    // Add the product ID to the shop's product array
    await Shop.findByIdAndUpdate(
      shopId,
      { $push: { products: newProduct._id } },
      { new: true }
    );

    res.status(201).json({ message: "New product created", newProduct });
  } catch (error) {
    res.status(201).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find()
      .select("-__v")
      .populate({
        path: "shopId",
        populate: {
          path: "products",
        },
      });

    res.status(200).json({ message: "All products aquired", allProducts });
  } catch (error) {
    res.status(201).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId, shopId } = req.params;

    // Remove the product
    await Product.findByIdAndDelete(productId);

    // Remove the product _id from the shop
    await Shop.findByIdAndUpdate(shopId, {
      $pull: { products: productId },
    });

    res.status(201).json({ message: "Successfully deleted product" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createProduct, getAllProducts, deleteProduct };
