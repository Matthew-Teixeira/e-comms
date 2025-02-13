const { Product } = require("../models");

const createProduct = async (req, res) => {
  try {
    const { name, price, image } = req.body;

    const newProduct = await Product.create({
      name,
      price,
      image,
    });

    res.status(201).json({ message: "New product created", newProduct });
  } catch (error) {
    res.status(201).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();

    res.status(200).json({ message: "All products aquired", allProducts });
  } catch (error) {
    res.status(201).json({ message: error.message });
  }
};

module.exports = { createProduct, getAllProducts };
