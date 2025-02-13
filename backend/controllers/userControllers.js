const { User } = require("../models");
const generateToken = require("../utils/generateToken");

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login: user & set token
// rout     POST /api/user/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    generateToken(res, user._id);
    console.log("Login: User Logged In");
    res
      .status(201)
      .json({ _id: user._id, username: user.username, email: user.email });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
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
      console.log("Registered: New User");
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      });
    } else {
      res.status(401).json(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
};
