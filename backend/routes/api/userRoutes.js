const router = require("express").Router();
const {
  getUsers,
  registerUser,
  loginUser,
} = require("../../controllers/userControllers");
const protectRoute = require("../../middleware/authMiddleware");

router.get("/all", protectRoute, getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
