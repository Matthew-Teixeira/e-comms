const router = require("express").Router();
const { registerShop, viewAllShops } = require("../../controllers/shopController");

const { protectRoute, adminRoute, superUserRoute } = require("../../middleware/authMiddleware");

router.post("/add", protectRoute, superUserRoute, registerShop);
router.get("/all", protectRoute, superUserRoute, viewAllShops)

module.exports = router;