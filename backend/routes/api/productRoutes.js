const router = require("express").Router();
const {
  createProduct,
  getAllProducts,
  deleteProduct
} = require("../../controllers/productController");

const { protectRoute, adminRoute, superUserRoute } = require("../../middleware/authMiddleware");

router.post("/add/:shopId", protectRoute, adminRoute, createProduct);
router.get("/all", getAllProducts);
router.delete("/remove/:productId/:shopId", protectRoute, adminRoute, deleteProduct);

module.exports = router;
