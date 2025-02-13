const { User } = require("../models");
const generateToken = require("../utils/generateToken");

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json({message: "All user profiles successfully aquired", allUsers});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get a user
// rout     GET /api/use/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = req.user;

    res
      .status(200)
      .json({ message: "User profile successfully aquired", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Logout a user
// rout     POST /api/user/logout
// @access  Public
const logoutUser = async (req, res) => {
  try {
    res.cookie("ecomms_user", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "User Logged Out" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login: user & set token
// rout     POST /api/user/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPasswords(password))) {
      generateToken(res, user._id);
      console.log("Login: User Logged In");
      res.status(201).json({
        message: "User successfully logged in",
        user: { _id: user._id, username: user.username, email: user.email },
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Register: a new user
// rout     POST /api/user
// @access  Public
const registerUser = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      res.status(400).json({ message: "Passwords do not match" });
      throw new Error("Passwords do not match");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: "User email already exists" });
      throw new Error("User email already exists");
    }

    const newUser = await User.create({
      username,
      email,
      password,
    });

    if (newUser) {
      generateToken(res, newUser._id);
      res.status(201).json({
        message: "User successfully registered",
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      });
    } else {
      res.status(401).json(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Logout a user
// rout     PUT /api/use/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-__v");

    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res
        .status(200)
        .json({ message: "User profile successfully updated", updatedUser });
    } else {
      res.status(404);
      throw new Error("User could not be found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
