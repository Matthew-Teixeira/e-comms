const { User, Shop, Product } = require("../models");

const registerShop = async (req, res) => {
  try {
    const { name, location } = req.body;

    const newShop = await Shop.create({
      name,
      location,
    });

    res.status(201).json({ message: "Succefully created new shop", newShop });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const viewAllShops = async (req, res) => {
  try {
    const allShops = await Shop.find();

    res.status(200).json({ message: "Succefully aquired all shops", allShops });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { registerShop, viewAllShops };
