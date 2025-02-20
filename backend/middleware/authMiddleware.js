const jwt = require("jsonwebtoken");
const { User } = require("../models");

const protectRoute = async (req, res, next) => {
  let token;

  // Set token to name of cookie
  token = req.cookies.ecomms_user;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password -__v").populate('shopId');

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized or invalid token" });
    }
  } else {
    res.status(401).json({ message: "Not authorized: no token" });
  }
};

const adminRoute = async (req, res, next) => {
  let token;

  // Set token to name of cookie
  token = req.cookies.ecomms_user;

  if (token) {
    try {
      if (!req.user.admin) throw new Error();

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized: Not an admin" });
    }
  } else {
    res.status(401).json({ message: "Not authorized: no token" });
  }
};

const superUserRoute = async (req, res, next) => {
  let token;

  // Set token to name of cookie
  token = req.cookies.ecomms_user;

  if (token) {
    try {
      if (!req.user.superUser) throw new Error();

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized: Not a super user" });
    }
  } else {
    res.status(401).json({ message: "Not authorized: no token" });
  }
};

module.exports = { protectRoute, adminRoute, superUserRoute };
