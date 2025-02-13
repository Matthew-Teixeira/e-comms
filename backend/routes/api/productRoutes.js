const router = require("express").Router();
const {
  createProduct,
  getAllProducts,
} = require("../../controllers/productController");

const protectRoute = require("../../middleware/authMiddleware");

router.post("/add", protectRoute, createProduct);
router.get("/all", protectRoute, getAllProducts);

module.exports = router;
