const router = require("express").Router();
const {
  getUsers,
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile
} = require("../../controllers/userControllers");
const protectRoute = require("../../middleware/authMiddleware");

router.get("/all", protectRoute, getUsers);
router.get("/profile", protectRoute, getUserProfile);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/profile", protectRoute, updateUserProfile);


module.exports = router;
