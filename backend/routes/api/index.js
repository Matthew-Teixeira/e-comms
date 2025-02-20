const router = require("express").Router();
const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const shopRoutes = require("./shopRouter");

router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/shop", shopRoutes);

module.exports = router;
